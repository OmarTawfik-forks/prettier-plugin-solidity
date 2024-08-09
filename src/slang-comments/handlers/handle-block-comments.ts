import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import addHubNodeFirstComment from './add-hub-node-first-comment.js';
import addHubNodeLastComment from './add-hub-node-last-comment.js';

import type { HandlerParams } from './types';

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.Block) {
    return false;
  }

  if (precedingNode?.kind === NonterminalKind.Statements) {
    addHubNodeLastComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === NonterminalKind.Statements) {
    addHubNodeFirstComment(followingNode, comment);
    return true;
  }

  return false;
}
