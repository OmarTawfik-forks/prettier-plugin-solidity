import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class ComparisonExpression implements SlangNode {
  readonly kind = NonterminalKind.ComparisonExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.ComparisonExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new Expression(ast.leftOperand, offsets[0], options);
    this.operator = ast.operator.text;
    this.rightOperand = new Expression(ast.rightOperand, offsets[1], options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ComparisonExpression>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return printComparisonOperation(this, path, print, options);
  }
}
