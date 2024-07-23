import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class VariableDeclarationType extends SlangNode {
  get kind() {
    return NonterminalKind.VariableDeclarationType;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.type
          : new TypeName(ast.variant, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
