var path = require('path')
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('tailwindcss')(path.resolve(__dirname, './tailwindcss.config.js')),
  ]
}