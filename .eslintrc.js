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
    './lintRules/eslint.js',
  ],

  'env': {
    'es6': true,
    'node': true,
    'browser': true,
  },

  'settings': {
    'import/resolver': {
      'typescript': {},
    },
  },

  'overrides': [{
    'files': [
      '*.ts',
      '*.tsx',
    ],

    'parser': '@typescript-eslint/parser',
    'parserOptions': {
      'project': 'tsconfig.json',
      'createDefaultProgram': true,
    },

    'plugins': [
      '@typescript-eslint',
    ],

    'rules': {
      '@typescript-eslint/no-unused-vars-experimental': ['error', {
        'ignoredNamesRegex': '^h$',
      }],
      '@typescript-eslint/no-unused-vars': ['off', {
        'varsIgnorePattern': '^h$',
      }],
    },
  }, {
    'files': [
      '*.vue',
      '*.tsx',
    ],


    'rules': {
      'vue/valid-v-model': 'off',
      'vue/valid-v-for': 'off',
      'vue/no-template-key': 'off',
      'vue/require-v-for-key': 'off',
      'vue/no-v-for-template-key': 'off',
    },
  }],
}
