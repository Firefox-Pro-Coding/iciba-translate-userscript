/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./config/webpack/webpack.dev.conf.js')

const url = 'http://localhost:13333/'
webpackConfig.output.publicPath(url)

const compiler = webpack(webpackConfig.toConfig())
const devServer = new WebpackDevServer(compiler, {
  https: false,
  host: 'localhost',
  port: 13333,
  webSocketServer: 'ws',
  allowedHosts: 'all',
  hot: true,
  client: {
    webSocketURL: {
      port: 13333,
    },
  },
  devMiddleware: {
    stats: 'minimal',
    publicPath: '/',
    writeToDisk: true,
  },
  static: false,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
})

devServer.start();
