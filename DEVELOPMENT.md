## `.babelrc`
Transform ES6 modules into CommonJS to make Jest work with `import()` modules.
Based on the Jest guide [using with webpack2](https://jestjs.io/docs/en/webpack#using-with-webpack-2).

## `.npmignore`
Skip metadata from making it into the NPM module.

## `webpack.config.js`
Basic webpack config file to output the library as AMD, CommonJS and Global variable making it compatible with the browser and Node.JS at same time. 

## `dist/`
Directory containing a single file with multiple environments supported (see above).

## `package.json`
Relevant properties:
 - `main` is the entry point compatible with CommonJS
 - `module` is the entry point compatible with ES6
