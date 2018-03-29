var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '~/src': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader!babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
    ]
  },

  devtool: '#source-map',
}
