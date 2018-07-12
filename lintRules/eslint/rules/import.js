module.exports = {
  'extends': [
    'plugin:import/errors',
    'plugin:import/warnings',
  ],

  'plugins': ['import'],

  'settings': {
    'import/parsers': {
      'typescript-eslint-parser': [
        '.ts',
        '.tsx',
      ],
    },
    'import/extensions': [
      '.js',
      '.mjs',
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },

  'rules': {
    'import/no-absolute-path': 'off',
    'import/extensions': ['error', 'never', {
      'vue': 'always',
    }],
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js'],
    }],
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/no-dynamic-require': ['error'],
    'import/export': ['error'],
    'import/no-mutable-exports': ['error'],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          ['external', 'internal'],
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/newline-after-import': ['error'],
    'import/prefer-default-export': ['off'],
  },
}
