import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class NamedArgument implements SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  comments;

  loc;

  name: Identifier;

  value: Expression;

  constructor(
    ast: ast.NamedArgument,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    this.value = new Expression(ast.value, offsets[1], options);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgument>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), ': ', path.call(print, 'value')];
  }
}
