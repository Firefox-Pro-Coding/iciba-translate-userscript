const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

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
  devtool: '#eval-source-map', // for correct line mapping
})
