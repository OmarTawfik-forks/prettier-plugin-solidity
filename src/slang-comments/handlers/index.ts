import handleBlockComments from './handleBlockComments.js';
import handleContractDefinitionComments from './handleContractDefinitionComments.js';
import handleIfStatementComments from './handleIfStatementComments.js';
import handleParametersDeclarationComments from './handleParametersDeclarationComments.js';
import handleWhileStatementComments from './handleWhileStatementComments.js';
import handleYulBlockComments from './handleYulBlockComments.js';

export default [
  handleBlockComments,
  handleContractDefinitionComments,
  handleIfStatementComments,
  handleParametersDeclarationComments,
  handleWhileStatementComments,
  handleYulBlockComments
];
