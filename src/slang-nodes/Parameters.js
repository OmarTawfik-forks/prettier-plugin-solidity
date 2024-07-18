import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import { printComments } from '../slang-printers/print-comments.js';
import { SlangNode } from './SlangNode.js';
import { Parameter } from './Parameter.js';

export class Parameters extends SlangNode {
  get kind() {
    return NonterminalKind.Parameters;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    if (offset) {
      const fetch = (childrenOffsets) => ({
        items: ast.items.map(
          (item) => new Parameter(item, childrenOffsets.shift(), options)
        ),
        separators: ast.separators.map((separator) => separator.text)
      });

      this.initialize(ast, offset, fetch);
    } else {
      this.loc = ast.loc;
      this.items = ast.items;
      this.separators = ast.separators;
    }
  }

  print(path, print, options) {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), { grouped: false });
    }

    const parameterComments = printComments(this, path, options);

    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
}
