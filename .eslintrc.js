module.exports = {
  'globals': {
    'document': false,
    'navigator': false,
    'window': false,
    'GM': false,
    'GM_getValue': true,
    'GM_setValue': true,
    'GM_xmlhttpRequest': true,
  },

  'extends': [
    './lintRules/eslint/eslint.js',
  ],

  'env': {
    'es6': true,
    'node': true,
    'browser': true,
  },

  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.base.conf.js',
      },
    },
  },
}
