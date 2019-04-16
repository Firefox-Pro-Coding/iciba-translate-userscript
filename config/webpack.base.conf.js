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
    filename: 'iciba.user.js',
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
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader',
          { loader: 'awesome-typescript-loader', options: { silent: true } },
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
        test: /\.globalless$/,
        use: [
          '@noe132/vue-style-loader',
          'css-loader',
          'less-loader',
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
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
}
