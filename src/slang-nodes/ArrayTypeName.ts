import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ArrayTypeName implements SlangNode {
  readonly kind = NonterminalKind.ArrayTypeName;

  comments;

  loc;

  operand: TypeName;

  index?: Expression;

  constructor(
    ast: ast.ArrayTypeName,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new TypeName(ast.operand, offsets[0], options);
    if (ast.index) {
      this.index = new Expression(ast.index, offsets[1], options);
    }

    metadata = updateMetadata(metadata, [this.operand, this.index]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ArrayTypeName>, print: PrintFunction): Doc {
    return [path.call(print, 'operand'), '[', path.call(print, 'index'), ']'];
  }
}
