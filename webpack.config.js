/* eslint-disable no-process-env */
var path = require("path");

var webpack = require("webpack");

var dev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    main: [
      "./client/index.js",
      dev && "webpack-hot-middleware/client"
    ].filter(Boolean),
  },
  devtool: dev ? "eval-source-map" : "source-map",
  output: {
    path: path.join(__dirname, "public", "built"),
    publicPath: "/built/",
    filename: "[name].bundle.js"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js"],
  },
  plugins: [
    // consistent build hashes
    new webpack.optimize.OccurrenceOrderPlugin(),

    // hot module replcement in dev mode
    dev && new webpack.HotModuleReplacementPlugin(),

    // Let react detect environment for optimisations
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // Minify when not in dev mode
    !dev && new webpack.optimize.UglifyJsPlugin(),

    // Don't emit broken bundles
    new webpack.NoErrorsPlugin()
  ].filter(Boolean)
};
