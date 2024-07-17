import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      continueKeyword: ast.continueKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
