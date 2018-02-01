/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
/* eslint-enable */
const _ = require("lodash");
const path = require("path");
const fs = require("fs");

const IS_PROD = process.env.NODE_ENV === "production";

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(x => [".bin"].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: _.filter([
    IS_PROD ? null : "webpack/hot/poll?1000",
    "babel-polyfill",
    "./server.js",
  ]),
  target: "node",
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0"],
        },
      },
    ],
  },
  plugins: _.filter([
    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();",
      raw: true,
      entryOnly: false,
    }),
    new webpack.NamedModulesPlugin(),
    IS_PROD ? null : new webpack.HotModuleReplacementPlugin(),
  ]),
  externals: nodeModules,
};
