/* global FileReader */
var React = require("react");
var H = React.createElement;

var EasyFit = require("easy-fit").default;
var ef = new EasyFit();

var ObjectInspector = require("react-inspector").ObjectInspector;

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
      ef.parse(reader.result, function(err, parsed) {
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
