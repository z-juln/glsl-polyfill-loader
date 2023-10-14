<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# glsl-polyfill-loader

## install

`npm i raw-loader glsl-polyfill-loader -D`

or

`yarn global add raw-loader glsl-polyfill-loader -D`

## polyfill-list

[doc](./src/index.js)

## usage

**file.js**

```js
import glsl from './file.glsl';
```

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glsl-polyfill-loader',
        ],
      },
    ],
  },
};
```

you also define options:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          ['glsl-polyfill-loader', {
            config: {
              // about polyfill `texture` and define options of polyfill `texture`
              'texture': {
                variableName: 'TEXTURE2D',
              },
            },
            disablePolyfill: ['xxx'],
          }],
        ],
      },
    ],
  },
};
```

you also can use `glsl-module-loader` with [`glslify-loader`](https://github.com/glslify/glslify-loader) and [`glslify-module-loader`](https://github.com/z-juln/glslify-module-loader):

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glslify-loader',
          'glsl-module-loader',
          'glsl-polyfill-loader',
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Examples

### project

- [glsl-polyfill-loader-example](https://github.com/z-juln/glsl-polyfill-loader-example)

### Inline

```js
import glsl from 'glsl-polyfill-loader!./utils.glsl';
```
