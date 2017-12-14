import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import webpackConfig from "./webpack.client.config";
import errHandler from "./routers/errHandler";

const server = express();
server.use(morgan("dev"));
server.use(bodyParser.json());

const isDev = process.env.NODE_ENV !== "production";
const ANALYSIS_APP = process.env.ANALYSIS_APP || "alpha";

server.use(require(`./routers/${ANALYSIS_APP}`).default); // eslint-disable-line import/no-dynamic-require

if (isDev) {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  /* eslint-enable */
  const compiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(compiler, {
    stats: { colors: true },
    publicPath: webpackConfig.output.publicPath,
  });

  server.use(devMiddleware);
  server.use(webpackHotMiddleware(compiler));

  server.get("/*", (req, res) => {
    devMiddleware.fileSystem.readFile(
      path.join(webpackConfig.output.path, `${ANALYSIS_APP}.html`),
      (error, result) => {
        res.set("Content-Type", "text/html");
        res.send(result);
      },
    );
  });
} else {
  server.use("/static", express.static(path.join(webpackConfig.output.path, "static")));

  server.use("/favicon.ico", express.static(path.join(webpackConfig.output.path, "favicon.ico")));

  server.get("/*", (req, res) => {
    res.sendFile(path.join(webpackConfig.output.path, `${ANALYSIS_APP}.html`));
  });
}

server.listen(3000, () => {
  console.log(`${ANALYSIS_APP} UI app listening on port 3000!`); // eslint-disable-line no-console
});
