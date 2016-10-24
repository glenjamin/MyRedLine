/* global FileReader Int8Array */
var React = require("react");
var H = React.createElement;

var EasyFit = require("easy-fit").default;
var ef = new EasyFit();

var ObjectInspector = require("react-inspector").ObjectInspector;

var FIT_HEADER_START = 8;
var FIT_HEADER_END = 12;
var FIT_HEADER = "46,70,73,84";
function parseFile(arraybuffer, callback) {
  var fitBytes = new Int8Array(
    arraybuffer.slice(FIT_HEADER_START, FIT_HEADER_END)
  );
  if (fitBytes.join(",") !== FIT_HEADER) {
    return callback(new Error("Not a valid .FIT file"));
  }
  return ef.parse(arraybuffer, callback);
}

var App = React.createClass({
  displayName: "App",
  getInitialState: function() {
    return {error: null, data: null};
  },
  onChange: function(e) {
    var component = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      parseFile(reader.result, function(err, parsed) {
        if (err) {
          component.setState({error: err, data: null});
          return;
        }
        component.setState({error: null, data: parsed});
      });
    };
    reader.readAsArrayBuffer(file);
  },
  render: function() {
    var data = this.state.data;
    var error = this.state.error;
    return (
      H("div", {},
        H("form", {},
          H("input", {type: "file", onChange: this.onChange})
        ),
        error && H("pre", {}, error.stack),
        data && H(ObjectInspector, {data: data, expandLevel: 2})
      )
    );
  }
});

module.exports = App;
