const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '~/src': resolve('src'),
      // for stylus
      'assets': resolve('src/assets'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      // },
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: [
              'babel-loader',
              'ts-loader',
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        include: [resolve('src')],
      },
    ],
  },

  devtool: 'inline-source-map',
}
