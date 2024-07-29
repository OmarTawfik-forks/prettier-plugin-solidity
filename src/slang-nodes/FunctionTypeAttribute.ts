import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class FunctionTypeAttribute implements SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  comments;

  loc;

  variant: string;

  constructor(ast: ast.FunctionTypeAttribute, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.variant = ast.variant.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.variant;
  }
}
