import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStackAssignmentOperator } from './YulStackAssignmentOperator.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';

const { line } = doc.builders;

export class YulStackAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  comments;

  loc;

  assignment: YulStackAssignmentOperator;

  variable: string;

  constructor(ast: ast.YulStackAssignmentStatement, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.assignment = new YulStackAssignmentOperator(
      ast.assignment,
      offsets[0]
    );
    this.variable = ast.variable.text;

    metadata = updateMetadata(metadata, [this.assignment]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulStackAssignmentStatement>, print: PrintFunction): Doc {
    return [
      path.call(print, 'assignment'),
      printSeparatedItem(this.variable, {
        firstSeparator: line,
        lastSeparator: ''
      })
    ];
  }
}
