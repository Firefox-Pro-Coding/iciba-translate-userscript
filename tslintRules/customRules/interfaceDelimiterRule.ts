// tslint:disable
import * as ts from 'typescript'
import * as Lint from 'tslint'

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    // We convert the `ruleArguments` into a useful
    // format before passing it to the constructor of AbstractWalker.
    return this.applyWithWalker(
      new InterfaceDelimiterwWalker(
        sourceFile,
        this.ruleName, new Set(this.ruleArguments.map(String)),
      ),
    )
  }
}

// The type parameter of AbstractWalker corresponds to the third constructor parameter.
class InterfaceDelimiterwWalker extends Lint.AbstractWalker<Set<string>> {
  public static NO_SEMI = 'unexpected semicolon'
  public static NO_COLON = 'unexpected colon'

  public walk(sourceFile: ts.SourceFile) {
    const walkProperty = (node: ts.Node): void => {
      if (node.kind === ts.SyntaxKind.PropertySignature) {
        if (node.getText().match(/.*;$/)) {
          this.addFailure(
            node.end - 1,
            node.end,
            InterfaceDelimiterwWalker.NO_SEMI,
            Lint.Replacement.deleteText(node.end - 1, 1),
          )
        }
        if (node.getText().match(/.*,$/)) {
          this.addFailure(
            node.end - 1,
            node.end,
            InterfaceDelimiterwWalker.NO_COLON,
            Lint.Replacement.deleteText(node.end - 1, 1),
          )
        }
      }
    }

    const walkInterface = (node: ts.Node): void => {
      // Finds specific node types and do checking.
      if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        ts.forEachChild(node, walkProperty)
      }
    }

    // Start recursion for all children of `sourceFile`.
    return ts.forEachChild(sourceFile, walkInterface)
  }
}
