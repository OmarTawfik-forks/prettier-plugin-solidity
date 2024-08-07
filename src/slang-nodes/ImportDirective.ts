import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportClause } from './ImportClause.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ImportDirective implements SlangNode {
  readonly kind = NonterminalKind.ImportDirective;

  comments;

  loc;

  clause: ImportClause;

  constructor(
    ast: ast.ImportDirective,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.clause = new ImportClause(ast.clause, offsets[0], options);

    metadata = updateMetadata(metadata, [this.clause]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportDirective>, print: PrintFunction): Doc {
    return ['import ', path.call(print, 'clause'), ';'];
  }
}
