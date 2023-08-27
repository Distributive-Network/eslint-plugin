/**
 * @fileoverview Enforce bracing styles in accordance to the Distributive style guide
 * @author Joash Mathew
 * 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Enforce bracing styles in accordance to the Distributive style guide",
      recommended: true,
      url: "https://github.com/Distributive-Network/eslint-config#braces", // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      functionDeclaration: 'Function declarations should use lexical braces.',
      functionExpression: 'Function expressions should use literal braces.',
      objectLiteral: 'Object literals should use literal braces.',
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function areTokensOnSameLine(leftToken, rightToken)
    {
      if (leftToken.loc.end.line === rightToken.loc.start.line)
        return true; 
      else
      {
        return false; 
      }
    }

    return {
      FunctionDeclaration(node)
      {
        if (areTokensOnSameLine(node.id, node.body))
          context.report({
            node,
            messageId: 'functionDeclaration',
          });
      },

      VariableDeclaration(node)
      {
        if (node.declarations[0].type === 'VariableDeclarator')
        {
          const declarator = node.declarations[0];
          if (node.declarations[0].init.type !== 'ObjectExpression')
          {
            if (!areTokensOnSameLine(declarator.id, declarator.init.body))
              context.report({
                node,
                messageId: 'functionExpression',
              });
          }
          else
          {
            if (!areTokensOnSameLine(declarator.id, declarator.init))
            {
              context.report({
                node,
                messageId: 'objectLiteral',
              });
            }
          }
        }
      }
    };
  },
};
