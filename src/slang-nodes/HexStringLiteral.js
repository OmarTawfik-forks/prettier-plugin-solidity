import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class HexStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);

    this.variant = `hex${printString(this.variant.slice(4, -1), options)}`;
  }

  print() {
    return this.variant;
  }
}
