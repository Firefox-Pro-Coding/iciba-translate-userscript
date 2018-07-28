/* eslint-disable global-require */
// const path = require('path')

module.exports = {
  'parserOptions': {
    'ecmaVersion': 2018,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [
    'typescript',
  ],

  'extends': [
    'airbnb-base',
    './rules/airbnbOverride.js',
    './rules/vue.js',
    './rules/import.js',
    './rules/jsdoc.js',
    './override/vue.js',
    './override/ts.js',
    './override/js.js',
  ],
}
