const path = require('path')
const Config = require('webpack-chain')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (dir) => path.join(__dirname, '../..', dir)

const config = new Config()

config.mode('none')

config.resolveLoader.alias.set('local-vue-style-loader', path.join(__dirname, '../../utils/vue-style-loader'))

config.entry('index')
  .add(resolve('./src/index.ts'))

config.output
  .path(resolve('dist'))
  .filename('iciba.user.js')

config.resolve.extensions
  .merge(['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'])

config.resolve.alias
  .set('~', resolve('src'))
  .set('assets', resolve('src/assets'))
  .set('vue$', 'vue/dist/vue.esm.js')

config.module.rule('eslint')
  .test(/\.(tsx?|jsx?)$/)
  .enforce('pre')
  .use('eslint')
  .loader('eslint-loader')
  .end()
  .exclude.add(/node_modules/)

config.module.rule('ts')
  .test(/\.tsx?$/)
  .use('babel')
  .loader('babel-loader')
  .end()
  .use('ts')
  .loader('ts-loader')
  .end()
  .exclude.add(/node_modules/)

config.module.rule('js')
  .test(/\.jsx?$/)
  .use('babel')
  .loader('babel-loader')
  .end()
  .exclude.add(/node_modules/)

config.module.rule('css')
  .test(/\.css$/)
  .use('vue-style-loader')
  .loader('local-vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()

config.module.rule('less')
  .test(/\.less$/)
  .use('vue-style-loader')
  .loader('local-vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()
  .use('less-loader')
  .loader('less-loader')
  .end()

config.module.rule('vue')
  .test(/\.vue$/)
  .use('vue-loader')
  .loader('vue-loader')
  .options({
    compilerOptions: {
      whitespace: 'condense',
    },
  })
  .end()

config.module.rule('svg')
  .test(/\.svg$/)
  .use('raw-loader')
  .loader('raw-loader')
  .end()

config.plugin('vue-loader-plugin')
  .use(VueLoaderPlugin)

module.exports = config
