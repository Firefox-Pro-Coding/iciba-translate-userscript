const TerserPlugin = require('terser-webpack-plugin')
const config = require('./webpack.base.conf')

process.env.NODE_ENV = 'production'

config.performance.maxEntrypointSize((1024 ** 2) * 5)
config.performance.maxAssetSize((1024 ** 2) * 5)

config.optimization.minimizer('terser')
  .use(TerserPlugin, [{
    extractComments: false,
    terserOptions: {
      output: {
        comments: false,
      },
    },
  }])

config.mode('production')
config.devtool(false)

module.exports = config
