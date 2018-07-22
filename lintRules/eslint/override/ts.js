module.exports = {
  'overrides': [
    {
      'files': [
        '**/*.ts',
        '**/*.tsx',
      ],
      'parserOptions': {
        'parser': 'typescript-eslint-parser',
      },
      'rules': {
        // use tslint-eslint-rules ter-indent.
        // false negetive on decorators
        'indent': 'off',

        // 'no-dupe-class-members': 'off',
        // 'no-restricted-globals': 'off',

        // false position on interface names
        'no-undef': 'off',

        // using codestyle no-unused.
        // false positive on decorators
        'no-unused-vars': 'off',
        'vue/script-indent': 'off',

        // incompatible with typescript
        'no-useless-constructor': 'off',

        // conficts with typescript overload
        'no-dupe-class-members': 'off',
      },
    },
  ],
}
