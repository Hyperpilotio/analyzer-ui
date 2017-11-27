import express from "express";
import proxy from "http-proxy-middleware";
import config from "../config";

const router = express();

router.use("/api", proxy({
  target: config.analyzer.url,
  changeOrigin: true,
}));

export default router;
