module.exports = {
  overrides: [{
    files: [
      '*.ts',
      '*.tsx',
    ],

    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
    },

    plugins: [
      '@typescript-eslint',
    ],

    rules: {
      'vue/script-indent': 'off',

      // conficts with typescript overload
      'no-dupe-class-members': 'off',

      // Base Rules
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-types': ['error', {
        types: {
          'String': {
            message: 'Use string instead',
            fixWith: 'string',

          },
          'Boolean': {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          'Number': {
            message: 'Use number instead',
            fixWith: 'number',
          },
          'Symbol': {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          'Function': {
            message: [
              'The `Function` type accepts any function-like value.',
              'It provides no type safety when calling the function, which can be a common source of bugs.',
              'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
              'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
            ].join('\n'),
          },
          'Object': {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          '{}': {
            message: [
              '`{}` actually means "any non-nullish value".',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          'object': {
            message: [
              'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
              'Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.',
            ].join('\n'),
          },
        },
      }],
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/consistent-type-assertions': ['off', {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      }],
      '@typescript-eslint/member-ordering': ['error', {
        default: [
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
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      'camelcase': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z].+$',
            match: false,
          },
        },
      ],
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
      '@typescript-eslint/no-floating-promises': 'off', // too much noise
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      // false positive
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-parameter-properties': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-throw-literal': 'error',
      '@typescript-eslint/no-type-alias': 'off',
      // too many false positive due to 3ed lib typing https://github.com/typescript-eslint/typescript-eslint/issues/989
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars-experimental': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off', // too much noise
      '@typescript-eslint/triple-slash-reference': ['error', {
        path: 'never',
        types: 'never',
        lib: 'never',
      }],
      '@typescript-eslint/type-annotation-spacing': ['error', {
        overrides: {
          colon: { before: false, after: true },
          arrow: { before: true, after: true },
        },
      }],
      '@typescript-eslint/typedef': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/unified-signatures': 'error',


      // Extension Rules
      'brace-style': 'off',
      '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],

      'comma-spacing': 'off',
      '@typescript-eslint/comma-spacing': 'error',

      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',

      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',

      'func-call-spacing': 'off',
      '@typescript-eslint/func-call-spacing': ['error', 'never'],

      'indent': 'off',
      '@typescript-eslint/indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
      }],

      '@typescript-eslint/init-declarations': 'off',

      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': ['error', {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      }],

      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': ['error', 'always', {
        exceptAfterOverload: true,
        exceptAfterSingleLine: true,
      }],

      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',

      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': ['error', {
        allow: [
          'constructors',
          'arrowFunctions',
        ],
      }],

      'no-extra-parens': 'off',
      '@typescript-eslint/no-extra-parens': ['error', 'all', {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all', // delegate to eslint-plugin-react
        enforceForArrowConditionals: false,
      }],

      'no-extra-semi': 'off',
      '@typescript-eslint/no-extra-semi': 'error',

      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'error',

      '@typescript-eslint/no-loss-of-precision': 'off',

      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      }],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
        classes: false,
      }],

      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      'quotes': 'off',
      '@typescript-eslint/quotes': ['error', 'single', {
        avoidEscape: true,
      }],

      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',

      'return-await': 'off',
      '@typescript-eslint/return-await': 'off',

      'semi': 'off',
      '@typescript-eslint/semi': ['error', 'never'],

      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  }],
}
