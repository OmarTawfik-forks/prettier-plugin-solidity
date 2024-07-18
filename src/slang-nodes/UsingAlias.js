import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { UsingOperator } from './UsingOperator.js';

export class UsingAlias extends SlangNode {
  get kind() {
    return NonterminalKind.UsingAlias;
  }

  asKeyword;

  operator;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      asKeyword: ast.asKeyword.text,
      operator: new UsingOperator(
        ast.operator,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
