import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const printBody = (node, path, print) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const WhileStatement = {
  print: ({ node, path, print }) => [
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printBody(node, path, print)
  ]
};
