const path = require('path')
const config = require('./webpack.base.conf')

process.env.NODE_ENV = 'development'

const resolve = (dir) => path.join(__dirname, '../../..', dir)

// add hot update exposure code
config.entry('index').add(resolve('./build/devClient.ts'))

config.mode('development')
config.devtool('eval-source-map')

// force using http
config.module.rule('dev-server-sockjs')
  .test(/webpack-dev-server\\client\\utils\\createSocketUrl\.js$/)
  .use('string-replace-loader')
  .loader('string-replace-loader')
  .options({
    search: 'protocol = loc.protocol;',
    replace: 'protocol = "http"',
  })

module.exports = config
