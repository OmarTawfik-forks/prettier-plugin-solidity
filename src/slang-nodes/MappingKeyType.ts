import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class MappingKeyType implements SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  comments;

  loc;

  variant: ElementaryType | IdentifierPath;

  constructor(ast: ast.MappingKeyType, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case 'ElementaryType':
        this.variant = new ElementaryType(
          ast.variant as ast.ElementaryType,
          offsets[0]
        );
        break;
      case 'IdentifierPath':
        this.variant = new IdentifierPath(
          ast.variant as ast.IdentifierPath,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
