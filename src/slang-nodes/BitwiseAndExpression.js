import { binaryOperationPrint } from '../common/slang-helpers.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

const tryToHug = createHugFunction(['+', '-', '*', '/', '**', '<<', '>>']);

export class BitwiseAndExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
    this.finalize(ast);
  }

  print(path, print, options) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
