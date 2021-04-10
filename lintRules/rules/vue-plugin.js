module.exports = {
  overrides: [{
    files: ['*.vue'],

    extends: [
      'plugin:vue/vue3-recommended',
    ],

    rules: {
      // disable some rules due to vue-eslint-parset limitation
      // https://github.com/mysticatea/vue-eslint-parser#%EF%B8%8F-known-limitations
      'indent': 'off',
      'max-len': 'off',

      // base
      'vue/comment-directive': 'error',
      'vue/experimental-script-setup-vars': 'error',
      'vue/jsx-uses-vars': 'error',

      // essential
      'vue/singleline-html-element-content-newline': 'off',

      // recommended
      'vue/attributes-order': 'off',
      'vue/no-v-html': 'off',
      'vue/order-in-components': 'off',
      'vue/max-attributes-per-line': ['error', {
        'singleline': Infinity,
        'multiline': {
          'max': 1,
          'allowFirstLine': false,
        },
      }],

      // TODO: Uncategorized
      'vue/block-tag-newline': 'error',
      'vue/html-button-has-type': 'off',
      'vue/max-len': 'off',
      'vue/padding-line-between-blocks': 'off',
      'vue/require-direct-export': 'off',
      'vue/require-name-property': 'off',
      'vue/sort-keys': 'off',
      'vue/static-class-names-order': 'off',

      // TODO: extension rules
    },
  }],
}
