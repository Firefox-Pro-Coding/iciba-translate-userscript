const path = require('path')

module.exports = {
  'globals': {
    'document': false,
    'navigator': false,
    'window': false,
    'unsafeWindow': false,
    'GM': false,
    'GM_getValue': true,
    'GM_setValue': true,
    'GM_registerMenuCommand': true,
    'GM_xmlhttpRequest': true,
  },

  'extends': [
    '@noe132/eslint-config-vue',
  ],

  'env': {
    'es6': true,
    'node': true,
    'browser': true,
  },

  'root': true,

  'settings': {
    'import/resolver': {
      'typescript': path.join(__dirname, 'tsconfig.json'),
    },
  },

  'overrides': [
    {
      'files': [
        '*.ts',
        '*.tsx',
      ],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
      },

      'rules': {
        'vue/component-definition-name-casing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/one-component-per-file': 'off',
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-unused-vars': ['off', {
          'varsIgnorePattern': '^h$',
        }],
      },
    },
    {
      'files': [
        '*.vue',
        '*.tsx',
      ],

      'rules': {
        'vue/component-definition-name-casing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-v-model': 'off',
        'vue/valid-v-for': 'off',
        'vue/no-template-key': 'off',
        'vue/no-v-for-template-key': 'off',
        'vue/require-v-for-key': 'off',
        'vue/require-default-prop': 'off',
      },
    },
  ],
}
