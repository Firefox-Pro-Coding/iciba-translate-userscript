const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const config = require('./webpack.base.conf')

process.env.NODE_ENV = 'development'

const resolve = (dir) => path.join(__dirname, '../../..', dir)

// add hot update exposure code
config.entry('index').add(resolve('./build/devClient.ts'))

config.mode('development')
config.devtool(false)
config.plugin('sourcemap')
  .use(webpack.EvalSourceMapDevToolPlugin, [{
    exclude: [
      /tailwind\.sass$/,
      // exclude source map from some big and unimportant package
      // for less memory usage and faster build time
      /node_modules.*(core-js)/,
    ],
  }])

config.target('web')

// force using http
config.module.rule('dev-server-sockjs')
  .test(/webpack-dev-server\\client\\utils\\createSocketUrl\.js$/)
  .use('string-replace-loader')
  .loader('string-replace-loader')
  .options({
    search: 'protocol = loc.protocol;',
    replace: 'protocol = "http"',
  })

config.plugin('fork-ts-checker-webpack-plugin')
  .use(ForkTsCheckerWebpackPlugin, [{
    typescript: {
      configFile: resolve('tsconfig.json'),
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
    },
  }])

module.exports = config
