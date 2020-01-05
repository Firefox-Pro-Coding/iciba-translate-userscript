const path = require('path')
const config = require('./webpack.base.conf')

const resolve = (dir) => path.join(__dirname, '../..', dir)

// add hot update exposure code
config.entry('index').add(resolve('./build/devClient.ts'))

// don't block webpack while dev
config.module.rule('eslint')
  .use('eslint')
  .options({
    emitWarning: true,
  })
  .end()

// remove postcss-loader while dev for build performance
config.module.rule('css').uses.delete('postcss-loader')
config.module.rule('less').uses.delete('postcss-loader')

config.mode('development')
config.devtool('#eval-source-map')

module.exports = config
