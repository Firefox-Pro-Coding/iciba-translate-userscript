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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
    alias: {
      '~': resolve('src'),
      'assets': resolve('src/assets'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          { loader: 'awesome-typescript-loader', options: { silent: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
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
      // {
      //   test: /\.(woff|woff2|ttf|eot)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 0,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
}
