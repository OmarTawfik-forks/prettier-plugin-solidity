import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class ImportAlias implements SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  comments;

  loc;

  identifier: string;

  constructor(ast: ast.ImportAlias, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.identifier = ast.identifier.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return ` as ${this.identifier}`;
  }
}
