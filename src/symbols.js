// A random number between 0 and 100000 should ensure 'privateness of the property'
// A Symbol('persephone@@ProviderName'); would be much better fit. Unfortunately, React drops Symbol props as of now
// https://github.com/facebook/react/issues/7552
export const PROVIDER_NAME = `__persephone__ProviderName__${Math.floor(
  Math.random() * 100001
)}__`;
export const INIT_FLAG = Symbol(`Persephone@@ready`);
