import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { Parameters } from './Parameters.js';
import { ModifierAttributes } from './ModifierAttributes.js';
import { FunctionBody } from './FunctionBody.js';

export class ModifierDefinition extends SlangNode {
  modifierKeyword;

  name;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { modifierKeyword, name, parameters, attributes, body } = ast;
      this.modifierKeyword = modifierKeyword.text;
      this.name = name.text;
      if (parameters) {
        this.parameters = new ParametersDeclaration(
          parameters,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.attributes = new ModifierAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.body = new FunctionBody(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);

    if (typeof this.parameters === 'undefined') {
      const parametersOffset = this.attributes.loc.startWithTrivia;
      const parametersLoc = {
        startWithTrivia: parametersOffset,
        start: parametersOffset,
        endWithTrivia: parametersOffset,
        end: parametersOffset
      };
      this.parameters = new ParametersDeclaration({
        kind: 'ParametersDeclaration',
        loc: { ...parametersLoc },
        openParen: '(',
        parameters: new Parameters({
          kind: 'Parameters',
          loc: { ...parametersLoc },
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
