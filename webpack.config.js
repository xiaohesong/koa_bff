const path = require('path');
// const webpack = require('webpack');
const fs = require('fs');
// const getClientEnvironment = require('./config/env.js')

var nodeModules = {};
  fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = (_env, args) => {
  return {
    entry: './index.js',
    target: 'node',
    output: {
      path: path.join(__dirname, 'dist'),
      // chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      // filename: 'static/js/[name].[contenthash:8].node.js'
      filename: 'index.node.js'
    },
    externals: nodeModules
  }
}