/* eslint-disable */
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/container-vue' : '/',
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
      extract: false
  },
  configureWebpack: {
      devtool: 'none', // 不打包sourcemap
      output: {
        library: "container-vue", // 导出名称
        libraryTarget: "window", //挂载目标
      },
      plugins: [
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
    ]
  },
  devServer: {
      contentBase: './',
      compress: true,
  }
}