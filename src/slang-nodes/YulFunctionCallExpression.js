import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

export class YulFunctionCallExpression extends SlangNode {
  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operand, openParen, closeParen } = ast;
      this.operand = new YulExpression(
        operand,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.openParen = openParen.text;
      this.arguments = new YulArguments(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openParen,
      path.call(print, 'arguments'),
      this.closeParen
    ];
  }
}
