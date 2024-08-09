import { doc } from 'prettier';
import { printComment } from '../slang-comments/printer.js';
import { isPrettier2 } from '../slang-utils/backward-compatibility.js';
import { isLineComment } from '../slang-utils/is-comment.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { DocV2 } from './types';

const { breakParent, join, line } = doc.builders;

export function printComments(path: AstPath<AstNode>): Doc[] {
  const document = join(
    line,
    path
      .map((commentPath) => {
        const comment = commentPath.getNode()!;
        if (comment.trailing || comment.leading || comment.printed) {
          return '';
        }
        comment.printed = true;
        const printed = printComment(commentPath);
        return isLineComment(comment) ? [printed, breakParent] : printed;
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? (document as DocV2).parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
}
