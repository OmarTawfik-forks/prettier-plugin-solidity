import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class OverrideSpecifier implements SlangNode {
  readonly kind = NonterminalKind.OverrideSpecifier;

  comments;

  loc;

  overridden?: OverridePathsDeclaration;

  constructor(ast: ast.OverrideSpecifier, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.overridden) {
      this.overridden = new OverridePathsDeclaration(
        ast.overridden,
        offsets[0]
      );
    }

    metadata = updateMetadata(metadata, [this.overridden]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<OverrideSpecifier>,
    print: (path: AstPath<AstNode | undefined>) => Doc
  ): Doc {
    return ['override', this.overridden ? path.call(print, 'overridden') : ''];
  }
}
