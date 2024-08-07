import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { group, indent, line } = doc.builders;

export class TupleDeconstructionStatement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  comments;

  loc;

  varKeyword?: string;

  elements: TupleDeconstructionElements;

  expression: Expression;

  constructor(
    ast: ast.TupleDeconstructionStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.varKeyword = ast.varKeyword?.text;
    this.elements = new TupleDeconstructionElements(
      ast.elements,
      offsets[0],
      options
    );
    this.expression = new Expression(ast.expression, offsets[1], options);

    metadata = updateMetadata(metadata, [this.elements, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<TupleDeconstructionStatement>,
    print: PrintFunction
  ): Doc {
    return [
      this.varKeyword ? 'var ' : '',
      '(',
      path.call(print, 'elements'),
      typeof this.expression.variant !== 'string' &&
      this.expression.variant.kind === NonterminalKind.TupleExpression
        ? [') = ', path.call(print, 'expression')]
        : group([') =', indent([line, path.call(print, 'expression'), ';'])])
    ];
  }
}
