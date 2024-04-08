/**
 * @file    brace-style.test.js - Tests the custom brace-style rule against
 *          valid & invalid test cases.
 *
 * @author  Joash Mathew <joash@distributive.network>
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    June 2023, Aug. 2023
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/brace-style'),
  RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('brace-style', rule, {
  valid: [
    'function helloWorld()\n{\n console.log("Hello, world");\n}',
    'const foo = function () {\n  return 1;\n}',
    'const bar = () => {\n  return 1;\n}',
    'const hi = {\n foo: "bar"\n}',
    'const path = require("node:path");',
    'statement = function shouldThrowstatement() { eval(arguments[0]) };',
    `
try
{
  for (let i=0; i < 10; i++)
  {
    console.log(i);
  }
}
catch(error) {}
`,
    `
module.exports.foo1 = function foo1() {
  var a = [1, 2, 3];
};
`,
    `
module.exports.foo2 = function foo2()
{
  var a = [1, 2, 3];
};
`,
    `
exports.foo3 = function foo3() {
  var a = [1, 2, 3];
};
`,
    `
exports.foo4 = function foo4()
{
  var a = [1, 2, 3];
};
`,
    `
switch (key)
{
  case value:
  {
    const foo = 'bar';
    break;
  }
  default:
    break;
}
`,
    `
class Foo
{
    bar()
    {

    }
}
`,
    `
const foobar = class Foo {
};
`,
    `
server.listen({ port: 3000 }, () => {

});
`,
    `
if (true)
{

}`,
    `
const invalid = [{
  code: 'foo',
}];
`,
    `
Foo.prototype.bar = function bar()
{
  return 'foobar';
}
`, {
      code: `
DcpMessage.from = function DcpMessage$$from(Ctor, signedMessageBody)
{
  const foo = 'bar';
}
`,
      only: false,
    }, `
const foo = {
  bar: function () {

  },
};
`
  ],

  invalid: [{
    code: 'function helloWorld() {\n  console.log("Hello, world");\n}',
    output: 'function helloWorld() \n{\n  console.log("Hello, world");\n}',
    errors: [{ messageId: 'sameLineOpen' }],
  }, {
    code: 'const foo = function ()\n{\n return 1;\n}',
    output: 'const foo = function () {\n return 1;\n}',
    errors: [{ messageId: 'nextLineOpen' }],
  }, {
    code: 'const bar = () => \n{\n  return 1;\n}',
    output: 'const bar = () => {\n  return 1;\n}',
    errors: [{ messageId: 'nextLineOpen' }],
  }, {
    code: 'const hi = \n{\n foo: "bar",\n bar: "foo"\n}',
    output: 'const hi = {\n foo: "bar",\n bar: "foo"\n}',
    errors: [{ messageId: 'nextLineOpen' }],
  }, {
    code: 'if (true) {\n}',
    output: 'if (true) \n{\n}',
    errors: [{ messageId: 'sameLineOpen' }],
  }, {
    // try...catch
    code: `
try {
  foo();
} catch (error) {
  bar();
}
`,
    output: `
try 
{
  foo();
}
 catch (error) 
{
  bar();
}
`,
    errors: [{ messageId: 'sameLineOpen' }, { messageId: 'sameLineClose' }, { messageId: 'sameLineOpen' }],
  }, {
    // try...finally
    code: `
try {
  foo();
} finally {
  bar();
}
`,
    output: `
try 
{
  foo();
}
 finally 
{
  bar();
}
`,
    errors: [{ messageId: 'sameLineOpen' }, { messageId: 'sameLineClose' }, { messageId: 'sameLineOpen' }],
  }, {
    // try...catch...finally
    code: `
try {
  foo();
} catch (error) {
  bar();
} finally {
  baz();
}
`,
    output: `
try 
{
  foo();
}
 catch (error) 
{
  bar();
}
 finally 
{
  baz();
}
`,
    errors: [{
      messageId: 'sameLineOpen',
    }, {
      messageId: 'sameLineClose',
    }, {
      messageId: 'sameLineOpen',
    }, {
      messageId: 'sameLineClose',
    }, {
      messageId: 'sameLineOpen',
    }],
  }, {
    code: `
class Foo {
    bar() {

    }
}
`,
    output: `
class Foo 
{
    bar() 
{

    }
}
`,
    errors: [{ messageId: 'sameLineOpen' }, { messageId: 'sameLineOpen' }],
  }, {
    code: `
const foo = {
  bar: function ()
  {

  },
};
`,
    output: `
const foo = {
  bar: function () {

  },
};
`,
    errors: [{ messageId: 'nextLineOpen' }],
  }],
});
