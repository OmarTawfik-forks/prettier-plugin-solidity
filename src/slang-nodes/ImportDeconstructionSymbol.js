import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: ast.name.text,
      alias: ast.alias
        ? new ImportAlias(ast.alias, childrenOffsets.shift(), options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
