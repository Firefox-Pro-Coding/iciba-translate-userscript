/* eslint-disable global-require */
// const path = require('path')

module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],

  'extends': [
    'airbnb-base',
    './rules/airbnb-override.js',
    './rules/import-plugin.js',
    './rules/jsdoc-plugin.js',
    // './rules/react-plugin.js',
    './rules/typescript-plugin.js',
    './rules/vue-plugin.js',
  ],
}
