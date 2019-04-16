const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const webpackConfig = require('./webpack.prod.conf')

module.exports = merge(webpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
    new SpeedMeasurePlugin(),
  ],
})
