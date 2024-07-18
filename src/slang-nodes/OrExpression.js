import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHug = createHugFunction(['&&']);

const postProcess = (properties) => ({
  ...properties,
  leftOperand: tryToHug(properties.leftOperand),
  rightOperand: tryToHug(properties.rightOperand)
});

export class OrExpression extends SlangNode {
  get kind() {
    return NonterminalKind.OrExpression;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch, postProcess);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
