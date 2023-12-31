# @distributive/eslint-plugin

[![npm version of the package][npm-version-img]][npm-version-url]
[![CI status][ci-status-img]][ci-status-url]
[![standard-readme compliant][standard-readme-img]][standard-readme-url]

An ESLint rule to enforce brace styles according to the Distributive style
guide.

## Table of Contents

<!--toc:start-->
- [Install](#install)
- [Usage](#usage)
- [Rules](#rules)
- [Contributing](#contributing)
- [License](#license)
<!--toc:end-->

## Install

```console
npm add --save-dev eslint @distributive/eslint-plugin
```

## Usage

You can extend from the plugin's recommended configuration:

```javascript
module.exports = {
  extends: [
    'plugin:@distributive/recommended',
  ],
};
```

Or, add `@distributive` to the plugins section of your `.eslintrc`
configuration file and configure the rules you want to use under the rules
section:

```javascript
module.exports = {
  plugins: [
    '@distributive',
  ],
  rules: {
    '@distributive/brace-style': 'error',
  },
};
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                     | Description                                                          | 💼 | 🔧 |
| :--------------------------------------- | :------------------------------------------------------------------- | :- | :- |
| [brace-style](docs/rules/brace-style.md) | Enforce bracing styles in accordance to the Distributive style guide | ✅  | 🔧 |

<!-- end auto-generated rules list -->

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2023 Distributive Corp.

[npm-version-img]: https://img.shields.io/npm/v/%40distributive/eslint-plugin
[npm-version-url]: https://www.npmjs.com/package/@distributive/eslint-plugin
[ci-status-img]:
	https://github.com/Distributive-Network/eslint-plugin/actions/workflows/main.yml/badge.svg
[ci-status-url]:
	https://github.com/Distributive-Network/eslint-plugin/actions
[standard-readme-img]:
	https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square
[standard-readme-url]: https://github.com/RichardLitt/standard-readme
