import { SlangNode } from './SlangNode.js';

export class YulPaths extends SlangNode {
  items;

  separators;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.separators = ast.separators.map((separator) => separator.text);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
