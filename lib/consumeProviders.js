import isArray from "isarray";
import { INIT_FLAG } from "./symbols";

function noop() {}

function argTransform() {
  // eslint-disable-next-line
  return Array.from(arguments);
}

export var ensureProvided = argTransform;
export var optionalProviders = argTransform;

export default function consumeProviders() {
  // eslint-disable-next-line
  var providerCandidates = Array.from(arguments);
  var providers = void 0;

  if (providerCandidates.length === 0) {
    return noop;
  }

  if (isArray(providerCandidates[0])) {
    providers = providerCandidates[0];
  } else {
    providers = providerCandidates;
  }

  var names = providers.map(function (provider) {
    return provider.providerName;
  });

  return function (props, propName, component) {
    if (propName !== "providers") {
      return new Error(
      // eslint-disable-next-line
      "Attempt to use provider prop validator on " + component + " component's prop '" + propName + "', which is different from 'providers'!");
    }

    var wasProvided = props[propName];

    if (Object.prototype.toString.call(wasProvided) !== "[object Object]") {
      return new Error(
      // eslint-disable-next-line
      "Provider validation failed on component " + component + ": expected Object but got " + Object.prototype.toString.call(wasProvided));
    }
    if (!wasProvided[INIT_FLAG]) {
      return undefined;
    }

    var providedNames = Object.keys(wasProvided);
    var missingNames = names.map(function (name) {
      return providedNames.some(function (providedName) {
        return name === providedName;
      }) ? undefined : name;
    }).filter(function (item) {
      return item;
    });

    if (missingNames.length > 0) {
      return new Error(
      // eslint-disable-next-line
      "Missing providers detected on component " + component + ".\nComponent requires: " + names.join(", ") + ", but got " + (providedNames.join(", ") || "nothing"));
    }

    return undefined;
  };
}