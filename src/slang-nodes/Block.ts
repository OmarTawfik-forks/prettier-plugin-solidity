import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { Statements } from './Statements.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class Block implements SlangNode {
  readonly kind = NonterminalKind.Block;

  comments;

  loc;

  openBrace: string;

  statements: Statements;

  closeBrace: string;

  constructor(ast: ast.Block, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.statements = new Statements(ast.statements, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
