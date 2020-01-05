const config = require('./webpack.base.conf')
const TerserPlugin = require('terser-webpack-plugin')

// using runtime only in production
config.resolve.alias.set('vue$', 'vue/dist/vue.runtime.esm.js')

config.performance.maxEntrypointSize((1024 ** 2) * 5)
config.performance.maxAssetSize((1024 ** 2) * 5)

config.optimization.minimizer('terser')
  .use(TerserPlugin, [{
    terserOptions: {
      output: {
        comments: false,
      },
    },
  }])


config.mode('production')
config.devtool('#source-map')

module.exports = config
