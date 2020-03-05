var config = require('./webpack.base')
var path = require('path')

module.exports = Object.assign({}, config, {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../lib/DEV.ts'),
  devServer: {
    open: true,
    port: 9000,
    noInfo: true,
    host: '0.0.0.0',
    publicPath: '/dist',
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: {
      index: 'index.html',
    }
  },
})