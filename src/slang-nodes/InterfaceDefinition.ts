import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { InheritanceSpecifier } from './InheritanceSpecifier.js';
import { InterfaceMembers } from './InterfaceMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

const { group, line } = doc.builders;

export class InterfaceDefinition implements SlangNode {
  readonly kind = NonterminalKind.InterfaceDefinition;

  comments;

  loc;

  name: Identifier;

  inheritance?: InheritanceSpecifier;

  members: InterfaceMembers;

  constructor(
    ast: ast.InterfaceDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    let i = 1;
    if (ast.inheritance) {
      this.inheritance = new InheritanceSpecifier(
        ast.inheritance,
        offsets[i],
        options
      );
      i += 1;
    }
    this.members = new InterfaceMembers(ast.members, offsets[i], options);

    metadata = updateMetadata(metadata, [this.inheritance, this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<InterfaceDefinition>, print: PrintFunction): Doc {
    return [
      group([
        'interface ',
        path.call(print, 'name'),
        this.inheritance ? [' ', path.call(print, 'inheritance')] : line,
        '{'
      ]),
      path.call(print, 'members'),
      '}'
    ];
  }
}
