import { getOptions } from 'loader-utils';
import polyfillList from './polyfill';

/**
 * @param {string} sourceCode 
 * @param {Record<string, any>} opts
 */
const parseCode = (sourceCode, opts) => polyfillList.reduce((code, polyfill) => {
  const polyfillOpts = opts[polyfill.name];
  return polyfill.parse(code, polyfillOpts);
}, sourceCode);

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
