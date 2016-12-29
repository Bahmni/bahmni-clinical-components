'use strict';

let webpack = require('webpack');
let path = require('path');
let BUILD_DIR = path.resolve(__dirname, 'dist');
let APP_DIR = path.resolve(__dirname, './src');
let srcPath = path.join(__dirname, './src');
let config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            src: srcPath
        }
    }
};

module.exports = config;