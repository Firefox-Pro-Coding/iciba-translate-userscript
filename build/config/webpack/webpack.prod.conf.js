const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const config = require('./webpack.base.conf')

process.env.NODE_ENV = 'production'

const resolve = (dir) => path.join(__dirname, '../../..', dir)

config.performance.maxEntrypointSize((1024 ** 2) * 5)
config.performance.maxAssetSize((1024 ** 2) * 5)

config.optimization.minimize(false)
// config.optimization.minimizer('terser')
//   .use(TerserPlugin, [{
//     extractComments: false,
//     terserOptions: {
//       output: {
//         comments: false,
//       },
//     },
//   }])

config.plugin('fork-ts-checker-webpack-plugin')
  .use(ForkTsCheckerWebpackPlugin, [{
    typescript: {
      configFile: resolve('tsconfig.json'),
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
    },
    // eslint: {
    //   files: './src/**/*.{ts,tsx,js,jsx,vue}',
    // },
  }])

config.mode('production')
config.devtool(false)

module.exports = config
