const path = require('path')
const Config = require('webpack-chain')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (dir) => path.join(__dirname, '../..', dir)

const config = new Config()

const createCssRule = (name, test, tailwind = false) => config.module.rule(name)
  .test(test)
  .use('cache-loader')
  .loader('cache-loader')
  .end()
  .use('vue-style-loader')
  .loader('local-vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .options({
    config: {
      ctx: {
        tailwind,
      },
    },
  })
  .end()

config.mode('none')

config.resolveLoader.alias.set('local-vue-style-loader', path.join(__dirname, '../../utils/vue-style-loader'))

config.context(path.join(__dirname, '../..'))

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

config.module.rule('ts')
  .test(/\.tsx?$/)
  .use('cache-loader')
  .loader('cache-loader')
  .end()
  .use('thread-loader')
  .loader('thread-loader')
  .options({ workers: 3 })
  .end()
  .use('babel')
  .loader('babel-loader')
  .end()
  .use('ts')
  .loader('ts-loader')
  .options({ happyPackMode: true, transpileOnly: true })
  .end()
  .exclude.add(/node_modules/)

config.module.rule('js')
  .test(/\.jsx?$/)
  .use('cache-loader')
  .loader('cache-loader')
  .end()
  .use('thread-loader')
  .loader('thread-loader')
  .options({ workers: 3 })
  .end()
  .use('babel')
  .loader('babel-loader')
  .end()
  .exclude.add(/node_modules/)

createCssRule('css', /\.css$/)
createCssRule('sass', /\.(sass|scss)$/)
  .use('sass-loader')
  .loader('sass-loader')
  .end()
createCssRule('tailwind', /tailwind\.tws$/, true)
  .use('sass-loader')
  .loader('sass-loader')
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

config.plugin('fork-ts-checker-webpack-plugin')
  .use(ForkTsCheckerWebpackPlugin, [{ eslint: true, vue: true }])

module.exports = config
