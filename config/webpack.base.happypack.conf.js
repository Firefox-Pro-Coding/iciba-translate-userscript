const path = require('path')
const HappyPack = require('happypack')

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
        loader: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'happypack/loader?id=vue',
      },
      {
        test: /\.svg$/,
        loader: 'happypack/loader?id=svg',
        include: [resolve('src')],
      },
    ],
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            happyPackMode: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'vue',
      loaders: [
        {
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
      ],
    }),
    new HappyPack({
      id: 'svg',
      loaders: ['raw-loader'],
    }),
  ],

  devtool: 'inline-source-map',
}
