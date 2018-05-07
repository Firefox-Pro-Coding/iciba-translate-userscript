const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") // eslint-disable-line
const webpackConfig = require('./webpack.prod.conf')

module.exports = merge(webpackConfig, {
  mode: 'none',
  // mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
    new UglifyJsPlugin(),
  ],
})