// Possible Errors
const possibleErrors = {
  // disallow use of constant expressions in conditions (recommended)
  // ESLint: no-constant-condition
  // 'no-constant-condition':

  // disallow control characters in regular expressions (recommended)
  // ESLint: no-control-regex
  // 'no-control-regex':

  // disallow a duplicate case label. (recommended)
  // ESLint: no-duplicate-case
  // 'no-duplicate-case':

  // disallow the use of empty character classes in regular expressions (recommended)
  // ESLint: no-empty-character-class
  // 'no-empty-character-class':

  // disallow assigning to the exception in a catch block (recommended)
  // ESLint: no-ex-assign
  // 'no-ex-assign':

  // disallow double-negation boolean casts in a boolean context (recommended)
  // ESLint: no-extra-boolean-cast
  // 'no-extra-boolean-cast':

  // disallow unnecessary semicolons (recommended)
  // ESLint: no-extra-semi
  // 'no-extra-semi':

  // disallow function or variable declarations in nested blocks (recommended)
  // ESLint: no-inner-declarations
  // 'no-inner-declarations':

  // disallow invalid regular expression strings in the RegExp constructor (recommended)
  // ESLint: no-invalid-regexp
  // 'no-invalid-regexp':

  // disallow irregular whitespace (recommended)
  // ESLint: no-irregular-whitespace
  // 'ter-no-irregular-whitespace':

  // disallow multiple spaces in a regular expression literal (recommended)
  // ESLint: no-regex-spaces
  // 'no-regex-spaces':

  // disallow sparse arrays (recommended)
  // ESLint: no-sparse-arrays
  // 'ter-no-sparse-arrays':

  // Avoid code that looks like two expressions but is actually one
  // ESLint: no-unexpected-multiline
  // 'no-unexpected-multiline':

  // enforce valid JSDoc comments
  // ESLint: valid-jsdoc
  // 'valid-jsdoc':

  // Ensure that the results of typeof are compared against a valid string (recommended)
  // ESLint: valid-typeof
  // 'valid-typeof':
}

// Best Practices
const bestPracices = {
  // disallow use of multiple spaces
  // ESLint: no-multi-spaces
  // 'no-multi-spaces':

  // disallow the use of __proto__ property
  // ESLint: no-proto
  // 'ter-no-proto':

  // disallow use of javascript: urls.
  // ESLint: no-script-url
  // 'ter-no-script-url':

  // disallow comparisons where both sides are exactly the same
  // ESLint: no-self-compare
  // 'ter-no-self-compare':
}

// Node.js and CommonJS
const node = {
  // enforce error handling in callbacks
  // ESLint: handle-callback-err
  // 'handle-callback-err':
}

// Stylistic Issues
const style = {
  // enforce consistent spacing inside array brackets
  // ESLint: array-bracket-spacing
  // 'array-bracket-spacing':

  // disallow or enforce spaces inside of single line blocks
  // ESLint: block-spacing
  // 'block-spacing':

  // enforce one true brace style
  // ESLint: brace-style
  // 'brace-style':

  // require or disallow padding inside computed properties
  // ESLint: computed-property-spacing
  // 'ter-computed-property-spacing':

  // require or disallow spacing between function identifiers and their invocations
  // ESLint: func-call-spacing
  // 'ter-func-call-spacing':

  // enforce consistent indentation
  // ESLint: indent
  'ter-indent': [true, 2, { 'SwitchCase': 1 } ],

  // enforce a maximum line length
  // ESLint: max-len
  // 'ter-max-len':

  // require or disallow an empty newline after variable declarations
  // ESLint: newline-after-var
  // 'ter-newline-after-var':

  // disallow mixed spaces and tabs for indentation (recommended)
  // ESLint: no-mixed-spaces-and-tabs
  // 'ter-no-mixed-spaces-and-tabs':

  // require or disallow padding inside curly braces
  // ESLint: object-curly-spacing
  // 'object-curly-spacing':

  // enforce padding within blocks
  // ESLint: padded-blocks
  // 'ter-padded-blocks':

  // enforce sorting import declarations within module
  // ESLint: sort-imports
  // 'sort-imports':

  // require or disallow spaces inside parentheses
  // ESLint: space-in-parens
  // 'space-in-parens':

  // disallow all tabs
  // ESLint: no-tabs
  // 'ter-no-tabs':
}

// ECMAScript 6
const es6 = {
  // require braces in arrow function body
  // ESLint: arrow-body-style
  // 'ter-arrow-body-style':

  // require parens in arrow function arguments
  // ESLint: arrow-parens
  // 'ter-arrow-parens':

  // require space before/after arrow function's arrow
  // ESLint: arrow-spacing
  // 'ter-arrow-spacing':

  // require arrow functions as callbacks
  // ESLint: prefer-arrow-callback
  // 'ter-prefer-arrow-callback':
}

module.exports = Object.assign({}, possibleErrors, bestPracices, node, style, es6)
