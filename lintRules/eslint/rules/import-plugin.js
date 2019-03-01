const path = require('path')

module.exports = {
  'extends': [
    'plugin:import/errors',
    'plugin:import/warnings',
  ],

  'plugins': ['import'],

  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': [
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

    'import/resolver': {
      'webpack': {
        'config': {
          'resolve': {
            'extensions': [
              '.js',
              '.mjs',
              '.jsx',
              '.json',
              '.ts',
              '.tsx',
              '.d.ts',
              '.vue',
            ],
            'alias': {
              '~': path.resolve(__dirname),
              '@': path.resolve(__dirname),
              '~~': process.cwd(),
              '@@': process.cwd(),
              'property-decorator$': path.resolve(__dirname, './utils/property-decorator.ts'),
            },
          },
        },
      },
    },
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
