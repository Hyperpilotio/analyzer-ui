const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router
  .post("/mock/api/add", async (req, res) => {
    const newApp = req.body;
    const result = await req.mockdb.collection("applications").insert(newApp);
    res.json({
      success: true,
      result,
    });
  })

  .post("/mock/api/remove", async (req, res) => {
    const { appId } = req.body;
    const result = await req.mockdb.collection("applications").remove({ _id: mongodb.ObjectID(appId) });
    res.json({
      success: true,
      result,
    });
  })

  .get("/mock/api/apps", async (req, res) => {
    const applications = await req.mockdb.collection("applications").find({}).toArray();
    res.json({
      success: true,
      applications,
    });
  })
  .post("/mock/v1/k8s_services", async (req, res) => {
    const { services } = req.body;
    console.log("services", services);
    const resourcesIds = await req.mockdb.collection("resources").insertMany(services);
    res.json({
      success: true,
      resourcesIds,
    });
  });

module.exports = router;
