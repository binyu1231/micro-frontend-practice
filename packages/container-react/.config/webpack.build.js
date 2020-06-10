const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const BarPlugin = require('webpackbar')

const cssnano = require('cssnano')

// process.env.NODE_ENV = 'production'

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/container-react',
    library: 'container-react',
    libraryTarget: 'window',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}), 
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
      })
    ],
  },
  plugins: [
    new BarPlugin(),
    new StatsPlugin('resource.json', {
      chunkModules: false,
      entrypoints: true,
      source: false,
      chunks: false,
      modules: false,
      assets: false,
      children: false,
      exclude: [/node_modules/]
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
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