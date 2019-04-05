const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'none',
  entry: {
    index: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '~': resolve('src'),
      'assets': resolve('src/assets'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.icibahtml$/,
      //   loaders: [
      //     path.join(__dirname, '../utils/icibahtml-loader.js'),
      //   ],
      // },
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader',
          'awesome-typescript-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: '@noe132/vue-style-loader',
            options: { insertInto: "function () { return document.querySelector('.iciba-root').shadowRoot }" },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: '@noe132/vue-style-loader',
            options: { insertInto: "function () { return document.querySelector('.iciba-root').shadowRoot }" },
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: '@noe132/vue-style-loader',
            options: { insertInto: "function () { return document.querySelector('.iciba-root').shadowRoot }" },
          },
          'css-loader',
          'stylus-loader',
        ],
      },
      // {
      //   test: /\.vue$/,
      //   loader: path.join(__dirname, '../utils/vue-iciba-html-transform-loader.js'),
      //   enforce: 'pre',
      // },
      {
        test: /\.vue$/,
        loader: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false,
            },
          },
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            loaders: [
              'url-loader',
            ],
            exclude: resolve('src/assets/img/providerIcon'),
          },
          {
            loaders: [
              path.join(__dirname, '../utils/svg-hash-loader.js'),
            ],
            include: resolve('src/assets/img/providerIcon'),
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
}
