const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const config = require("./config");
const webpackConfig = require("./webpack.config");

const server = express();
server.use(morgan("dev"));
server.use(bodyParser.json());

let configdb;
let metricdb;

server.get("/api/", (req, res) => {
  res.json({ status: "ok" });
});

server.get("/api/apps", async (req, res) => {
  const application = await configdb.collection("applications").find(
    {}, { name: 1, type: 1, slo: 1, budget: 1, serviceNames: 1 }
  ).toArray();
  res.json(application);
});

server.post("/api/apps/select", async (req, res) => {
  const selectPromise = configdb.collection("applications").updateMany(
    { _id: { $in: req.body.select.map(ObjectId) } },
    { $set: { selected: true } }
  );
  const excludePromise = configdb.collection("applications").updateMany(
    { _id: { $in: req.body.exclude.map(ObjectId) } },
    { $set: { selected: false } }
  );
  const updateResults = await Promise.all([selectPromise, excludePromise]);
  res.json({
    success: updateResults.every(res => res.result.ok === 1)
  });
});

server.get("/api/instances/:region", async (req, res) => {
  const { region } = req.params;
  const { data } = await configdb.collection("nodetypes").findOne({ region });
  res.json(data.map(
    ({ name, cpuConfig, memoryConfig, storageConfig, networkConfig }) => ({
      name,
      cpu: `${cpuConfig.vCPU} x ${cpuConfig.clockSpeed.value}${cpuConfig.clockSpeed.unit}`,
      memory: `${memoryConfig.size.value}${memoryConfig.size.unit}`,
      storage: storageConfig.storageType + (
        storageConfig.devices
          ? ` ${storageConfig.devices}x${storageConfig.size.value}${storageConfig.size.unit}`
          : ""
      ),
      network: networkConfig.performance,
    }),
  ));
});

server.get("/api/apps/:appName/analysis", async (req, res) => {
  const { appName } = req.params;
  const sizingAnalysis = await metricdb.collection("sizing").findOne({ appName });
  res.json(sizingAnalysis);
});

server.post("/api/apps/:appName/analysis/run", async (req, res) => {
  const { appName } = req.params;
  const existingDocument = await metricdb.collection("sizing").findOne({ appName });
  if (existingDocument !== null) {
    res.json({
      error: false,
      message: "Test already exists",
    });
    return;
  }
  const response = await fetch(
    `${config.workloadProfiler.url}/sizing/aws/${appName}`,
    { method: "POST" },
  );
  const jsonContent = await response.json();
  if (jsonContent.error !== false) {
    res.json(jsonContent);
  } else {
    res.json({
      sessionId: jsonContent.data.id,
      error: false,
    });
  }
});

server.get("/api/analyses/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  res.json(await metricdb.collection("sizing").findOne({ sessionId }));
});


const isDev = process.env.NODE_ENV !== "production";
const ANALYSIS_APP = process.env.ANALYSIS_APP || "alpha";

if (isDev) {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  /* eslint-enable */
  const compiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(compiler, {
    stats: { colors: true },
    publicPath: webpackConfig.output.publicPath,
  });

  server.use(devMiddleware);
  server.use(webpackHotMiddleware(compiler));

  server.get("/*", (req, res) => {
    devMiddleware.fileSystem.readFile(
      path.join(webpackConfig.output.path, `${ANALYSIS_APP}.html`),
      (error, result) => {
        res.set("Content-Type", "text/html");
        res.send(result);
      }
    );
  });
} else {
  server.use("/static", express.static(path.join(webpackConfig.output.path, "static")));

  server.use("/favicon.ico", express.static(path.join(webpackConfig.output.path, "favicon.ico")));

  server.get("/*", (req, res) => {
    res.sendFile(path.join(webpackConfig.output.path, `${ANALYSIS_APP}.html`));
  });
}


(async () => {
  const { url, metricdbName, configdbName } = config.mongo;

  [configdb, metricdb] = await Promise.all([
    MongoClient.connect(`${url}/${configdbName}`),
    MongoClient.connect(`${url}/${metricdbName}`),
  ]);

  server.listen(3000, () => {
    console.log(`${ANALYSIS_APP} UI app listening on port 3000!`); // eslint-disable-line no-console
  });
})();
