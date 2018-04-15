const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  devtool: '#inline-source-map',
  plugins: [
  ],
})
