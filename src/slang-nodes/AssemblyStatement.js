import { SlangNode } from './SlangNode.js';

export class AssemblyStatement extends SlangNode {
  assemblyKeyword;

  label;

  flags;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.assemblyKeyword} `,
      this.label ? [path.call(print, 'label'), ' '] : '',
      this.flags ? [path.call(print, 'flags'), ' '] : '',
      path.call(print, 'body')
    ];
  }
}
