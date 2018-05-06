const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackConfig = require('./webpack.prod.conf')

module.exports = merge(webpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
})
