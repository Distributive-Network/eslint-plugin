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
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: [ 'Function declarations should use lexical braces', 'Function expressions should use literal braces', 'Object literals should use literal braces' ]
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
            message: 'Function declarations should use lexical braces'
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
                message: 'Function expressions should use literal braces'
              });
          }
          else
          {
            if (!areTokensOnSameLine(declarator.id, declarator.init))
            {
              context.report({
                node,
                message: 'Object literals should use literal braces'
              });
            }
          }
        }
      }
    };
  },
};
