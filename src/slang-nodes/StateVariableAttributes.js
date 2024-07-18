import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

export class StateVariableAttributes extends SlangNode {
  get kind() {
    return NonterminalKind.StateVariableAttributes;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new StateVariableAttribute(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
