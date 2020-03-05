var config = require('./webpack.base')
var path = require('path')
var TerserPlugin = require('terser-webpack-plugin')

module.exports = Object.assign({}, config, {
  mode: 'production',
  entry: path.resolve(__dirname, '../lib/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
})