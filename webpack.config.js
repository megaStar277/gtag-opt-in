const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'GTagOptIn',
    libraryTarget: 'var'
  },
  mode: 'production',
};
