module.exports = {
  extends: [
    './airbnb/best-practices',
    './airbnb/errors',
    './airbnb/node',
    './airbnb/style',
    './airbnb/variables',
    './airbnb/es6',
    './airbnb/imports',
    './airbnb/strict',
  ].map(require.resolve),
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
}
