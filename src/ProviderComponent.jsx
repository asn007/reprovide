import React from "react";
import PropTypes from "prop-types";
import { PROVIDER_NAME, INIT_FLAG } from "./symbols";

export default class ProviderComponent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line
    providers: PropTypes.object
  };

  static defaultProps = {
    providers: {}
  };

  constructor(props, context) {
    super(props, context);
    this.memoizedProvider = Object.assign(
      {},
      this.memoizedProvider,
      this.getProvider()
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.shouldComponentReprovide(nextProps, nextState)) {
      this.memoizedProvider = Object.assign(
        {},
        this.memoizedProvider,
        this.getProvider()
      );
    }

    return true;
  }

  shouldComponentReprovide() {
    return true;
  }

  // eslint-disable-next-line
  getProvider() {
    return {};
  }

  cloneProps(child) {
    const { [PROVIDER_NAME]: providerName } = this.props;
    const newProps = Object.assign({}, child.props);

    if (!newProps.providers) {
      newProps.providers = {};
    }
    newProps.providers = Object.assign(
      {},
      this.props.providers,
      newProps.providers,
      {
        [providerName]: this.memoizedProvider,
        [INIT_FLAG]: true
      }
    );

    return newProps;
  }

  render() {
    const { children } = this.props;
    const clonedChildren = React.Children.map(children, child =>
      React.cloneElement(child, this.cloneProps(child), child.props.children)
    );

    // Prevent wrapping single children with the <div> since it might fuck up things like tables
    if (clonedChildren.length === 1) {
      return clonedChildren[0];
    }

    return (
      <div>
        {clonedChildren}
      </div>
    );
  }
}
