import { SlangNode } from './SlangNode.js';
import { Parameters } from './Parameters.js';

export class ParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();
    if (offset) {
      const fetch = (childrenOffsets) => {
        const { openParen, parameters, closeParen } = ast;
        this.openParen = openParen.text;
        this.parameters = new Parameters(
          parameters,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
        this.closeParen = closeParen.text;
      };

      this.initialize(ast, offset, comments, fetch, parse);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.openParen = ast.openParen;
      this.parameters = ast.parameters;
      this.closeParen = ast.closeParen;
    }
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
