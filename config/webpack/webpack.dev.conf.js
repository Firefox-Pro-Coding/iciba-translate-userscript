const path = require('path')
const config = require('./webpack.base.conf')

const resolve = (dir) => path.join(__dirname, '../..', dir)

// add hot update exposure code
config.entry('index').add(resolve('./build/devClient.ts'))

config.mode('development')
config.devtool('eval-source-map')

module.exports = config
