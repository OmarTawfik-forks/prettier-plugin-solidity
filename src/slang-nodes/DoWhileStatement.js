import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class DoWhileStatement extends SlangNode {
  doKeyword;

  body;

  whileKeyword;

  openParen;

  condition;

  closeParen;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      this.doKeyword,
      this.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body'), ' ']
        : group([indent([line, path.call(print, 'body')]), line]),
      `${this.whileKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      `${this.closeParen}${this.semicolon}`
    ];
  }
}
