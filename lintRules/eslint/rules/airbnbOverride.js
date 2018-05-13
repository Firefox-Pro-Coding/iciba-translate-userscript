module.exports = {
  rules: {
    'class-methods-use-this': ['off'], // some time it needed
    'function-paren-newline': ['error', 'consistent'],
    'no-await-in-loop': 'off', // somtime need it
    'no-param-reassign': ['error', { 'props': false }], // allow object prop mutation
    'no-restricted-globals': 'off', // sometime need it
    'no-use-before-define': ['error', { 'classes': false, 'functions': false }],
    'object-curly-newline': ['error', { 'consistent': true }], // airbnb rulu was too strict
    'prefer-destructuring': 'off', // it not a common use case
    'quote-props': ['off'], // airbnb this rule was too inflexible
    'semi': ['error', 'never'], // disalow semi
  },
}
