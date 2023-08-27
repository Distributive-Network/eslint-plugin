/**
 * @file    Common utils for AST. Mainly copied bits from
 *          https://github.com/eslint/eslint/blob/main/lib/rules/utils/ast-utils.js
 *
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    Aug. 2023
 */

'use strict';

// A set of node types that can contain a list of statements.
const STATEMENT_LIST_PARENTS = new Set(['Program', 'BlockStatement', 'StaticBlock', 'SwitchCase']);

module.exports = {
  /**
   * Determines whether two adjacent tokens are on the same line.
   * @param {Object} left The left token object.
   * @param {Object} right The right token object.
   * @returns {boolean} Whether or not the tokens are on the same line.
   * @public
   */
  isTokenOnSameLine(left, right) {
    return left.loc.end.line === right.loc.start.line;
  },
  STATEMENT_LIST_PARENTS,
};
