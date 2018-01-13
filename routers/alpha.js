import express from "express";
import request from "request-promise-native";
import { InfluxDB } from "influx";
import _ from "lodash";
import winston from "winston";
import config from "../config";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${_.toUpper(info.level)}] ${info.timestamp} - ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const router = express();

const influxClient = new InfluxDB(config.influx);

const asyncMiddleware = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    let message = e.message;
    if (e.name === "StatusCodeError") {
      if (_.has(e.response.body, "cause")) {
        // Catching operator errors
        message = e.response.body.cause;
      } else if (_.has(e.response.body, "error")) {
        // Catching analyzer errors
        message = e.response.body.error;
      }
    }
    if (!e.alreadyLogged) {
      logger.error(e);
    }
    res.status(500).json({
      success: false,
      message,
    });
  }
};

["get", "post"].forEach((method) => {
  router[method] = _.wrap(
    ::router[method],
    (register, ...args) => {
      if (args.length === 2) {
        const [path, fn] = args;
        if (_.isString(path) && _.isFunction(fn)) {
          return register(path, asyncMiddleware(fn));
        }
      }
      return register(...args);
    },
  );
});

const makeRequest = async (method, service, path, params) => {
  try {
    return await request[method]({
      uri: `${config[service].url}${path}`,
      json: true,
      ...params,
    });
  } catch (e) {
    let message = `${_.toUpper(method)} ${config[service].url}${path} failed:\n`;
    message = message.concat(`Message: ${e.message}`);
    if (_.has(params, "body")) {
      message = message.concat(`\nRequest body: ${JSON.stringify(params.body)}`);
    }
    logger.error(message);
    e.alreadyLogged = true;
    throw e;
  }
};


router.get("/api/apps", async (req, res) => {
  const activeAppsResponse = await makeRequest("get", "analyzer", "/api/v1/apps?state=Active");

  const promises = [];
  activeAppsResponse.data.forEach(({ app_id, name }) => {
    const incidentRequest = makeRequest("get", "analyzer", `/api/v1/apps/${app_id}/incidents`).catch(
      err => ({ data: { incident_id: null } })
    );
    promises.push(incidentRequest);
  });

  const incidentResponses = await Promise.all(promises);

  const responseWithIncident = _.merge(
    activeAppsResponse.data, _.flatMap(incidentResponses, item => ({
      hasIncident: !_.isNull(item.data.incident_id) && item.data.state !== "Resolved",
    })),
  );

  const registeredAppsResponse = await makeRequest("get", "analyzer", "/api/v1/apps?state=Registered");

  res.json({ success: true, data: [...responseWithIncident, ...registeredAppsResponse.data] });
});

router.post("/api/new-app", async (req, res) => {
  const response = await makeRequest("post", "analyzer", "/api/v1/apps", { body: req.body });
  res.json({ success: true, ...response });
});

router.post("/api/update-app", async (req, res) => {
  const response = await makeRequest("put", "analyzer", `/api/v1/apps/${req.body.app_id}`, {
    body: _.omit(req.body, "app_id"),
  });
  res.json({ success: true, ...response });
});

router.post("/api/activate-app", async (req, res) => {
  const response = await makeRequest("put", "analyzer", `/api/v1/apps/${req.body.app_id}/state`, {
    body: { state: "Active" },
  });
  res.json({ success: true, ...response });
});

router.get("/api/get-cluster-mapping", async (req, res) => {
  const response = await makeRequest("get", "operator", "/cluster/mapping", {
    body: ["services", "deployments", "statefulsets"],
  });
  res.json({
    success: true,
    data: _.reject(response, ms => _.includes(["kube-system", "hyperpilot"], ms.namespace)),
  });
});

