const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

// disable babel transpile for development
// which speed webpack about 2 times
baseWebpackConfig.module.rules.forEach((rule) => {
  if (!rule.loaders) return
  const babelIndex = rule.loaders.indexOf('babel-loader')
  if (babelIndex !== -1) {
    rule.loaders.splice(babelIndex, 1)
  }
})

// add hot update exposure code
baseWebpackConfig.entry.index.push('./build/devClient.ts')

// remove postcss-loader while dev for build performance
baseWebpackConfig.module.rules
  .filter(v => v.test && v.test.toString().match(/(css|less)/))
  .forEach((v) => {
    v.use.splice(v.use.indexOf('postcss-loader'), 1)
  })

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#inline-source-map',
})
