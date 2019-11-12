module.exports = {
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        plugins: [
          require('postcss-import'),
          require('postcss-nested'),
          require('autoprefixer'),
        ]
      }
    }
  }
}