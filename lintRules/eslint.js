/* eslint-disable global-require */
module.exports = {
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },

  'extends': [
    'airbnb-base',
    './eslint/rules/airbnbOverride.js',
    './eslint/rules/vue.js',
    './eslint/rules/import.js',
    './eslint/override/vue.js',
    './eslint/override/ts.js',
  ],
}
