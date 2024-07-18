import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class VariableDeclarationValue extends SlangNode {
  get kind() {
    return NonterminalKind.VariableDeclarationValue;
  }

  equal;

  expression;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      equal: ast.equal.text,
      expression: new Expression(
        ast.expression,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
