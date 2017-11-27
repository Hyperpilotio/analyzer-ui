import express from "express";
import moment from "moment";
import mockResources from "../fake-api/mockResources.json";
import k8sResources from "../fake-api/k8sResources.json";

const router = express.Router();

router
  .get("/mock/cluster/mappings/all", async (req, res) => {
    res.json({
      success: true,
      ...mockResources,
    });
  })

  .get("/mock/cluster/specs", async (req, res) => {
    res.json({
      success: true,
      ...k8sResources,
    });
  })

  .get("/api/placeholder/influx-data", (req, res) => {
    const dataPoints = [];
    for (let i = 120; i > 0; i -= 1) {
      dataPoints.push([
        moment().subtract(i, "minute"),
        Math.random() * 1000,
      ]);
    }
    res.json({
      name: "hyperpilot/billing_service/request_latency_milliseconds",
      columns: ["time", "value"],
      values: dataPoints,
    });
  });


export default router;
