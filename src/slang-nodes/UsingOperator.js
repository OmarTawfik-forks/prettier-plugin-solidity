export const UsingOperator = {
  parse: ({ ast }) => ({
    kind: ast.cst.kind,
    variant: ast.variant.text
  }),
  print: ({ node }) => node.variant
};
