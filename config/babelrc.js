module.exports = {
  'presets': [
    'minify',
  ],
  'plugins': [
    // es2015
    'check-es2015-constants',
    'transform-es2015-arrow-functions',
    'transform-es2015-block-scoped-functions',
    'transform-es2015-block-scoping',
    'transform-es2015-classes',
    'transform-es2015-computed-properties',
    'transform-es2015-destructuring',
    'transform-es2015-duplicate-keys',
    'transform-es2015-for-of',
    'transform-es2015-function-name',
    'transform-es2015-literals',
    // "transform-es2015-modules-commonjs",
    'transform-es2015-object-super',
    'transform-es2015-parameters',
    'transform-es2015-shorthand-properties',
    'transform-es2015-spread',
    'transform-es2015-sticky-regex',
    'transform-es2015-template-literals',
    'transform-es2015-typeof-symbol',
    'transform-es2015-unicode-regex',

    // do not transfrom generator cause it requrie runtime
    // "transform-regenerator",

    // es2016
    'transform-exponentiation-operator',
    'syntax-trailing-function-commas',

    // es2017
    'transform-async-to-generator',

    // stage-0
    'transform-do-expressions',
    'transform-function-bind',

    // stage-1
    // "transform-class-constructor-call" // (Deprecated)
    'transform-export-extensions',

    // stage-2
    'syntax-dynamic-import',
    'transform-class-properties',
    // "transform-decorators" // handled by tsc

    // stage-3
    'transform-object-rest-spread',
    'transform-async-generator-functions',

    // 'syntax-object-rest-spread',

    'transform-runtime',
  ],
}
