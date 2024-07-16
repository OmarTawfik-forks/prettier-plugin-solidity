import { SlangNode } from './SlangNode.js';

export class ImportClause extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
