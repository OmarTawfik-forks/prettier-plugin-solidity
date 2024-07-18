import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { postProcessFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  get kind() {
    return NonterminalKind.UnnamedFunctionAttributes;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new UnnamedFunctionAttribute(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch, postProcessFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
