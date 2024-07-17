import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  name;

  parameters;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { name, parameters } = ast;
      this.name = name?.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [`${this.name ?? ''}`, group(path.call(print, 'parameters')), ' '];
  }
}
