import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import config from "../config";

const router = express();

let mockdb;
router.on("mount", async () => {
  const { url, mockdbName } = config.mongo;
  mockdb = await MongoClient.connect(`${url}/${mockdbName}`);
});

router
  .post("/mock/api/add", async (req, res) => {
    const newApp = req.body;
    const result = await mockdb.collection("applications").insert(newApp);
    res.json({
      success: true,
      result,
    });
  })

  .post("/mock/api/remove", async (req, res) => {
    const { appId } = req.body;
    const result = await mockdb.collection("applications").remove({ _id: ObjectID(appId) });
    res.json({
      success: true,
      result,
    });
  })

  .get("/mock/api/apps", async (req, res) => {
    const applications = await mockdb.collection("applications").find({}).toArray();
    res.json({
      success: true,
      applications,
    });
  })

  .post("/mock/api/slo-source", async (req, res) => {
    res.json({
      success: true,
      metrics: [
        "some/metric/inside/prometheus",
        "some/magic-metric/inside/prometheus",
        "some/really-magic-metric/inside/prometheus",
      ],
    })
  })

  .post("/mock/v1/k8s_services", async (req, res) => {
    const { services } = req.body;
    const resourcesIds = await mockdb.collection("resources").insertMany(services);
    res.json({
      success: true,
      resourcesIds,
    });
  });

export default router;
