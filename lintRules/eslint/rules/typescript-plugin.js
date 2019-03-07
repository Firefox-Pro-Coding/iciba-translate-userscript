module.exports = {
  'overrides': [
    {
      'files': [
        '**/*.ts',
        '**/*.tsx',
      ],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'ecmaFeatures': {
          'jsx': true,
        },
      },
      'rules': {
        // 'no-dupe-class-members': 'off',
        // 'no-restricted-globals': 'off',

        // false position on interface names
        'no-undef': 'off',
        'vue/script-indent': 'off',

        // incompatible with typescript
        'no-useless-constructor': 'off',

        // conficts with typescript overload
        'no-dupe-class-members': 'off',

        // false positive after migrating to @typescript-eslint/parser
        'import/named': 'off',


        '@typescript-eslint/adjacent-overload-signatures': ['error'],
        '@typescript-eslint/array-type': ['error', 'generic'],
        '@typescript-eslint/ban-types': ['error', {
          'types': {
            'Object': {
              'message': 'Avoid using the `Object` type. Did you mean `object`?',
              'fixWith': 'object',
            },
            'Function': 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
            'Boolean': {
              'message': 'Avoid using the `Boolean` type. Did you mean `boolean`?',
              'fixWith': 'boolean',
            },
            'Number': {
              'message': 'Avoid using the `Number` type. Did you mean `number`?',
              'fixWith': 'number',
            },
            'String': {
              'message': 'Avoid using the `String` type. Did you mean `string`?',
              'fixWith': 'string',
            },
            'Symbol': {
              'message': 'Avoid using the `Symbol` type. Did you mean `symbol`?',
              'fixWith': 'symbol',
            },
          },
        }],

        // note you must disable the base rule as it can report incorrect errors
        'camelcase': 'off',
        '@typescript-eslint/camelcase': ['off'],

        '@typescript-eslint/class-name-casing': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/generic-type-naming': ['off'],

        // note you must disable the base rule as it can report incorrect errors
        'indent': ['off'],
        '@typescript-eslint/indent': ['error', 2, {
          'SwitchCase': 1,
          'VariableDeclarator': 1,
        }],

        '@typescript-eslint/interface-name-prefix': ['error', 'never'],
        '@typescript-eslint/member-delimiter-style': ['error', {
          'multiline': {
            'delimiter': 'none',
            'requireLast': true,
          },
          'singleline': {
            'delimiter': 'comma',
            'requireLast': false,
          },
        }],
        '@typescript-eslint/member-naming': ['off'],
        '@typescript-eslint/member-ordering': ['error', {
          'default': [
            'public-static-field',
            'protected-static-field',
            'private-static-field',

            'public-static-method',
            'protected-static-method',
            'private-static-method',

            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            'public-constructor',
            'protected-constructor',
            'private-constructor',

            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        }],
        '@typescript-eslint/no-angle-bracket-type-assertion': ['error'],
        '@typescript-eslint/no-array-constructor': ['error'],
        '@typescript-eslint/no-empty-interface': ['error'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
        '@typescript-eslint/no-for-in-array': ['error'],
        '@typescript-eslint/no-inferrable-types': ['off'],
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-namespace': ['error'],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/no-object-literal-type-assertion': ['error'],
        '@typescript-eslint/no-parameter-properties': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        '@typescript-eslint/no-this-alias': ['error'],
        '@typescript-eslint/no-triple-slash-reference': ['error'],
        '@typescript-eslint/no-type-alias': ['off'],

        // not implemented
        // '@typescript-eslint/no-unnecessary-qualifier': ['error'],

        // https://github.com/typescript-eslint/typescript-eslint/issues/101
        // '@typescript-eslint/no-unnecessary-type-assertion': ['error'],

        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        'no-use-before-define': ['off'],
        '@typescript-eslint/no-use-before-define': ['error'],

        '@typescript-eslint/no-useless-constructor': ['error'],
        '@typescript-eslint/no-var-requires': ['error'],

        // not implemented
        // '@typescript-eslint/prefer-function-type': ['error'],

        '@typescript-eslint/prefer-interface': ['error'],
        '@typescript-eslint/prefer-namespace-keyword': ['error'],
        '@typescript-eslint/promise-function-async': ['off'],

        // https://github.com/typescript-eslint/typescript-eslint/issues/101
        // '@typescript-eslint/restrict-plus-operands': ['error'],

        '@typescript-eslint/type-annotation-spacing': ['error', {
          'overrides': {
            'colon': { 'before': false, 'after': true },
            'arrow': { 'before': true, 'after': true },
          },
        }],
      },
    },
    {
      'files': [
        '**/*.tsx',
      ],
      'rules': {
        '@typescript-eslint/no-unused-vars': ['off'],
      },
    },
  ],
}
