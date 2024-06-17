export const AddressType = {
  parse: ({ node, ast }) => ({
    ...node,
    addressKeyword: ast.addressKeyword.text,
    payableKeyword: ast.payableKeyword?.text
  }),
  print: ({ node }) => [
    node.addressKeyword,
    node.payableKeyword ? ` ${node.payableKeyword}` : ''
  ]
};
