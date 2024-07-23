import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulDefaultCase } from './YulDefaultCase.js';
import { YulValueCase } from './YulValueCase.js';

const variants = { YulDefaultCase, YulValueCase };
export class YulSwitchCase extends SlangNode {
  get kind() {
    return NonterminalKind.YulSwitchCase;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        offsets[0],
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
