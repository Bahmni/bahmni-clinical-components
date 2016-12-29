'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '../src');
module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
      // add your custom loaders.
    ],
  },
  resolve: {
    alias: {
      src: srcPath
    }
  }
};
