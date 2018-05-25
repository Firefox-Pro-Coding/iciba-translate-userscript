module.exports = {
  'rules': {
    'valid-jsdoc': [
      'error',
      {
        'prefer': {
          'arg': 'param',
          'argument': 'param',
          'constructor': 'class',
          'returns': 'return',
          'virtual': 'abstract'
        },
        'preferType': {
          'Boolean': 'boolean',
          'Number': 'number',
          'String': 'string',
          'Symbol': 'symbol',
        },
        'requireParamDescription': false,
        'requireReturnDescription': false,
        'requireReturn': false,
        'requireReturnType': false,
      }
    ]
  },
}
