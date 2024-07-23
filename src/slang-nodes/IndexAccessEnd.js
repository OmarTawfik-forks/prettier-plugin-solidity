import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class IndexAccessEnd extends SlangNode {
  get kind() {
    return NonterminalKind.IndexAccessEnd;
  }

  colon;

  end;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      colon: ast.colon.text,
      end: ast.end ? new Expression(ast.end, offsets[0], options) : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.colon, this.end ? path.call(print, 'end') : ''];
  }
}
