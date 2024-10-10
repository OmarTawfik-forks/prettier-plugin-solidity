import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulBlock } from './YulBlock.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulIfStatement implements SlangNode {
  readonly kind = NonterminalKind.YulIfStatement;

  comments;

  loc;

  condition: YulExpression;

  body: YulBlock;

  constructor(
    ast: ast.YulIfStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.condition = new YulExpression(ast.condition, offsets[0], options);
    this.body = new YulBlock(ast.body, offsets[1], options);

    metadata = updateMetadata(metadata, [this.condition, this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulIfStatement>, print: PrintFunction): Doc {
    return [
      'if ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
