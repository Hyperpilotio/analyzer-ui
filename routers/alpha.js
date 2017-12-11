import express from "express";
import request from "request-promise-native";
import { InfluxDB } from "influx";
import _ from "lodash";
import moment from "moment";
import config from "../config";
import resources from "./resources";
import mockdb from "./mockdb";

const router = express();

const influxClient = new InfluxDB(config.influx);

router.use(resources);
router.use(mockdb);

router.get("/api/apps", async (req, res) => {
  const response = await request.get({
    uri: `${config.analyzer.url}/api/apps`, json: true,
  });
  res.json({ success: true, ...response });
});

router.post("/api/new-app", async (req, res) => {
  const response = await request.post(
    `${config.analyzer.url}/api/apps`,
    { body: req.body, json: true },
  );
  res.json({ success: true, ...response });
});

router.post("/api/update-app", async (req, res) => {
  const response = await request.put(
    `${config.analyzer.url}/api/apps/${req.body.app_id}`,
    { body: _.omit(req.body, "app_id"), json: true },
  );
  res.json({ success: true, ...response });
});

router.post("/api/activate-app", async (req, res) => {
  const response = await request.put(
    `${config.analyzer.url}/api/apps/${req.body.app_id}/state`,
    { body: { state: "Active" }, json: true },
  );
  res.json({ success: true, ...response });
});

router.get("/api/get-cluster-mapping", async (req, res) => {
  const response = await request.get(
    `${config.operator.url}/cluster/mapping`,
    { body: ["services", "deployments", "statefulsets"], json: true },
  );
  res.json({ success: true, data: response });
});

router.post("/api/save-microservices", async (req, res) => {
  const app = await request.get(
    `${config.analyzer.url}/api/apps/${req.body.app_id}`,
    { json: true },
  );

  const newServices = _.reduce(
    _.get(app, "microservices", []),
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

  const k8sSpecs = await request.get(
    `${config.operator.url}/cluster/specs`,
    { body: specRequestBody, json: true },
  );

  const requestedResources = [];
  const promises = [];

  _.forEach(k8sSpecs, ({ namespace, ...kinds }) => {
    _.forEach(kinds, (specs, kind) => {
      specs.forEach(({ name, k8s_spec }) => {
        requestedResources.push({ namespace, kind, name });
        const registerRequest = request
          .post(`${config.analyzer.url}/api/k8s_services`, { json: true, body: k8s_spec })
          .catch(err => err);
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

  const response = await request.post(
    `${config.analyzer.url}/api/apps/${req.body.app_id}/microservices`,
    { body: { microservices }, json: true },
  );

  res.json({ success: true, ...response });
});

router.post("/api/get-metrics", async (req, res) => {
  const source = req.body;
  const kindTypeMap = {
    deployments: "deployment",
    statefulsets: "statefulset",
  };
  const response = await request.get(`${config.operator.url}/cluster/appmetrics`, {
    json: true,
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

router.get("/api/diagnostics/:appId", async (req, res) => {
  const app = await request.get({
    uri: `${config.analyzer.url}/api/apps/${req.params.appId}`, json: true,
  });
  const incident = await request.get({
    uri: `${config.analyzer.url}/api/incidents`,
    json: true,
    body: { app_name: app.data.name },
  });
  const diagnosis = await request.get({
    uri: `${config.analyzer.url}/api/diagnosis`,
    json: true,
    body: { app_name: app.data.name, incident_id: incident.data.incident_id },
  });
  const problems = await Promise.all(
    diagnosis.data.top_related_problems.map(({ id }) => request.get({
      uri: `${config.analyzer.url}/api/problems/${id}`,
      json: true,
    })),
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

export default router;
