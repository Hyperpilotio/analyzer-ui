const express = require("express");
const proxy = require("express-http-proxy");
const morgan = require("morgan");
const path = require("path");
const { MongoClient } = require("mongodb");
const config = require("./config.json");


const ANALYSIS_APP = process.env.ANALYSIS_APP || "sizing-analysis";

const server = express();

server.use(morgan("dev"));

server.use("/static", express.static(path.join(__dirname, "dist/static")));

server.get("/api/", (req, res) => {
  res.json({ status: "ok" });
});

server.get("/api/apps", async (req, res) => {
  const appsShowing = ["redis", "mysql", "mongo", "kafka"];
  const application = await configdb.collection("applications").find(
    { name: { $in: appsShowing } },
    { name: 1, type: 1, slo: 1, budget: 1, serviceNames: 1 }
  ).toArray();
  res.json(application);
});

server.get("/api/apps/:appName/analysis", async (req, res) => {
  const { appName } = req.params;
  const sizingAnalysis = await metricdb.collection("sizing").findOne({ appName });
  res.json(sizingAnalysis);
});

server.use("/api", proxy(config.analyzer.url, {
  proxyReqPathResolver: req => req.originalUrl
}));

server.get("/*", (req, res) => {
  res.sendFile(__dirname + `/dist/${ANALYSIS_APP}.html`);
});


let configdb, metricdb;

(async () => {

  const { host, port, username, password } = config.mongo;

  [configdb, metricdb] = await Promise.all([
    MongoClient.connect(`mongodb://${username}:${password}@${host}:${port}/configdb`),
    MongoClient.connect(`mongodb://${username}:${password}@${host}:${port}/metricdb`)
  ]);

  server.listen(3000, () => {
    console.log(`${ANALYSIS_APP} UI app listening on port 3000!`);
  });

})();
