import { SlangNode } from './SlangNode.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.enumKeyword = ast.enumKeyword.text;
    this.name = ast.name.text;
    this.openBrace = ast.openBrace.text;
    this.members = parse(ast.members, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
