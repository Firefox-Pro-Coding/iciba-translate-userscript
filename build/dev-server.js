const chalk = require('chalk')
const client = require('webpack-hot-client')
const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../config/webpack.dev.conf.js')

const compiler = webpack(webpackConfig)
const app = express()

const port = process.env.PORT || 3000

const server = app.listen(port, 'localhost', () => {
  console.log()
  client(compiler, {
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
      res.set('Access-Control-Allow-Origin', '*')
    }
    next()
  })

  app.use(webpackDevMiddlewareInstance)

  console.log([
    chalk.bgMagentaBright.black(` INFO: `),
    chalk.bgBlueBright.black(` building now.... `),
  ].join(''))
  webpackDevMiddlewareInstance.waitUntilValid(() => {
    console.log([
      chalk.bgMagentaBright.black(` INFO: `),
      chalk.bgGreenBright.black(` dev server is now up at port ${port}! `),
    ].join(''))
    // app.listen(port)
  })
})
