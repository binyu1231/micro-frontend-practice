module.exports = {
  publicPath: "/",
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
      extract: false
  },
  configureWebpack: {
      devtool: 'none', // 不打包sourcemap
      output: {
          library: "singleVue", // 导出名称
          libraryTarget: "window", //挂载目标
      }
  },
  devServer: {
      contentBase: './',
      compress: true,
  }
}