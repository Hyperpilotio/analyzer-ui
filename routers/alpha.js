import express from "express";
import request from "request-promise-native";
import config from "../config";
import resources from "./resources";
import mockdb from "./mockdb";

const router = express();

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

router.get("/api/get-cluster-mapping", async (req, res) => {
  const response = await request.get(
    `${config.operator.url}/cluster/mapping`,
    { body: ["services", "deployments", "statefulsets"], json: true },
  );
  res.json({ success: true, data: response });
});

export default router;
