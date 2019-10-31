module.exports = {
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
      '@typescript-eslint/array-type': ['error', { 'default': 'generic' }],
      '@typescript-eslint/await-thenable': ['error'],
      '@typescript-eslint/ban-ts-ignore': ['error'],
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

      'brace-style': ['off'],
      '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],

      'camelcase': 'off',
      '@typescript-eslint/camelcase': ['off'],

      '@typescript-eslint/class-name-casing': ['error'],
      '@typescript-eslint/consistent-type-assertions': ['error', {
        'assertionStyle': 'as',
        'objectLiteralTypeAssertions': 'allow-as-parameter',
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-member-accessibility': ['error'],

      'func-call-spacing': 'off',
      '@typescript-eslint/func-call-spacing': ['error', 'never'],
      '@typescript-eslint/generic-type-naming': ['off'],

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
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',

          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method',

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
      '@typescript-eslint/no-array-constructor': ['error'],

      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': ['error', {
        allow: [
          'constructors',
          'arrowFunctions',
        ],
      }],

      '@typescript-eslint/no-empty-interface': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],

      'no-extra-parens': 'off',
      '@typescript-eslint/no-extra-parens': ['error', 'all', {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all', // delegate to eslint-plugin-react
        enforceForArrowConditionals: false,
      }],

      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': ['off', { 'ignoreNumericLiteralTypes': true }],

      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
      '@typescript-eslint/no-floating-promises': ['off', { ignoreVoid: true }], // too much noise
      '@typescript-eslint/no-for-in-array': ['error'],
      '@typescript-eslint/no-inferrable-types': ['off'],
      '@typescript-eslint/no-misused-new': ['error'],
      '@typescript-eslint/no-namespace': ['error'],
      '@typescript-eslint/no-non-null-assertion': ['off'],
      '@typescript-eslint/no-parameter-properties': ['error'],
      '@typescript-eslint/no-require-imports': ['error'],
      '@typescript-eslint/no-this-alias': ['error'],
      '@typescript-eslint/no-type-alias': ['off'],
      // false positive
      '@typescript-eslint/no-misused-promises': ['off'],
      // false positive https://github.com/typescript-eslint/typescript-eslint/issues/989
      '@typescript-eslint/no-unnecessary-condition': ['off'],
      '@typescript-eslint/no-unnecessary-qualifier': ['error'],
      '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
      '@typescript-eslint/no-unnecessary-type-assertion': ['error'],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],

      'no-use-before-define': ['off'],
      '@typescript-eslint/no-use-before-define': ['error'],

      '@typescript-eslint/no-useless-constructor': ['error'],
      '@typescript-eslint/no-var-requires': ['error'],

      '@typescript-eslint/prefer-for-of': ['off'],
      '@typescript-eslint/prefer-function-type': ['off'],
      '@typescript-eslint/prefer-includes': ['error'],
      '@typescript-eslint/prefer-namespace-keyword': ['error'],
      '@typescript-eslint/prefer-readonly': ['off'],
      '@typescript-eslint/prefer-regexp-exec': ['off'],
      '@typescript-eslint/prefer-string-starts-ends-with': ['error'],

      '@typescript-eslint/promise-function-async': ['off'],


      'quotes': 'off',
      '@typescript-eslint/quotes': ['error', 'single'],

      '@typescript-eslint/require-array-sort-compare': ['off'],

      'require-await': 'off',
      '@typescript-eslint/require-await': ['error'],

      '@typescript-eslint/restrict-plus-operands': ['error'],

      'semi': 'off',
      '@typescript-eslint/semi': ['error', 'never'],

      '@typescript-eslint/strict-boolean-expressions': ['off'],
      '@typescript-eslint/typedef': ['off'],
      '@typescript-eslint/triple-slash-reference': ['error', { 'path': 'never', 'types': 'never', 'lib': 'never' }],
      '@typescript-eslint/type-annotation-spacing': ['error', {
        'overrides': {
          'colon': { 'before': false, 'after': true },
          'arrow': { 'before': true, 'after': true },
        },
      }],
      '@typescript-eslint/unbound-method': ['off'],
      '@typescript-eslint/unified-signatures': ['off'],
    },
  }],
}
