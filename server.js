const express = require("express");
const proxy = require("express-http-proxy");
const morgan = require("morgan");
const path = require("path");
const config = require("./config.json");


const ANALYSIS_APP = process.env.ANALYSIS_APP || "sizing-analysis";

const server = express();

server.use(morgan("dev"));

server.use("/static", express.static(path.join(__dirname, "dist/static")));

server.use("/api", proxy(config.analyzer.url, {
  proxyReqPathResolver: req => req.originalUrl
}));

server.get("/*", (req, res) => {
  res.sendFile(__dirname + `/dist/${ANALYSIS_APP}.html`);
});

server.listen(3000, () => {
  console.log(`${ANALYSIS_APP} UI app listening on port 3000!`);
});
