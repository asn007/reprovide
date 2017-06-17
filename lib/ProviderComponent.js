var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";
import { PROVIDER_NAME, INIT_FLAG } from "./symbols";

var ProviderComponent = function (_React$Component) {
  _inherits(ProviderComponent, _React$Component);

  function ProviderComponent(props, context) {
    _classCallCheck(this, ProviderComponent);

    var _this = _possibleConstructorReturn(this, (ProviderComponent.__proto__ || Object.getPrototypeOf(ProviderComponent)).call(this, props, context));

    _this.memoizedProvider = Object.assign({}, _this.memoizedProvider, _this.getProvider());
    return _this;
  }

  _createClass(ProviderComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.shouldComponentReprovide(nextProps, nextState)) {
        this.memoizedProvider = Object.assign({}, this.memoizedProvider, this.getProvider());
      }

      return true;
    }
  }, {
    key: "shouldComponentReprovide",
    value: function shouldComponentReprovide() {
      return true;
    }

    // eslint-disable-next-line

  }, {
    key: "getProvider",
    value: function getProvider() {
      return {};
    }
  }, {
    key: "cloneProps",
    value: function cloneProps(child) {
      var _Object$assign;

      var providerName = this.props[PROVIDER_NAME];

      var newProps = Object.assign({}, child.props);

      if (!newProps.providers) {
        newProps.providers = {};
      }
      newProps.providers = Object.assign({}, this.props.providers, newProps.providers, (_Object$assign = {}, _defineProperty(_Object$assign, providerName, this.memoizedProvider), _defineProperty(_Object$assign, INIT_FLAG, true), _Object$assign));

      return newProps;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = this.props.children;

      var clonedChildren = React.Children.map(children, function (child) {
        return React.cloneElement(child, _this2.cloneProps(child), child.props.children);
      });

      // Prevent wrapping single children with the <div> since it might fuck up things like tables
      if (clonedChildren.length === 1) {
        return clonedChildren[0];
      }

      return React.createElement(
        "div",
        null,
        clonedChildren
      );
    }
  }]);

  return ProviderComponent;
}(React.Component);

ProviderComponent.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  providers: PropTypes.object
};
ProviderComponent.defaultProps = {
  providers: {}
};
export default ProviderComponent;