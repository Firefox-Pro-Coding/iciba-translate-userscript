module.exports = {
  'plugins': [
    'jsdoc',
  ],

  'settings': {
    'jsdoc': {
      'allowOverrideWithoutParam': true,
      'tagNamePreference': {
        'arg': 'param',
        'argument': 'param',
        'constructor': 'class',
        'returns': 'return',
        'virtual': 'abstract',
      },
    },
  },

  'rules': {
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    // 'jsdoc/newline-after-description': 'error',
    'jsdoc/no-undefined-types': 'error',
    // 'jsdoc/require-description-complete-sentence': 'error',
    // 'jsdoc/require-example': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    // 'jsdoc/require-param': 'error',
    // 'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    // 'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/valid-types': 'error',
  },
}
