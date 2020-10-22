const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-chain')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (dir) => path.join(__dirname, '../../..', dir)

const config = new Config()

const createCssRule = (name, test) => config.module.rule(name)
  .test(test)
  .use('vue-style-loader')
  .loader('local-vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .options({ esModule: false })
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()

config.mode('none')

config.cache({
  type: 'filesystem',
  buildDependencies: {
    config: [__filename],
    babel: [resolve('build/config/babelrc.js')],
    package: [resolve('package.json')],
  },
})

config.resolveLoader.alias.set('local-vue-style-loader', resolve('utils/vue-style-loader'))

config.context(resolve(''))

config.entry('index')
  .add(resolve('./src/index.ts'))

config.output
  .path(resolve('dist'))
  .filename('iciba.user.js')
  .set('uniqueName', 'iciba')

config.resolve.extensions
  .merge(['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'])

config.resolve.alias
  .set('~', resolve('src'))
  .set('assets', resolve('src/assets'))
  .set('fp-ts/lib', 'fp-ts/es6')

config.module.rule('ts')
  .test(/\.tsx?$/)
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

createCssRule('tailwind', /tailwind\.custom$/)
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
  .use(ForkTsCheckerWebpackPlugin, [{
    eslint: {
      files: './src/**/*.{ts,tsx,js,jsx,vue}',
    },
  }])

config.plugin('duplicate-package-checker-webpack-plugin')
  .use(DuplicatePackageCheckerPlugin)

config.plugin('vue-bundle-flags')
  .use(webpack.DefinePlugin, [{
    __VUE_OPTIONS_API__: JSON.stringify(false),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }])

module.exports = config
