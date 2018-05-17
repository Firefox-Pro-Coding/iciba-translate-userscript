const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const port = process.env.PORT || 3000

module.exports = {
  mode: 'none',
  entry: {
    index: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: `http://localhost:${port}/`,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '~/src': resolve('src'),
      'assets': resolve('src/assets'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.icibahtml$/,
        loaders: [
          path.join(__dirname, '../utils/icibahtml-loader.js'),
        ],
      },
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader',
          'ts-loader',
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
        loaders: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            loaders: [
              'vue-style-loader',
              'css-loader',
              'less-loader',
            ],
          },
          {
            loaders: [
              'style-loader',
              'css-loader',
              'less-loader',
            ],
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: path.join(__dirname, '../utils/vue-iciba-html-transform-loader.js'),
        enforce: 'pre',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
