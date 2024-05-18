export const WhileStatement = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    whileKeyword: ast.whileKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse),
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse)
  }),
  // TODO: implement print
  print: () => ['WhileStatement']
};
