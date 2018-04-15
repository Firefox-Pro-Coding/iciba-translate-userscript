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
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     stylus: [
        //       { loader: 'css-loader' },
        //       {
        //         loader: 'stylus-loader',
        //         options: {
        //           preferPathResolver: 'webpack',
        //         },
        //       },
        //     ],
        //   },
        // },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
        include: [resolve('src')],
      },
    ],
  },

  devtool: 'inline-source-map',
}
