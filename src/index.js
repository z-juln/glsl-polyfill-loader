import { getOptions } from 'loader-utils';
import polyfillList from './polyfill';

/**
 * @param {string} sourceCode 
 * @param {{ config: Record<string, any>; usePolyfill?: string[]; disablePolyfill?: string[]; }} options
 */
const parseCode = (sourceCode, options) => {
  const { config: polyfillOpts, usePolyfill, disablePolyfill } = options ?? {};
  const useAllPolyfill = !usePolyfill?.length;
  const userPolyfillList = useAllPolyfill
    ? polyfillList
    : polyfillList.filter(p => usePolyfill.includes(p)).filter(p => !disablePolyfill?.includes(p));
  return userPolyfillList.reduce((code, polyfill) => {
    const thisPolyfillOpts = polyfillOpts?.[polyfill.name];
    return polyfill.parse(code, thisPolyfillOpts);
  }, sourceCode);
}

export default function glslModuleLoader(source) {
  this.cacheable?.();

  // Setup options
  const options = {
    ...getOptions(this),
  };
  
  const callback = this.async();

  try {
    const output = parseCode(source, options);
  
    callback(null, output);
  } catch (error) {
    callback(error, null);
  }
}
