import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';

export class FunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, comments, parse, options) {
    super(ast, offset, comments);
    this.initialize(ast, parse);

    // Older versions of Solidity defined a constructor as a function having
    // the same name as the contract.
    const compiler = coerce(options.compiler);
    if (compiler && satisfies(compiler, '>=0.5.0')) {
      this.cleanModifierInvocationArguments();
    }

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
    return printFunction(
      [`${this.functionKeyword} `, path.call(print, 'name')],
      this,
      path,
      print
    );
  }
}
