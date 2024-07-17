import { SlangNode } from './SlangNode.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, closeParen } = ast;
      this.openParen = openParen.text;
      if (ast.arguments) {
        this.arguments = new NamedArgumentGroup(
          ast.arguments,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
