/**
 * @fileoverview Enforce bracing styles in accordance to the Distributive style guide
 * @author Joash Mathew
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/brace-style"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run("brace-style", rule, {
  valid: [
    `function helloWorld()\n{\n console.log("Hello, world");\n}`,
    `const foo = function () {\n  return 1;\n}`,
    `const bar = () => {\n  return 1;\n}`,
    `const hi = {\n foo: "bar"\n}`
  ],

  invalid: [
    {
      code: `function helloWorld() {\n  console.log("Hello, world");\n}`,
      errors: [{ message: "Function declarations should use lexical braces" }],
    },
    {
      code: `const foo = function ()\n{\n return 1;\n}`,
      errors: [{ message: "Function expressions should use literal braces" }],
    },
    {
      code: `const bar = () => \n{\n  return 1;\n}`,
      errors: [{ message: "Function expressions should use literal braces" }],
    },
    {
      code: `const hi = \n{\n foo: "bar",\n bar: "foo"\n}`,
      errors: [{ message: "Object literals should use literal braces" }],
    }
  ],
});
