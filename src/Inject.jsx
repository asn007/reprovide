import React from "react";

export default function Inject() {
  // eslint-disable-next-line
  const components = Array.from(arguments);

  return WrappedComponent => {
    // FIXME: make it work with multiple providers,
    // right now it is one inject-one provider
    const Wrapper = components.reduce((previous, current) =>
      React.createElement(previous, null, current)
    );

    return props =>
      <Wrapper>
        <WrappedComponent {...props} />
      </Wrapper>;
  };
}
