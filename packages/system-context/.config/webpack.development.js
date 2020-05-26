const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')

var path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    port: 8080,
    noInfo: true,
    hot: true,
    host: 'localhost',
    historyApiFallback: { index: 'index.html' },
    contentBase: path.join(__dirname, '../dist'),
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'../public/index.html'),   //指定模板页面
      //将来会根据此页面生成内存中的页面
      filename:'index.html'   //指定生成页面的名称，index.html浏览器才会默认直接打开
  })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.ts$/,
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: ['url-loader']
      }
    ]
  }
}