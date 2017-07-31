const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const _ = require("lodash");
const config = require("./config.json");

const IS_PROD = process.env.NODE_ENV === "production";
const ANALYSIS_APP = process.env.ANALYSIS_APP || "sizing-analysis";

const extractSass = new ExtractTextPlugin({
  filename: "static/[hash].bundle.css",
  disable: !IS_PROD
});

const gitRevisionPlugin = new GitRevisionPlugin()

const buildEntryPoint = entryJs => _.filter([
  "whatwg-fetch",
  "babel-polyfill",
  IS_PROD ? null : "webpack-dev-server/client?http://localhost:3000",
  IS_PROD ? null : "webpack/hot/only-dev-server",
  IS_PROD ? null : "react-hot-loader/patch",
  entryJs,
  "./styles/index.sass"
]);


let webpackConfig = module.exports = {
  entry: {
    interference: buildEntryPoint("./interference-analysis/index.js"),
    sizing: buildEntryPoint("./sizing-analysis/index.js")
  },
  output: {
    path: __dirname + "/dist",
    filename: "static/[name].[hash].bundle.js",
    publicPath: "/"
  },
  devtool: IS_PROD ? "source-map" : "eval",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-0"],
          plugins: _.filter([
            IS_PROD ? null : "react-hot-loader/babel",
            "lodash"
          ])
        },
        exclude: /node_modules/
      },
      {
        test: /\.s[ca]ss|css$/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                minimize: IS_PROD
              }
            },
            "sass-loader",
            {
              loader: "resolve-url-loader",
              query: {
                silent: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2)$/i,
        loader: "file-loader",
        query: {
          outputPath: "static/"
        }
      }
    ]
  },
  plugins: _.filter([
    new WebpackCleanupPlugin(),
    new webpack.ProgressPlugin({ profile: false }),
    new HtmlWebpackPlugin({
      chunks: ["interference"],
      template: "interference-analysis/index.html",
      filename: "interference-analysis.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["sizing"],
      template: "sizing-analysis/index.html",
      filename: "sizing-analysis.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        REACT_SPINKIT_NO_STYLES: "true",
        GIT_COMMIT: JSON.stringify(gitRevisionPlugin.commithash())
      }
    }),
    extractSass,
    IS_PROD ? null : new webpack.HotModuleReplacementPlugin(),
    IS_PROD ? null : new webpack.NamedModulesPlugin(),
    IS_PROD ? null : new webpack.NoEmitOnErrorsPlugin(),
    !IS_PROD ? null : new webpack.optimize.UglifyJsPlugin({ comments: false })
  ]),
  devServer: {
    hot: true,
    historyApiFallback: {
      index: `/${ANALYSIS_APP}.html`
    },
    contentBase: "./dist/",
    host: "localhost",
    port: 3000,
    proxy: {
      "/api/*": config.analyzer.url
    }
  }
};
