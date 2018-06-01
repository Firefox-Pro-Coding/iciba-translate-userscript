module.exports = {
  'overrides': [
    {
      'files': ['*.vue'],
      'parserOptions': {
        'parser': 'typescript-eslint-parser',
      },
      'rules': {
        // disable some rules due to vue-eslint-parset limitation
        // https://github.com/mysticatea/vue-eslint-parser#%EF%B8%8F-known-limitations
        'indent': 'off',
        'max-len': 'off',
      },
    },
  ],
}
