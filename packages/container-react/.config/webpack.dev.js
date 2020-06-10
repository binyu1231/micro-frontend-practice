const HtmlPlugin = require('html-webpack-plugin')
const BarPlugin = require('webpackbar')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    open: true,
    port: 9000,
    hot: true,
    noInfo: true,
    host: 'localhost',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
  },
  plugins: [
    new BarPlugin(),
    new HtmlPlugin({
      template:path.join(__dirname,'../public/index.html'),   //指定模板页面
      //将来会根据此页面生成内存中的页面
      filename:'index.html'   //指定生成页面的名称，index.html浏览器才会默认直接打开
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
        test: /\.(j|t)sx?$/,
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader',]
      }, {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [ 'url-loader' ]
      }
    ]
  }
}