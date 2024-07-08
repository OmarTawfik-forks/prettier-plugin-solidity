import * as nodes from './slang-nodes/index.js';
import {
  prettierVersionSatisfies
} from './common/util.js';
import { hasNodeIgnoreComment } from './common/slang-helpers.js';
import ignoreComments from './comments/ignore.js';

let checked = false;

function prettierVersionCheck() {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

function genericPrint(path, options, print) {
  prettierVersionCheck();

  const node = path.getValue();
  const nodeType = node.kind;
  if (node === null) {
    return '';
  }

  if (!(nodeType in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(nodeType)}`);
  }

  // For some reason, prettier is duplicating comments when attaching them.
  // This just removes the duplicated comments
  // TODO: research why is this happening and report it to the prettier team
  // and remove this once it's fixed.
  if (node.comments) {
    let i;
    for (i = 0; i < node.comments.length; i += 1) {
      node.comments[i].printed = true;
    }

    node.comments = node.comments.filter(
      (comment, index) =>
        index ===
        node.comments.findIndex(
          (commentCheck) =>
            commentCheck.loc.start === comment.loc.start &&
            commentCheck.loc.end === comment.loc.end
        )
    );

    for (i = 0; i < node.comments.length; i += 1) {
      node.comments[i].printed = false;
    }
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node)
    );
  }

  return nodes[nodeType].print({ node, options, path, print });
}

export default genericPrint;
