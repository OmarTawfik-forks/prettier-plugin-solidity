import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  libraryKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      group([`${this.libraryKeyword} ${this.name}`, line, this.openBrace]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
