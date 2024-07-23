import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';

export class EventDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.EventDefinition;
  }

  eventKeyword;

  name;

  parameters;

  anonymousKeyword;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      eventKeyword: ast.eventKeyword.text,
      name: ast.name.text,
      parameters: new EventParametersDeclaration(
        ast.parameters,
        offsets[0],
        options
      ),
      anonymousKeyword: ast.anonymousKeyword?.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.eventKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ` ${this.anonymousKeyword}` : '',
      this.semicolon
    ];
  }
}
