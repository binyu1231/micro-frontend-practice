var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    filename: 'bundle.js',
    path: '/build',
    publicPath: '/build'
  },
  devServer: {
    port: 8080,
    publicPath: '/build',
    contentBase: './public',
    historyApiFallback: {
      index: 'index.html',
    }
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
            '@babel/plugin-syntax-dynamic-import',
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
          ],
        },
        test: /\.tsx?$/,
        exclude: /node_modules/,
      }
    ]
  }
}