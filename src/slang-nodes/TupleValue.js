import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class TupleValue extends SlangNode {
  expression;

  constructor(ast, offset, options) {
    super();

    if (offset) {
      const fetch = (childrenOffsets) => ({
        expression: ast.expression
          ? new Expression(ast.expression, childrenOffsets.shift(), options)
          : undefined
      });

      this.initialize(ast, offset, fetch);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.expression = ast.expression;
    }
  }

  print(path, print) {
    return this.expression ? path.call(print, 'expression') : '';
  }
}
