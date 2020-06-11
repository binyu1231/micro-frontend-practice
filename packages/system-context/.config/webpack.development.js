const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BarPlugin = require('webpackbar')
const path = require('path')

const packageNames = ['container-vue', 'container-react', 'container-angular']

const copyPatterns = packageNames.map(pName =>({ 
  from: path.join(__dirname, `../../${pName}/dist/`), 
  to: path.join(__dirname, `../dist/${pName}/`) 
}))

// ['container-vue/js/chunk-vendors.675affb9.js', 'container-vue/js/app.9e17ce92.js']



module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    port: 8080,
    // noInfo: true,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
  },
  plugins: [
    new BarPlugin(),
    new CopyPlugin({ patterns: copyPatterns }),
    // new HtmlTagsPlugin({ tags: htmlTags, append: false/* insert */ }),
    new HtmlPlugin({
      
      template:path.join(__dirname,'../public/index.html'),   //指定模板页面
      //将来会根据此页面生成内存中的页面
      filename:'index.html'   //指定生成页面的名称，index.html浏览器才会默认直接打开
    }),
    
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