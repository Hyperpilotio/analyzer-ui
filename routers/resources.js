const express = require("express");
const _ =  require("lodash");

const router = express.Router();
const mockResources = require("../fake-api/mockResources.json");
const k8sResources = require("../fake-api/k8sResources.json");

router
  .get("/mock/cluster/mappings/all", async (req, res) => {
    res.json(_.assign(
      { success: true },
      mockResources
    ));
  })

  .get("/mock/cluster/specs", async (req, res) => {
    res.json({
      success: true,
      k8sResources: k8sResources.k8sResources,
    });
  });

module.exports = router;
