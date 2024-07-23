import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TupleValues } from './TupleValues.js';

export class TupleExpression extends SlangNode {
  get kind() {
    return NonterminalKind.TupleExpression;
  }

  openParen;

  items;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      items: new TupleValues(ast.items, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'items'), this.closeParen];
  }
}
