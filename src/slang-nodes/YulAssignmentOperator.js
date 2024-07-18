import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulColonEqual } from './YulColonEqual.js';

export class YulAssignmentOperator extends SlangNode {
  get kind() {
    return NonterminalKind.YulAssignmentOperator;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new YulColonEqual(ast.variant, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
