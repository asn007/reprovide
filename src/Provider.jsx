import React from "react";
import { PROVIDER_NAME } from "./symbols";

export default function Provider(name) {
  let providerName = name;

  return function(WrappedComponent) {
    if (!providerName) {
      providerName = WrappedComponent.constructor.name;
    }

    return class extends React.Component {
      static providerName = providerName;
      static displayName = `PersephoneProvider(${providerName})`;
      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          ...WrappedComponent.props,
          [PROVIDER_NAME]: providerName
        });
      }
    };
  };
}
