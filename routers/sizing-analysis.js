import express from "express";
import MongoClient from "mongodb";
import fetch from "node-fetch";
import config from "../config";

const router = express();

let configdb;
let metricdb;

router.on("mount", async () => {
  const { url, metricdbName, configdbName } = config.mongo;
  configdb = await MongoClient.connect(`${url}/${configdbName}`);
  metricdb = await MongoClient.connect(`${url}/${metricdbName}`);
});

router.get("/api/", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/api/apps", async (req, res) => {
  const applications = await configdb.collection("applications").find(
    {}, { name: 1, type: 1, slo: 1, budget: 1, serviceNames: 1, selected: 1 },
  ).toArray();
  res.json({
    success: true,
    applications,
  });
});

router.get("/api/instances/:region", async (req, res) => {
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

router.get("/api/apps/:appName/analysis", async (req, res) => {
  const { appName } = req.params;
  const sizingAnalysis = await metricdb.collection("sizing").findOne({ appName });
  res.json(sizingAnalysis);
});

router.post("/api/apps/:appName/analysis/run", async (req, res) => {
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

router.get("/api/analyses/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  res.json(await metricdb.collection("sizing").findOne({ sessionId }));
});

export default router;
