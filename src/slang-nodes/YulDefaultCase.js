import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';

export class YulDefaultCase extends SlangNode {
  get kind() {
    return NonterminalKind.YulDefaultCase;
  }

  defaultKeyword;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      defaultKeyword: ast.defaultKeyword.text,
      body: new YulBlock(ast.body, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
