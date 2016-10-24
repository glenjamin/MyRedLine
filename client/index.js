/* eslint-env browser */
var React = require("react");
var ReactDOM = require("react-dom");

var H = React.createElement;

var App = require("./App");

ReactDOM.render(H(App), document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
