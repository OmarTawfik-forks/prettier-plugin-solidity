import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { AssemblyFlags } from './AssemblyFlags.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class AssemblyFlagsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.AssemblyFlagsDeclaration;

  comments;

  loc;

  openParen: string;

  flags: AssemblyFlags;

  closeParen: string;

  constructor(
    ast: ast.AssemblyFlagsDeclaration,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.flags = new AssemblyFlags(ast.flags, offsets[0], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.flags]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
