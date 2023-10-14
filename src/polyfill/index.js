import texture from './texture';

/** @type {{ name: string; parse: (sourceCode: string, opts?: any) => string; }[]} */
const polyfillList = [
  texture,
];

export default polyfillList;
