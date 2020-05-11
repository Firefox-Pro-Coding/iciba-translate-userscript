/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack/webpack.dev.conf.js')

const url = 'http://localhost:13333/'
webpackConfig.output.publicPath(url)

const compiler = webpack(webpackConfig.toConfig())
const devServer = new WebpackDevServer(compiler, {
  https: false,
  publicPath: '/',
  writeToDisk: true,
  host: '127.0.0.1',
  sockPort: 13333,
  transportMode: 'ws',
  disableHostCheck: true,
  contentBase: false,
  hot: true,
  stats: 'minimal',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
})

devServer.listen(13333)
