import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { BinaryOperation, StrictAstNode } from '../slang-nodes/index.d.ts';

export const isBinaryOperation = createKindCheckFunction([
  NonterminalKind.AdditiveExpression,
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.ExponentiationExpression,
  NonterminalKind.AssignmentExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.ComparisonExpression,
  NonterminalKind.EqualityExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.OrExpression,
  NonterminalKind.ShiftExpression
]) as (node: StrictAstNode) => node is BinaryOperation;
