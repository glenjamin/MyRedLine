/* eslint-disable no-process-env, no-console */
var http = require("http");
var path = require("path");

var express = require("express");
var webpack = require("webpack");

var app = express();

var webpackConfig = require("../webpack.config.js");

var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

var server = http.createServer(app);
var port = process.env.PORT || "4256";

server.listen(port, function() {
  console.log("Listening on http://localhost:%d", port);
});
