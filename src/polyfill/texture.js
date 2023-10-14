const name = 'texture';

/**
 * @param {string} sourceCode 
 * @param {{ variableName: string; }=} opts 
 */
const parse = (sourceCode, opts) => {
  const variableName = opts?.variableName;

  const versionGT120 = variableName ?? 'texture2D';
  const versionLT120 = variableName ?? 'texture';

  const polyfillCode = `
#if __VERSION__ > 120
#define ${versionGT120} texture
#else
#define ${versionLT120} texture2D
#endif
`;

  const lines = sourceCode.split('\n');
  const startWithVersion = lines[0].startsWith('#version');
  if (startWithVersion) {
    return [lines[0], polyfillCode, ...lines.slice(1)].join('\n');
  }
  return [polyfillCode, ...lines].join('\n');
};

export default {
  name,
  parse,
};
