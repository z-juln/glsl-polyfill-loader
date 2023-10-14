/** @type {{ name: string; parse: (sourceCode: string, opts?: any) => string; }[]} */
const polyfillList = [
  require('./texture'),
];

export default polyfillList;
