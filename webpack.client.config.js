/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* eslint-enable */
const path = require("path");
const _ = require("lodash");

const IS_PROD = process.env.NODE_ENV === "production";

const extractSass = new ExtractTextPlugin({
  filename: "static/[name].bundle.css",
  disable: !IS_PROD,
});

const gitRevisionPlugin = new GitRevisionPlugin();

const buildEntryPoint = (...entries) => _.filter([
  "whatwg-fetch",
  "babel-polyfill",
  IS_PROD ? null : "webpack-hot-middleware/client?http://localhost:3000/",
  IS_PROD ? null : "react-hot-loader/patch",
  "./commons/styles/global.scss",
  ...entries,
]);


module.exports = {
  entry: {
    interference: buildEntryPoint(
      IS_PROD ? "./interference-analysis/index.js" : "./interference-analysis/index.dev.js",
      "./interference-analysis/styles/index.sass",
    ),
    sizing: buildEntryPoint(
      IS_PROD ? "./sizing-analysis/index.js" : "./sizing-analysis/index.dev.js",
    ),
    analyzer: buildEntryPoint(
      IS_PROD ? "./sizing-analyzer/index.js" : "./sizing-analyzer/index.dev.js",
      "./sizing-analyzer/scss/index.scss",
    ),
    alpha: buildEntryPoint(
      IS_PROD ? "./alpha/index.js" : "./alpha/index.dev.js",
      "./alpha/scss/index.scss",
    ),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/[name].bundle.js",
    publicPath: "/",
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
      "~": path.resolve(__dirname),
    },
  },
  devtool: IS_PROD ? "source-map" : "eval",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0", "react"],
          plugins: _.filter([
            "transform-decorators-legacy",
            IS_PROD ? null : "react-hot-loader/babel",
            "lodash",
          ]),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ca]ss|css$/,
        include: [
          path.resolve("interference-analysis", "styles"),
          path.resolve("sizing-analyzer", "scss"),
          path.resolve("commons", "styles"),
          path.resolve("alpha", "scss"),
        ],
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                modules: false,
                minimize: IS_PROD,
              },
            },
            "sass-loader",
            {
              loader: "resolve-url-loader",
              query: {
                silent: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.s[ca]ss|css$/,
        exclude: [
          "interference-analysis/styles",
          "node_modules",
          "alpha/scss",
          "sizing-analyzer/scss",
          "commons/styles",
        ].map(dir => path.resolve(__dirname, dir)),
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                modules: true,
                localIdentName: "[local]__[hash:base64:5]",
                minimize: IS_PROD,
              },
            },
            "sass-loader",
            {
              loader: "resolve-url-loader",
              query: {
                silent: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2)$/i,
        loader: "file-loader",
        query: {
          outputPath: "static/",
        },
      },
    ],
  },
  plugins: _.filter([
    new webpack.ProgressPlugin({ profile: false }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      chunks: ["commons", "interference"],
      template: "interference-analysis/index.html",
      filename: "interference-analysis.html",
      favicon: "assets/images/favicon.ico",
      hash: true,
    }),
    new HtmlWebpackPlugin({
      chunks: ["commons", "sizing"],
      template: "sizing-analysis/index.html",
      filename: "sizing-analysis.html",
      favicon: "assets/images/favicon.ico",
      hash: true,
    }),
    new HtmlWebpackPlugin({
      chunks: ["commons", "analyzer"],
      template: "sizing-analyzer/index.html",
      filename: "sizing-analyzer.html",
      favicon: "assets/images/favicon.ico",
      hash: true,
    }),
    new HtmlWebpackPlugin({
      chunks: ["commons", "alpha"],
      template: "alpha/index.html",
      filename: "alpha.html",
      favicon: "assets/images/favicon.ico",
      hash: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_SPINKIT_NO_STYLES: "true",
        GIT_COMMIT: JSON.stringify(gitRevisionPlugin.commithash()),
      },
    }),
    extractSass,
    IS_PROD ? null : new webpack.HotModuleReplacementPlugin(),
    IS_PROD ? null : new webpack.NamedModulesPlugin(),
    IS_PROD ? null : new webpack.NoEmitOnErrorsPlugin(),
    !IS_PROD ? null : new webpack.optimize.UglifyJsPlugin({ comments: false }),
  ]),
};
