import isArray from "isarray";
import { INIT_FLAG } from "./symbols";

function noop() {}

function argTransform() {
  // eslint-disable-next-line
  return Array.from(arguments);
}

export const ensureProvided = argTransform;
export const optionalProviders = argTransform;

export default function consumeProviders() {
  // eslint-disable-next-line
  const providerCandidates = Array.from(arguments);
  let providers;

  if (providerCandidates.length === 0) {
    return noop;
  }

  if (isArray(providerCandidates[0])) {
    providers = providerCandidates[0];
  } else {
    providers = providerCandidates;
  }

  const names = providers.map(provider => provider.providerName);

  return (props, propName, component) => {
    if (propName !== "providers") {
      return new Error(
        // eslint-disable-next-line
        `Attempt to use provider prop validator on ${component} component's prop '${propName}', which is different from 'providers'!`
      );
    }

    const wasProvided = props[propName];

    if (Object.prototype.toString.call(wasProvided) !== "[object Object]") {
      return new Error(
        // eslint-disable-next-line
        `Provider validation failed on component ${component}: expected Object but got ${Object.prototype.toString.call(
          wasProvided
        )}`
      );
    }
    if (!wasProvided[INIT_FLAG]) {
      return undefined;
    }

    const providedNames = Object.keys(wasProvided);
    const missingNames = names
      .map(
        name =>
          providedNames.some(providedName => name === providedName)
            ? undefined
            : name
      )
      .filter(item => item);

    if (missingNames.length > 0) {
      return new Error(
        // eslint-disable-next-line
        `Missing providers detected on component ${component}.\nComponent requires: ${names.join(
          ", "
        )}, but got ${providedNames.join(", ") || "nothing"}`
      );
    }

    return undefined;
  };
}
