export const VersionRange = {
  parse: ({ ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: VersionRange']
};
