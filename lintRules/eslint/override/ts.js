module.exports = {
  'overrides': [
    {
      'files': ['**/*.ts'],
      'parserOptions': {
        'parser': 'typescript-eslint-parser',
      },
      'rules': {
        'indent': 'off', // use tslint-eslint-rules ter-indent. sometimes there is false negetive.
        // 'no-dupe-class-members': 'off',
        // 'no-restricted-globals': 'off',
        'no-undef': 'off', // false position on interface names

        'no-unused-vars': 'off', // using codestyle no-unused
        'vue/script-indent': 'off',
      },
    },
  ],
}
