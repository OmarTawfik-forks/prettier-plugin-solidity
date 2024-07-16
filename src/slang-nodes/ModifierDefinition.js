import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { Loc } from '../slang-utils/loc.js';

export class ModifierDefinition extends SlangNode {
  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    if (typeof this.parameters === 'undefined') {
      const parametersLoc = {
        startWithTrivia: this.attributes.loc.startWithTrivia,
        endWithTrivia: this.attributes.loc.startWithTrivia
      };
      this.parameters = new ParametersDeclaration({
        kind: 'ParametersDeclaration',
        loc: new Loc(parametersLoc),
        openParen: '(',
        parameters: new Parameters({
          kind: 'Parameters',
          loc: new Loc(parametersLoc),
          items: [],
          separators: []
        }),
        closeParen: ')'
      });
    }
  }

  print(path, print) {
    return printFunction(
      `${this.modifierKeyword} ${this.name}`,
      this,
      path,
      print
    );
  }
}
