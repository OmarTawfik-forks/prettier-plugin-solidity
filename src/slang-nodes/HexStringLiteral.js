import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

const postProcess = (options) => (properties) => ({
  variant: `hex${printString(properties.variant.slice(4, -1), options)}`
});

export class HexStringLiteral extends SlangNode {
  get kind() {
    return NonterminalKind.HexStringLiteral;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch, postProcess(options));
  }

  print() {
    return this.variant;
  }
}
