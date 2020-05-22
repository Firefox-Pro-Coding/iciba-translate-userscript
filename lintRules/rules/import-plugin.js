module.exports = {
  plugins: ['import'],

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
      ],
    },
  },


  rules: {
    /* Static analysis */
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: false }],
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    // 'import/no-restricted-paths': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'error',
    // 'import/no-internal-modules': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    // 'import/no-relative-parent-imports': 'error',
    // 'import/no-unused-modules': 'error',

    /* Helpful warnings */
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-mutable-exports': 'error',

    /* Module systems */
    // 'import/unambiguous': 'error',
    // 'import/no-commonjs': 'error',
    // 'import/no-amd': 'error',
    // 'import/no-nodejs-modules': 'error',

    /* Style guide */
    'import/first': 'error',
    // 'import/exports-last': 'error',
    'import/no-duplicates': 'error',
    // 'import/no-namespace': 'error',
    'import/extensions': ['error', 'never', {
      vue: 'always',
    }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          ['external', 'internal'],
          ['parent', 'sibling', 'unknown'],
          'index',
        ],
      },
    ],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off', // override airbnb
    // 'import/max-dependencies': 'off',
    'import/no-unassigned-import': 'error',
    'import/no-named-default': 'error',
    // 'import/no-default-export': 'error',
    // 'import/no-named-export': 'error',
    // 'import/no-anonymous-default-export': 'error',
    // 'import/group-exports': 'error',
    // 'import/dynamic-import-chunkname': 'error',
  },
}
