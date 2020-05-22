module.exports = {
  plugins: [
    'jsdoc',
  ],

  settings: {
    jsdoc: {
      allowOverrideWithoutParam: true,
      tagNamePreference: {
        arg: 'param',
        argument: 'param',
        constructor: 'class',
        returns: 'return',
        virtual: 'abstract',
      },
    },
  },

  rules: {
    // check-access
    // check-alignment
    // check-examples
    // check-indentation
    'jsdoc/check-param-names': 'off',
    // check-property-names
    // check-syntax
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    // check-values
    // empty-tags
    // implements-on-classes
    // match-description
    'jsdoc/newline-after-description': 'off',
    // no-types
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-description-complete-sentence': 'off',
    // require-description
    'jsdoc/require-example': 'off',
    // require-file-overview
    'jsdoc/require-hyphen-before-param-description': 'error',
    // require-jsdoc
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param': 'off',
    // require-property
    // require-property-description
    // require-property-name
    // require-property-type
    // require-returns-check
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns-type': 'error',
    // require-returns
    'jsdoc/valid-types': 'error',
  },
}
