module.exports = {
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/variables',
    './rules/es6',
    './rules/imports',
    './rules/strict',
  ].map(require.resolve),
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2019,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
}
