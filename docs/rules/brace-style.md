# Enforce bracing styles in accordance to the Distributive style guide (`@distributive/brace-style`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Comes from the [brace
style](https://github.com/Distributive-Network/eslint-config#braces) section in
Distributive's JavaScript Style Guide.

## Rule Details

Examples of **incorrect** code for this rule:

```js
function helloWorld() {
  console.log('hello, world');
}

var foo = function foo()
{
  var a = [1, 2, 3];
};
```

Examples of **correct** code for this rule:

```js
function helloWorld()
{
  console.log('hello, world');
}

try
{
  for (let i=0; i < 10; i++)
  {
    console.log(i);
  }
}
catch(error) {}

var foo = function foo() {
  var a = [1, 2, 3];
};

var bar = () => {
  var b = [4, 5, 6];
};

module.exports.foo2 = function foo2() {
  var a = [1, 2, 3];
};
```

## When Not To Use It

If you don't plan on following this brace style.

## Further Reading

- [Distributive's JavaScript Style Guide](https://github.com/Distributive-Network/eslint-config#readme)
