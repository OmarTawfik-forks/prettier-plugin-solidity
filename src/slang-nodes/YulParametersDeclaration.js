import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

export class YulParametersDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.YulParametersDeclaration;
  }

  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      parameters: new YulParameters(ast.parameters, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