router.post("/api/save-microservices", async (req, res) => {
  const app = await makeRequest("get", "analyzer", `/api/v1/apps/${req.body.app_id}`);

  const newServices = _.reduce(
    _.get(app.data, "microservices", []),
    (result, existing) => _.reject(result, _.omit(existing, "service_id")),
    req.body.microservices,
  );

  const specRequestBody = _.reduce(
    _.groupBy(newServices, "namespace"),
    (specRequest, subServices, namespace) => [...specRequest, {
      namespace,
      ..._.mapValues(_.groupBy(subServices, "kind"), ms => _.map(ms, "name")),
    }],
    [],
  );

  const k8sSpecs = await makeRequest("get", "operator", "/cluster/specs", { body: specRequestBody });

  const requestedResources = [];
  const promises = [];

  _.forEach(k8sSpecs, ({ namespace, ...kinds }) => {
    _.forEach(kinds, (specs, kind) => {
      specs.forEach(({ name, k8s_spec }) => {
        requestedResources.push({ namespace, kind, name });
        const registerRequest = makeRequest("post", "analyzer", "/api/v1/k8s_services", {
          body: { spec: JSON.stringify(k8s_spec) },
        }).catch(err => err);
        // Analyzer will fail to insert into Mongo if any field key of k8s spec contains "."
        // Catching the errors here, but it should be fixed in analyzer so it won't happen
        promises.push(registerRequest);
      });
    });
  });

  const registerServiceResponses = await Promise.all(promises);
  const microservices = _
    .zip(requestedResources, registerServiceResponses)
    .filter(([, response]) => _.has(response, "data"))
    .map(([resource, response]) => ({
      ...resource,
      service_id: response.data,
    }));

  const response = await makeRequest(
    "post", "analyzer", `/api/v1/apps/${req.body.app_id}/microservices`,
    { body: { microservices } },
  );

  res.json({ success: true, ...response });
});

router.post("/api/get-metrics", async (req, res) => {
  const source = req.body;
  const kindTypeMap = {
    deployments: "deployment",
    statefulsets: "statefulset",
    services: "service",
  };
  const response = await makeRequest("get", "operator", "/cluster/appmetrics", {
    body: {
      namespace: source.service.namespace,
      k8sType: _.get(kindTypeMap, source.service.kind),
      name: source.service.name,
      [source.APM_type]: {
        metricPort: source.port,
      },
    },
  });

  res.json({ success: true, ...response });
});

router.post("/api/influx-data", async (req, res) => {
  const tagsFilter = _.map(req.body.tags, ({ key, value }) => `AND "${key}" = '${value}' `).join(" ");
  const query = `
    SELECT mean(value) AS value FROM "${req.body.metric}"
    WHERE time >= ${req.body.start}
    AND time <= ${req.body.end}
    ${tagsFilter}
    GROUP BY time(5s)
  `;
  const result = await influxClient.query(query, { database: req.body.db });

  res.json({
    name: req.body.metric,
    columns: ["time", "value"],
    values: _.map(result, d => [d.time, d.value]),
  });
});

router.get("/api/apps/:appId/incidents/last", async (req, res) => {
  try {
    const incident = await makeRequest("get", "analyzer", `/api/v1/apps/${req.params.appId}/incidents`);
    res.json({
      success: true,
      data: incident.data,
    });
  } catch (e) {
    if (e.name === "StatusCodeError" && e.statusCode === 404) {
      res.json({
        success: true,
        data: null,
      });
    } else {
      throw e;
    }
  }
});

router.get("/api/diagnostics/:appId", async (req, res) => {
  const incident = await makeRequest("get", "analyzer", `/api/v1/apps/${req.params.appId}/incidents`);
  const diagnosis = await makeRequest("get", "analyzer", `/api/v1/apps/${req.params.appId}/diagnosis`, {
    body: { incident_id: incident.data.incident_id },
  })
  const problems = await Promise.all(
    diagnosis.data.top_related_problems.map(
      ({ id }) => makeRequest("get", "analyzer", `/api/v1/problems/${id}`),
    ),
  );

  res.json({
    success: true,
    data: {
      incidents: [incident.data],
      results: [diagnosis.data],
      problems: _.map(problems, "data"),
    },
  });
});

router.post("/api/remove-app", async (req, res) => {
  const response = await makeRequest("put", "analyzer", `/api/v1/apps/${req.body.app_id}/state`,
    { body: { state: "Unregistered" } },
  );
  res.json({ success: true, ...response });
});

export default router;
