const express = require("express");
const proxy = require("http-proxy-middleware");
const config = require("../config");

const router = express();

router.use("/api", proxy({
  target: config.analyzer.url,
  changeOrigin: true,
}));

module.exports = router;
