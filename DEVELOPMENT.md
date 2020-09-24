# Release process
Steps releasing a new version:

 1. Merge changes in the `main` branch
 2. Bump the version with `npm version major|minor|patch`
 3. Push changes including the new tag
 4. Wait for CI to pass green
 5. [Draft a new release](https://github.com/luciomartinez/gtag-opt-in/releases/new)
 6. Choose the new tag as the tag version
 7. Set the title of the release to `Release <tag version>`
 8. Publish release

# Source code

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
