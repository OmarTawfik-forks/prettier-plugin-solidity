import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulColonEqual implements SlangNode {
  readonly kind = NonterminalKind.YulColonEqual;

  comments;

  loc;

  colon: string;

  equal: string;

  constructor(ast: ast.YulColonEqual, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.colon = ast.colon.text;
    this.equal = ast.equal.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return ['TODO: YulColonEqual'];
  }
}
