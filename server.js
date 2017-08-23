const express = require("express");
const proxy = require("express-http-proxy");
const morgan = require("morgan");
const path = require("path");
const fetch = require("isomorphic-fetch");
const { MongoClient } = require("mongodb");
const config = require("./config");


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
      network: networkConfig.performance
    })
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
      message: "Test already exists"
    });
    return;
  }
  const response = await fetch(
    `${config.workloadProfiler.url}/sizing/aws/${appName}`,
    { method: "POST" }
  );
  const jsonContent = await response.json();
  if (jsonContent.error !== false) {
    res.json(jsonContent);
  } else {
    res.json({
      sessionId: jsonContent.data.id,
      error: false
    });
  }
});

server.get("/api/analyses/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  res.json(await metricdb.collection("sizing").findOne({ sessionId }));
})

server.get("/*", (req, res) => {
  res.sendFile(__dirname + `/dist/${ANALYSIS_APP}.html`);
});


let configdb, metricdb;

(async () => {

  const { url, metricdbName, configdbName } = config.mongo;

  [configdb, metricdb] = await Promise.all([
    MongoClient.connect(`${url}/${configdbName}`),
    MongoClient.connect(`${url}/${metricdbName}`)
  ]);

  server.listen(3000, () => {
    console.log(`${ANALYSIS_APP} UI app listening on port 3000!`);
  });

})();
