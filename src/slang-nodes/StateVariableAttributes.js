export const StateVariableAttributes = {
  parse: ({ ast, options, parse }) => ({
    items: ast.items.map((item) => parse(item, options, parse))
  }),
  print: ({ node, path, print }) =>
    node.items.length ? path.map(print, 'items').map((item) => [' ', item]) : ''
};
