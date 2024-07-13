import { SlangNode } from './SlangNode.js';

export class VariableDeclarationValue extends SlangNode {
  equal;

  expression;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.equal = ast.equal.text;
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
