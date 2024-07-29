import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class SourceUnitMembers implements SlangNode {
  readonly kind = NonterminalKind.SourceUnitMembers;

  comments;

  loc;

  items: SourceUnitMember[];

  constructor(
    ast: ast.SourceUnitMembers,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new SourceUnitMember(item, offsets[index], options)
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return printPreservingEmptyLines(path, 'items', print, options);
  }
}
