import { SlangNode } from './SlangNode.js';
import { YulPaths } from './YulPaths.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

export class YulVariableAssignmentStatement extends SlangNode {
  names;

  assignment;

  expression;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      names: new YulPaths(
        ast.names,
        childrenOffsets.shift(),
        comments,
        options
      ),
      assignment: new YulAssignmentOperator(
        ast.assignment,
        childrenOffsets.shift(),
        comments,
        options
      ),
      expression: new YulExpression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'names'),
      ' ',
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
