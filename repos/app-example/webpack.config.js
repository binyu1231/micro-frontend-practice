var path = require('path')


console.log(path.resolve(__dirname))
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    filename: 'bundle.js',
    path: '/build',
    publicPath: '/build'
  },
  devServer: {
    open: true,
    port: 8080,
    publicPath: '/build',
    contentBase: './public',
    historyApiFallback: {
      index: 'index.html',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
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
            '@babel/plugin-syntax-dynamic-import'
          ],
        },
        test: /\.tsx?$/,
        // exclude: /node_modules/,
      }
    ]
  }
}