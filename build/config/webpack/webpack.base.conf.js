const os = require('os')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const Config = require('webpack-chain')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const workers = Math.min(1, os.cpus().length - 1)
const resolve = (dir) => path.join(__dirname, '../../..', dir)

const config = new Config()

const createCssRule = (name, test) => config.module.rule(name)
  .test(test)
  .use('thread-loader')
  .loader('thread-loader')
  .options({ workers })
  .end()
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
  .options({ workers })
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
  .options({ workers })
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

config.plugin('duplicate-package-checker-webpack-plugin')
  .use(DuplicatePackageCheckerPlugin)

config.plugin('vue-bundle-flags')
  .use(webpack.DefinePlugin, [{
    __VUE_OPTIONS_API__: JSON.stringify(false),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }])


config.module.rule('json-stringify-replace')
  .use('string-replace-loader')
  .loader('string-replace-loader')
  .options({
    search: 'JSON.stringify(',
    replace: 'require(\'~/util/stringify\').stringify(',
  })

config.module.rule('vue-runtime-dom-trsuted-html-hack')
  // node_modules\@vue\runtime-dom\dist\runtime-dom.esm-bundler.js
  .test(/@vue[\\/]runtime-dom[\\/]dist[\\/]runtime-dom.esm-bundler\.js$/)
  .use('string-replace-loader')
  .loader('string-replace-loader')
  .options({
    multiple: [
      {
        search: 'container.innerHTML = \'\';',
        replace: 'container.childNodes.forEach(v => container.removeChild(v))',
      },
      {
        // eslint-disable-next-line no-template-curly-in-string
        search: 't.innerHTML = isSVG ? `<svg>${content}</svg>` : content',
        // eslint-disable-next-line no-template-curly-in-string
        replace: 't.innerHTML = icibaUserscriptTrustedHTML(isSVG ? `<svg>${content}</svg>` : content);',
      },
      {
        // eslint-disable-next-line no-template-curly-in-string
        search: 'el[key] = value == null ? \'\' : value',
        // eslint-disable-next-line no-template-curly-in-string
        replace: 'el[key] = icibaUserscriptTrustedHTML(value == null ? \'\' : value)',
      },
    ],
  })

config.plugin('progress')
  .use(ProgressBarPlugin, [{
    format: [
      chalk.cyan.bold('  build '),
      chalk.bold('['),
      ':bar',
      chalk.bold(']'),
      chalk.green.bold(' :percent'),
      ' :msg',
    ].join(''),
    width: 30,
  }])

module.exports = config
