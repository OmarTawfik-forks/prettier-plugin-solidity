import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export class MultiplicativeExpression implements SlangNode {
  readonly kind = NonterminalKind.MultiplicativeExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.MultiplicativeExpression,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new Expression(ast.leftOperand, offsets[0], options);
    this.operator = ast.operator.text;
    this.rightOperand = new Expression(ast.rightOperand, offsets[1], options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    switch (this.operator) {
      case '*':
        this.leftOperand = multiplicationTryToHug(this.leftOperand);
        break;
      case '/':
        this.leftOperand = divisionTryToHug(this.leftOperand);
        break;
      case '%':
        this.leftOperand = moduloTryToHug(this.leftOperand);
        break;
      default:
        throw new Error(`Unexpected operator: ${this.operator}`);
    }
  }

  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return printBinaryOperation(this, path, print, options);
  }
}
