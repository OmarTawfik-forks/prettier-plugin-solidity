import { SlangNode } from './SlangNode.js';

export class EventParameter extends SlangNode {
  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
