import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { binaryOperationPrintBuilder } from '../common/slang-helpers.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TupleExpression } from './TupleExpression.js';
import { TupleValues } from './TupleValues.js';
import { TupleValue } from './TupleValue.js';

const { group, indent } = doc.builders;

const tryToHug = createHugFunction(['**']);

const exponentiationExpressionPrint = binaryOperationPrintBuilder(
  () => (document) => group(document), // always group
  () => (document) => indent(document) // always indent
);

export class ExponentiationExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    if (offset) {
      this.parseChildrenNodes(ast, parse);

      const compiler = coerce(options.compiler);
      if (compiler) {
        if (satisfies(compiler, '>=0.8.0')) {
          this.rightOperand = tryToHug(this.rightOperand);
        } else {
          // Currently the parser considers exponentiation as having left
          // association from 0.6.0.
          // in reality solidity fixed this from 0.8.0.
          // TODO: remove this once the parser has fixed this.
          // https://github.com/NomicFoundation/slang/issues/1031
          if (this.rightOperand.variant.kind === 'ExponentiationExpression') {
            const leftLoc = {
              startWithTrivia: this.leftOperand.loc.startWithTrivia,
              start: this.leftOperand.loc.start,
              endWithTrivia:
                this.rightOperand.variant.leftOperand.loc.endWithTrivia,
              end: this.rightOperand.variant.leftOperand.loc.end
            };
            this.leftOperand = new Expression({
              kind: 'Expression',
              loc: { ...leftLoc },
              variant: new TupleExpression({
                kind: 'TupleExpression',
                loc: { ...leftLoc },
                openParen: '(',
                items: new TupleValues({
                  kind: 'TupleValues',
                  loc: { ...leftLoc },
                  items: [
                    new TupleValue({
                      kind: 'TupleValue',
                      loc: { ...leftLoc },
                      expression: new Expression({
                        kind: 'Expression',
                        loc: { ...leftLoc },
                        variant: new ExponentiationExpression({
                          kind: 'ExponentiationExpression',
                          loc: { ...leftLoc },
                          leftOperand: this.leftOperand,
                          operator: '**',
                          rightOperand: this.rightOperand.variant.leftOperand
                        })
                      })
                    })
                  ],
                  separators: []
                }),
                closeParen: ')'
              })
            });
            this.rightOperand = this.rightOperand.variant.rightOperand;
          }
          this.leftOperand = tryToHug(this.leftOperand);
        }
      }

      this.initializeLoc(ast);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.leftOperand = ast.leftOperand;
      this.operator = ast.operator;
      this.rightOperand = ast.rightOperand;
    }
  }

  print(path, print, options) {
    return exponentiationExpressionPrint({ node: this, path, print, options });
  }
}
