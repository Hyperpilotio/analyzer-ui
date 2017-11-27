import express from "express";
import fetch from "node-fetch";
import config from "../config";
import resources from "./resources";
import mockdb from "./mockdb";

const router = express();

router.use(resources);
router.use(mockdb);

const jsonRequest = async (url, method, body) => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.headers.get("Content-Type") === "application/json") {
    return res.json();
  }
  return res.text();
};

router.get("/api/apps", async (req, res) => {
  const response = await fetch(`${config.analyzer.url}/api/apps`);
  const body = await response.json();
  res.json({ success: true, ...body });
})

router.post("/api/new-app", async (req, res) => {
  const response = await jsonRequest(`${config.analyzer.url}/api/apps`, "POST", req.body);
  res.json({ success: true, ...response });
});

router.get("/api/get-cluster-mapping", async (req, res) => {
  const response = await jsonRequest(
    `${config.operator.url}/cluster/mapping`,
    "GET",
    ["services", "deployments", "statefulsets"],
  );
  res.json({ success: true, ...response });
});

export default router;
