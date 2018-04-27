const path = require('path')

const vueRules = {
  'vue/html-indent': ['error', 2, {
    'attribute': 1,
    'closeBracket': 0,
    'alignAttributesVertically': false,
    'ignores': []
  }],
  'vue/script-indent': ['error', 2, {
    'baseIndent': 1,
    'switchCase': 0,
    'ignores': []
  }],
  'vue/attribute-hyphenation': ['error', 'always'],
  'vue/mustache-interpolation-spacing': [2, 'always'],
  'vue/name-property-casing': ['error', 'PascalCase'],
  'vue/no-multi-spaces': 'error',
  'vue/require-default-prop': 'error',
  'vue/require-prop-types': 'error',
  'vue/v-bind-style': ['error', 'shorthand'],
  'vue/v-on-style': ['error', 'shorthand'],
  'vue/html-quotes': ['error', 'double'],
  'vue/no-confusing-v-for-v-if': 'error',
  'vue/this-in-template': ['error', 'never'],
  'vue/html-closing-bracket-newline': ['error', {
    'singleline': 'never',
    'multiline': 'never'
  }],
  'vue/html-closing-bracket-spacing': ['error', {
    'startTag': 'never',
    'endTag':  'never',
    'selfClosingTag': 'always',
  }],
}

const customRules = {
  'import/no-absolute-path': 'off',
  'import/extensions': ['error', 'always', {
    'js': 'never',
    'ts': 'never',
    'vue': 'always',
  }],
  'import/no-extraneous-dependencies': ['error', {
    'optionalDependencies': ['test/unit/index.js']
  }],
  'import/no-unresolved': ['error', { commonjs: true }],
  'import/no-dynamic-require': ['error'],
  'import/export': ['error'],
  'import/no-mutable-exports': ['error'],
  'import/order': ['error', {
    'newlines-between': 'ignore',
  }],
  'import/newline-after-import': ['error'],
  'import/prefer-default-export': ['off'],


  'accessor-pairs': 'error',
  'arrow-parens': 'off',
  'arrow-spacing': ['error', { 'before': true, 'after': true }],
  'block-spacing': ['error', 'always'],
  'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
  'camelcase': ['error', { 'properties': 'never' }],
  'class-methods-use-this' : ['off'],
  'comma-dangle': ['error', 'always-multiline'],
  'comma-spacing': ['error', { 'before': false, 'after': true }],
  'comma-style': ['error', 'last'],
  'constructor-super': 'error',
  'curly': ['error', 'multi-line'],
  'dot-location': ['error', 'property'],
  'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
  'func-call-spacing': ['error', 'never'],
  'function-paren-newline': ['error', 'consistent'],
  'generator-star-spacing': ['error', { 'before': true, 'after': true }],
  'handle-callback-err': ['error', '^(err|error)$'],
  'indent': ['error', 2, { 'SwitchCase': 1 }],
  'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
  'keyword-spacing': ['error', { 'before': true, 'after': true }],
  'max-len': ['error', { code: 100, comments: 160 }],
  'new-cap': ['error', { 'newIsCap': true, 'capIsNew': false }],
  'new-parens': 'error',
  'newline-per-chained-call': 'off',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'off',
  'no-caller': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-console': 'off',
  'no-const-assign': 'error',
  'no-constant-condition': ['error', { 'checkLoops': false }],
  'no-continue': 'off',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-eval': 'error',
  'no-ex-assign': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-boolean-cast': 'error',
  'no-extra-parens': ['error', 'functions'],
  'no-fallthrough': 'error',
  'no-floating-decimal': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-implied-eval': 'error',
  'no-inner-declarations': ['error', 'functions'],
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-iterator': 'error',
  'no-label-var': 'error',
  'no-labels': ['error', { 'allowLoop': false, 'allowSwitch': false }],
  'no-lone-blocks': 'error',
  'no-loop-func': 'off',
  'no-mixed-operators': ['error', {
    'groups': [
      ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
      ['&&', '||'],
      ['in', 'instanceof']
    ],
    'allowSamePrecedence': true
  }],
  'no-mixed-spaces-and-tabs': 'error',
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-negated-in-lhs': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-object': 'error',
  'no-new-require': 'error',
  'no-new-symbol': 'error',
  'no-new-wrappers': 'error',
  'no-obj-calls': 'error',
  'no-octal-escape': 'error',
  'no-octal': 'error',
  'no-param-reassign': ['error', { 'props': false }],
  'no-path-concat': 'error',
  'no-param-reassign': 'off',
  'no-proto': 'error',
  'no-redeclare': 'error',
  'no-regex-spaces': 'error',
  'no-return-assign': ['error', 'except-parens'],
  'no-return-await': 'error',
  'no-restricted-syntax': 'off',
  'no-self-assign': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': ['error', { "allow": [
    "v", "e", "err",
  ]}],
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-tabs': 'error',
  'no-template-curly-in-string': 'error',
  'no-this-before-super': 'error',
  'no-throw-literal': 'error',
  'no-undef-init': 'error',
  'no-undef': 'error',
  'no-underscore-dangle': 'off',
  'no-unexpected-multiline': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': ['error', { 'defaultAssignment': false }],
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unused-expressions': ['error', { 'allowShortCircuit': true, 'allowTernary': true, 'allowTaggedTemplates': true }],
  'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': true }],
  'no-use-before-define': ['error', { 'functions': false, 'classes': false, 'variables': false }],
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-constructor': 'error',
  'no-useless-escape': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-whitespace-before-property': 'error',
  'no-with': 'error',
  'object-curly-newline': ['error', { 'consistent': true }],
  'object-curly-spacing': ['error', 'always'],
  'object-property-newline': ['error', { 'allowMultiplePropertiesPerLine': true }],
  'one-var': ['error', { 'initialized': 'never' }],
  'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
  'prefer-promise-reject-errors': 'error',
  'prefer-destructuring': 'off',
  'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
  'quote-props': ['off'],
  'rest-spread-spacing': ['error', 'never'],
  'semi': ['error', 'never'],
  'semi-spacing': ['error', { 'before': false, 'after': true }],
  'space-before-blocks': ['error', 'always'],
  'space-before-function-paren': ['error', 'never'],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': 'error',
  'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
  'spaced-comment': ['error', 'always', {
    'line': { 'markers': ['*package', '!', '/', ','] },
    'block': { 'balanced': true, 'markers': ['*package', '!', ',', ':', '::', 'flow-include'], 'exceptions': ['*'] }
  }],
  'symbol-description': 'error',
  'template-curly-spacing': ['error', 'never'],
  'template-tag-spacing': ['error', 'never'],
  'unicode-bom': ['error', 'never'],
  'use-isnan': 'error',
  'valid-typeof': ['error', { 'requireStringLiterals': true }],
  'wrap-iife': ['error', 'any', { 'functionPrototypeMethods': true }],
  'yield-star-spacing': ['error', 'both'],
  'yoda': ['error', 'never']
}

module.exports = {
  'parserOptions': {
    "parser": "babel-eslint",
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      // 'jsx': true
    },
    'sourceType': 'module'
  },
  'globals': {
    'document': false,
    'navigator': false,
    'window': false,
    'GM': false,
    'GM_getValue': true,
    'GM_setValue': true,
    'GM_xmlhttpRequest': true,
  },

  'extends': [
    // 'eslint:recommended',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/essential',
  ],

  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },

  'plugins': ['import', 'vue'],

  'overrides': [
    {
      'files': ['*.vue'],
      'rules': Object.assign({}, vueRules, {
        'indent': 'off',
        'max-len': 'off',
      }),
    },
    {
      'files': ['**/*.ts'],
      'parserOptions': {
        'parser': 'typescript-eslint-parser',
      },
      'rules': {
        'indent': 'off',
        'no-dupe-class-members': 'off',
        'no-restricted-globals': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'vue/script-indent': 'off',
      }
    },
  ],

  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.base.conf.js',
      },
      // 'node': {
      //   'extensions': ['.js', '.json']
      // },
    },
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },

  'rules': Object.assign({}, customRules, vueRules),
}
