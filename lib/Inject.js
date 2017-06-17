import React from "react";

export default function Inject() {
  // eslint-disable-next-line
  var components = Array.from(arguments);

  return function (WrappedComponent) {
    // FIXME: make it work with multiple providers,
    // right now it is one inject-one provider
    var Wrapper = components.reduce(function (previous, current) {
      return React.createElement(previous, null, current);
    });

    return function (props) {
      return React.createElement(
        Wrapper,
        null,
        React.createElement(WrappedComponent, props)
      );
    };
  };
}