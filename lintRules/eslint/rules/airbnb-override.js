module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2019,
    'ecmaFeatures': {
      'jsx': true,
    },
    'sourceType': 'module',
  },
  rules: {
    'class-methods-use-this': ['off'], // some time it needed
    'curly': ['error', 'multi-line'], // some time it needed
    'function-paren-newline': ['error', 'consistent'],
    'lines-between-class-members': 'off', // allow compact space between class members
    'max-len': 'off',
    'no-empty-function': ['error', {
      'allow': [
        'constructors',
        'arrowFunctions',
        'functions',
        'methods',
      ],
    }],
    'no-await-in-loop': 'off', // somtime need it
    'no-loop-func': 'off',
    'no-param-reassign': ['error', { 'props': false }], // allow object prop mutation
    'no-restricted-globals': 'off', // sometime need it
    'no-sequences': 'error',
    'no-use-before-define': ['error', { 'classes': false, 'functions': false }],
    'object-curly-newline': ['error', { 'consistent': true }], // airbnb rulu was too strict
    'prefer-destructuring': 'off', // it not a common use case
    'prefer-object-spread': 'error',
    'quote-props': ['off'], // airbnb this rule was too inflexible
    'semi': ['error', 'never'], // disalow semi
    'strict': 'off',
  },
}
