import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';

export class ReceiveFunctionDefinition extends SlangNode {
  receiveKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.cleanModifierInvocationArguments();
    this.finalize(ast);
  }

  cleanModifierInvocationArguments() {
    this.attributes.items.forEach((attribute) => {
      if (attribute.variant.kind === 'ModifierInvocation') {
        attribute.variant.cleanModifierInvocationArguments();
      }
    });
  }

  print(path, print) {
    return printFunction(this.receiveKeyword, this, path, print);
  }
}
