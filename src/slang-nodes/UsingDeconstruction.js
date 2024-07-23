import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

export class UsingDeconstruction extends SlangNode {
  get kind() {
    return NonterminalKind.UsingDeconstruction;
  }

  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openBrace: ast.openBrace.text,
      symbols: new UsingDeconstructionSymbols(ast.symbols, offsets[0], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
