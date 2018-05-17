

const __extends = (this && this.__extends) || (function () {
  const extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b }) ||
    function (d, b) { for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
  return function (d, b) {
    extendStatics(d, b)
    function __() { this.constructor = d }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
}())
exports.__esModule = true
// tslint:disable
const ts = require('typescript')
const Lint = require('tslint')

const Rule = /** @class */ (function (_super) {
  __extends(Rule, _super)
  function Rule() {
    return _super !== null && _super.apply(this, arguments) || this
  }
  Rule.prototype.apply = function (sourceFile) {
    // We convert the `ruleArguments` into a useful
    // format before passing it to the constructor of AbstractWalker.
    return this.applyWithWalker(new InterfaceDelimiterwWalker(sourceFile, this.ruleName, new Set(this.ruleArguments.map(String))))
  }
  return Rule
}(Lint.Rules.AbstractRule))
exports.Rule = Rule
// The type parameter of AbstractWalker corresponds to the third constructor parameter.
var InterfaceDelimiterwWalker = /** @class */ (function (_super) {
  __extends(InterfaceDelimiterwWalker, _super)
  function InterfaceDelimiterwWalker() {
    return _super !== null && _super.apply(this, arguments) || this
  }
  InterfaceDelimiterwWalker.prototype.walk = function (sourceFile) {
    const _this = this
    const walkProperty = function (node) {
      if (node.kind === ts.SyntaxKind.PropertySignature) {
        if (node.getText().match(/.*;$/)) {
          _this.addFailure(node.end - 1, node.end, InterfaceDelimiterwWalker.NO_SEMI, Lint.Replacement.deleteText(node.end - 1, 1))
        }
        if (node.getText().match(/.*,$/)) {
          _this.addFailure(node.end - 1, node.end, InterfaceDelimiterwWalker.NO_COLON, Lint.Replacement.deleteText(node.end - 1, 1))
        }
      }
    }
    const walkInterface = function (node) {
      // Finds specific node types and do checking.
      if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        ts.forEachChild(node, walkProperty)
      }
    }
    // Start recursion for all children of `sourceFile`.
    return ts.forEachChild(sourceFile, walkInterface)
  }
  InterfaceDelimiterwWalker.NO_SEMI = 'unexpected semicolon'
  InterfaceDelimiterwWalker.NO_COLON = 'unexpected colon'
  return InterfaceDelimiterwWalker
}(Lint.AbstractWalker))
