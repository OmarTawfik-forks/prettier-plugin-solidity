import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { ModifierAttribute } from './ModifierAttribute.js';

const { line } = doc.builders;

export class ModifierAttributes extends SlangNode {
  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new ModifierAttribute(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
