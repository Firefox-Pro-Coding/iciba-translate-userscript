const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") // eslint-disable-line
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const webpackConfig = require('./webpack.prod.conf')

module.exports = merge(webpackConfig, {
  mode: 'none',
  // mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
    new UglifyJsPlugin(),
    new SpeedMeasurePlugin(),
  ],
})
