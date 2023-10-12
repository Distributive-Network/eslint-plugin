/**
 * @file    Enforce bracing styles in accordance to the Distributive style
 *          guide. Mainly a modified version of
 *          https://github.com/eslint/eslint/blob/main/lib/rules/brace-style.js
 *
 * @author  Ian Christian Myers
 * @author  Joash Mathew <joash@distributive.network>
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    July 2023, Aug. 2023
 *
 * @license Copyright OpenJS Foundation and other contributors, <www.openjsf.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const astUtils = require('./utils/ast-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'Enforce bracing styles in accordance to the Distributive style guide',
      recommended: true,
      url: 'https://github.com/Distributive-Network/eslint-config#braces', // URL to the documentation page for this rule
    },
    fixable: 'whitespace',
    schema: [], // Add a schema if the rule has options,
    messages: {
      nextLineOpen:
        'Opening curly brace does not appear on the same line as controlling statement (literal braces).',
      sameLineOpen: 'Opening curly brace appears on the same line as controlling statement (lexical braces).',
      blockSameLine: 'Statement inside of curly braces should be on next line.',
      singleLineClose:
        'Closing curly brace should be on the same line as opening curly brace or on the line after the previous block (literal braces).',
      sameLineClose: 'Closing curly brace appears on the same line as the subsequent block (lexical braces).',
    },
  },

  /**
   * Returns an object with methods that ESLint calls to “visit” nodes while
   * traversing the abstract syntax tree (AST as defined by ESTree) of
   * JavaScript code. See
   * - https://eslint.org/docs/latest/extend/custom-rules#rule-structure
   * - https://eslint.org/docs/latest/extend/custom-rules#the-context-object
   */
  create(context) {
    // variables should be defined here
    const { sourceCode } = context;

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    /**
     * Fixes a place where a newline unexpectedly appears
     * @param {Token} firstToken The token before the unexpected newline
     * @param {Token} secondToken The token after the unexpected newline
     * @returns {Function} A fixer function to remove the newlines between the tokens
     */
    function removeNewlineBetween(firstToken, secondToken) 
    {
      const textRange = [firstToken.range[1], secondToken.range[0]];
      const textBetween = sourceCode.text.slice(textRange[0], textRange[1]);

      // Don't do a fix if there is a comment between the tokens
      if (textBetween.trim()) 
      {
        return null;
      }
      return (fixer) => fixer.replaceTextRange(textRange, ' ');
    }

    /**
     * Validates a pair of curly brackets based on the user's config
     * @param {Token} openingCurly The opening curly bracket
     * @param {Token} closingCurly The closing curly bracket
     * @param {'lexical' | 'literal'} style The bracing style to use.
     * @returns {void}
     */
    function validateCurlyPair(openingCurly, closingCurly, style) 
    {
      const tokenBeforeOpeningCurly = sourceCode.getTokenBefore(openingCurly);
      const tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurly);
      const tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurly);

      if (
        style === 'literal'
        && !astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly)
      ) 
      {
        context.report({
          node: openingCurly,
          messageId: 'nextLineOpen',
          fix: removeNewlineBetween(tokenBeforeOpeningCurly, openingCurly),
        });
      }

      if (
        style === 'lexical'
        && astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly)
      ) 
      {
        context.report({
          node: openingCurly,
          messageId: 'sameLineOpen',
          fix: (fixer) => fixer.insertTextBefore(openingCurly, '\n'),
        });
      }

      if (
        style === 'lexical'
        && astUtils.isTokenOnSameLine(openingCurly, tokenAfterOpeningCurly)
        && tokenAfterOpeningCurly !== closingCurly
      ) 
      {
        context.report({
          node: openingCurly,
          messageId: 'blockSameLine',
          fix: (fixer) => fixer.insertTextAfter(openingCurly, '\n'),
        });
      }

      if (
        style === 'lexical'
        && tokenBeforeClosingCurly !== openingCurly
        && astUtils.isTokenOnSameLine(tokenBeforeClosingCurly, closingCurly)
      ) 
      {
        context.report({
          node: closingCurly,
          messageId: 'singleLineClose',
          fix: (fixer) => fixer.insertTextBefore(closingCurly, '\n'),
        });
      }
    }

    /**
     * Validates the location of a token that appears before a keyword (e.g. a newline before `else`)
     * @param {Token} curlyToken The closing curly token. This is assumed to precede a keyword token (such as `else` or `finally`).
     * @returns {void}
     */
    function validateCurlyBeforeKeyword(curlyToken) 
    {
      const keywordToken = sourceCode.getTokenAfter(curlyToken);

      if (astUtils.isTokenOnSameLine(curlyToken, keywordToken)) 
      {
        context.report({
          node: curlyToken,
          messageId: 'sameLineClose',
          fix: (fixer) => fixer.insertTextAfter(curlyToken, '\n'),
        });
      }
    }

    return {
      FunctionDeclaration(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node.body),
          sourceCode.getLastToken(node),
          'lexical',
        );
      },
      FunctionExpression(node) {
        const isExportsAssignment
          = (node.parent.left?.object?.object?.name === 'module'
            && node.parent.left?.object.property.name === 'exports')
            || node.parent.left?.object?.name === 'exports';
        const isClassMethod 
          = node.parent.parent.type === 'ClassBody';

        let style = 'literal';
        if (isClassMethod) 
        {
          style = 'lexical';
        }
        else if (isExportsAssignment) 
        {
          style = undefined;
        }

        validateCurlyPair(
          sourceCode.getFirstToken(node.body),
          sourceCode.getLastToken(node),
          style,
        );
      },
      ArrowFunctionExpression(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node.body),
          sourceCode.getLastToken(node),
          'literal',
        );
      },
      ObjectExpression(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node),
          sourceCode.getLastToken(node),
          'literal',
        );
      },
      ClassDeclaration(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node.body),
          sourceCode.getLastToken(node),
          'lexical',
        );
      },
      ClassExpression(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node.body),
          sourceCode.getLastToken(node),
          'literal',
        );
      },

      BlockStatement(node) {
        if (!astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type)) 
        {
          validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
        }
      },
      StaticBlock(node) {
        validateCurlyPair(
          sourceCode.getFirstToken(node, { skip: 1 }), // skip the `static` token
          sourceCode.getLastToken(node),
          'lexical',
        );
      },
      SwitchStatement(node) {
        const closingCurly = sourceCode.getLastToken(node);
        const openingCurly = sourceCode.getTokenBefore(
          node.cases.length ? node.cases[0] : closingCurly,
        );

        validateCurlyPair(openingCurly, closingCurly, 'lexical');
      },
      IfStatement(node) {
        if (node.consequent.type === 'BlockStatement') 
        {
          validateCurlyPair(
            sourceCode.getFirstToken(node.consequent),
            sourceCode.getLastToken(node.consequent),
            'lexical',
          );

          if (node.alternate) 
          {
            // Handle the keyword after the `if` block (before `else`)
            validateCurlyBeforeKeyword(sourceCode.getLastToken(node.consequent));
          }
        }
      },
      TryStatement(node) {
        // Handle the keyword after the `try` block (before `catch` or `finally`)
        validateCurlyBeforeKeyword(sourceCode.getLastToken(node.block));

        if (node.handler && node.finalizer) 
        {
          // Handle the keyword after the `catch` block (before `finally`)
          validateCurlyBeforeKeyword(sourceCode.getLastToken(node.handler.body));
        }
      },
    };
  },
};
