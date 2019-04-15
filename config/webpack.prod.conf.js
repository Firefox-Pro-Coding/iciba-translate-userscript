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
  performance: {
    maxEntrypointSize: (1024 ** 2) * 5,
    maxAssetSize: (1024 ** 2) * 5,
  },
  devtool: '#source-map',
})
