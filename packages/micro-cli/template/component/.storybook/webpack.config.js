var path = require('path')


module.exports = async ({ config }) => {
  config.module.rules.push({
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
    test: /\.tsx?$/,
    exclude: /node_modules/,
  })

  config.module.rules.push({
    loader: require.resolve('postcss-loader'),
    options: {
      sourceMap: true,
      config: {
        path: path.resolve(__dirname, './'),
      }
    },
    test: /\.css$/,
    exclude: /node_modules/,
    // include: path.resolve(__dirname, '../storybook'),
  })
 

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}