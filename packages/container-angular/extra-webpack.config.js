const StatsPlugin = require('stats-webpack-plugin')
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = config => {
  const c = singleSpaAngularWebpack(config);

  c.output.library = 'container-angular'
  c.output.libraryTarget = 'window'
  c.plugins.push(new StatsPlugin('resource.json', {
    chunkModules: false,
    entrypoints: true,
    source: false,
    chunks: false,
    modules: false,
    assets: false,
    children: false,
    exclude: [/node_modules/]
  }))
  // Feel free to modify this webpack config however you'd like to
  return c;
};
