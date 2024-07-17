import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.js';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new UsingDeconstructionSymbol(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
            options
          )
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print, options) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
