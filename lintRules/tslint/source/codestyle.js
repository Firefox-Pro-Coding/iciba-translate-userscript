// https://github.com/ajafff/tslint-consistent-codestyle
module.exports = {
  // Declare parameters as const with JsDoc /** @const */
  // 'const-parameters':

  // Recommends to use an early exit instead of a long if block.
  // 'early-exit':

  // Enforces where to consistently use curly braces where not strictly necessary.
  // 'ext-curly':

  // Fine grained configuration to enfoce
  // consistent naming for almost everything.
  // E.g. variables, functions, classes, methods, parameters, enums, etc.
  // 'naming-convention':

  // Prefer <Type>foo over foo as Type.
  // 'no-as-type-assertion':

  // Don't use get foo() { return this.foo; }. This is most likely a typo.
  'no-accessor-recursion': true,

  // Identifies nested if statements that can be combined into one.
  // 'no-collapsible-if': true,

  // Like no-else-return from eslint.
  // handle by eslint
  // 'no-else-after-return': true

  // Just return; instead of return undefined;.
  'no-return-undefined': true,

  // Ban the use of this in static methods.
  'no-static-this': true,

  // Like no-else-after-return but better.
  'no-unnecessary-else': true,

  // Finds type annotations that can safely be removed.
  'no-unnecessary-type-annotation': true,

  // Find dead code and unused declarations.
  // 'no-unused': { severity: 'warning' },

  // Checks if the returned variable is declared right before the return statement.
  // 'no-var-before-return': true,

  // Shorthand properties should precede regular properties.
  // 'object-shorthand-properties-first': true,

  // Configure how and where to declare parameter properties.
  // 'parameter-properties':

  // Prefer const enum where possible.
  'prefer-const-enum': true,

  // Prefer a while loop instead of a for loop without initializer and incrementer.
  // 'prefer-while': true,

}
