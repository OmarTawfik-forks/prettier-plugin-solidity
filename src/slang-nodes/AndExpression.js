import { logicalOperationPrint } from '../common/slang-helpers.js';

export const AndExpression = {
  parse: ({ ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  print: logicalOperationPrint
};
