/* eslint-disable no-console */
const chalk = require('chalk')
const client = require('webpack-hot-client')
const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../config/webpack.dev.conf.js')

const app = express()

const server = app.listen(13333, 'localhost', () => {
  const address = server.address().address
  const port = server.address().port
  const url = `http://${address}:${port}/`

  webpackConfig.output.publicPath = url

  const compiler = webpack(webpackConfig)

  client(compiler, {
    // logLevel: 'warn',
    port,
    server,
  })
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    // logLevel: 'warn',
    writeToDisk: true,
  })

  // add CORS header
  app.use((req, res, next) => {
    if (req.url.match(/hot-update\.json$/)) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    next()
  })

  app.use(webpackDevMiddlewareInstance)

  console.log([
    chalk.bgMagentaBright.black(' INFO: '),
    chalk.bgBlueBright.black(' building now.... '),
  ].join(''))
  webpackDevMiddlewareInstance.waitUntilValid(() => {
    console.log([
      chalk.bgMagentaBright.black(' INFO: '),
      chalk.bgGreenBright.black(` dev server is now up at ${url}! `),
    ].join(''))
  })
})
