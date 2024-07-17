import { SlangNode } from './SlangNode.js';
import { VersionExpressionSets } from './VersionExpressionSets.js';

export class VersionPragma extends SlangNode {
  solidityKeyword;

  sets;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      solidityKeyword: ast.solidityKeyword.text,
      sets: new VersionExpressionSets(
        ast.sets,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
