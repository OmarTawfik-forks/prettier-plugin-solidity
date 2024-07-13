import { SlangNode } from './SlangNode.js';

export class TypedTupleMember extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.storageLocation = ast.storageLocation
      ? parse(ast.storageLocation, parse, this.nextChildOffset)
      : undefined;
    this.name = ast.name.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
