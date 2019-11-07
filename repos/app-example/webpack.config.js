var path = require('path')


console.log(2222, path.resolve(__dirname, './index.js'))
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  externals : {
    react: 'React'
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
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
          ],
        },
        test: /\.tsx?$/,
        // exclude: /node_modules/,
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: path.resolve(__dirname, './')
          }
        },
        test: /\.css$/,
        // exclude: /node_modules/,
      }
    ]
  }
}