const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  resolve: {
    alias: {
      // using runtime only in production
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
  },
  devtool: '#source-map',
})
