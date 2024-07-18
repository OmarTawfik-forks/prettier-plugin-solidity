import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class MemberAccess extends SlangNode {
  get kind() {
    return NonterminalKind.MemberAccess;
  }

  variant;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.variant;
  }
}
