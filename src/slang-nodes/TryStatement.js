import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class TryStatement extends SlangNode {
  tryKeyword;

  expression;

  returns;

  body;

  catchClauses;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      this.tryKeyword,
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      }),
      this.returns ? [path.call(print, 'returns'), ' '] : '',
      path.call(print, 'body'),
      ' ',
      path.call(print, 'catchClauses')
    ];
  }
}
