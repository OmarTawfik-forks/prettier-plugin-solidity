import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

const { line, softline } = doc.builders;

export class NamedArguments extends SlangNode {
  get kind() {
    return NonterminalKind.NamedArguments;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new NamedArgument(item, childrenOffsets.shift(), options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
