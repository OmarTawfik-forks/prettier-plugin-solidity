import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { SlangNode } from '../types.js';

const { line } = doc.builders;

export class FunctionTypeAttributes implements SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttributes;

  comments;

  loc;

  items: FunctionTypeAttribute[];

  constructor(ast: ast.FunctionTypeAttributes, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new FunctionTypeAttribute(item, offsets[index])
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
