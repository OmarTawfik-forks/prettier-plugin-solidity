import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class NamedArgument extends SlangNode {
  get kind() {
    return NonterminalKind.NamedArgument;
  }

  name;

  colon;

  value;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      name: ast.name.text,
      colon: ast.colon.text,
      value: new Expression(ast.value, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
