import express from "express";
import _ from "lodash";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import webpackConfig from "./webpack.client.config";

const server = express();
server.use(morgan("dev"));
server.use(bodyParser.json());

const isDev = process.env.NODE_ENV !== "production";
const ANALYSIS_APP = process.env.ANALYSIS_APP || "alpha";

let routersRequireContext = require.context("./routers/"); // Using require.context for HMR's need

server.use(routersRequireContext(`./${ANALYSIS_APP}`).default);

if (isDev && module.hot) {
  /* eslint-disable no-underscore-dangle */
  // Replace the registration name of the router middleware we just `use`d from "mounted_app"
  // to "alpha_router", in order to locate and replace them when there's an HMR
  server._router.stack[server._router.stack.length - 1].name = `${ANALYSIS_APP}_router`;

  module.hot.accept(routersRequireContext.id, () => {
    routersRequireContext = require.context("./routers/");
    
    // Locate the router middleware and take it out
    const routerIndex = _.findIndex(server._router.stack, { name: `${ANALYSIS_APP}_router` });
    server._router.stack.splice(routerIndex, 1);

    
    server.use(routersRequireContext(`./${ANALYSIS_APP}`).default);
    // Move it to the original position
    server._router.stack.splice(routerIndex, 0, server._router.stack.pop());
    server._router.stack[routerIndex].name = `${ANALYSIS_APP}_router`;
  });
  /* eslint-enable */
}

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
