import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulSwitchCase } from './YulSwitchCase.js';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  get kind() {
    return NonterminalKind.YulSwitchCases;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      items: ast.items.map(
        (item, index) => new YulSwitchCase(item, offsets[index], options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
