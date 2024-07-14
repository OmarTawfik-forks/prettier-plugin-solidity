import { doc } from 'prettier';
import { sortFunctionAttributes } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class FallbackFunctionAttributes extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.items = this.items.sort(sortFunctionAttributes);
    this.finalize(ast);
  }

  print(path, print) {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
