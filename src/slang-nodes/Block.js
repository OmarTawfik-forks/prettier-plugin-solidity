import { SlangNode } from './SlangNode.js';

export class Block extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.statements = parse(ast.statements, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
