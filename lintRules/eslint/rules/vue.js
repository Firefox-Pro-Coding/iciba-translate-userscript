module.exports = {
  'parserOptions': {
    'ecmaVersion': 2018,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },

  'extends': [
    'plugin:vue/essential',
  ],

  'env': {
    'es6': true,
    'node': true,
    'browser': true,
  },

  'rules': {
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
      'ignores': [],
    }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1,
      'ignores': [],
    }],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/mustache-interpolation-spacing': [2, 'always'],
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-multi-spaces': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/html-quotes': ['error', 'double'],
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always',
    }],
  },
}
