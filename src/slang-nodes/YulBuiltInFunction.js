import { SlangNode } from './SlangNode.js';

export class YulBuiltInFunction extends SlangNode {
  variant;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.variant;
  }
}
