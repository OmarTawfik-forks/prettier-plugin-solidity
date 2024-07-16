import { SlangNode } from './SlangNode.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [path.call(print, 'operand'), this.operator];
  }
}
