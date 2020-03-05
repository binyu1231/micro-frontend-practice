var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './lib/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devServer: {
    open: true,
    port: 9000,
    noInfo: true,
    host: '0.0.0.0',
    publicPath: '/dist',
    contentBase: path.join(__dirname, './dist'),
    // historyApiFallback: { index: 'index.html' }
  },
  plugins: [
    // 拆分css 文件
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: path.join(__dirname, './public/index.html')
    })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
          ],
        },
        test: /\.tsx?$/,
        // exclude: /node_modules/,
      }, 
    ]
  }
}