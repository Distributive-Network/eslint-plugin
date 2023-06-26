# eslint-plugin-distributive

ESLint rule to enforce brace styles according to the Distributive style guide

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-distributive`:

```sh
npm install git@github.com:Distributive-Network/eslint-plugin-distributive.git --save-dev
```

## Usage

Add `distributive` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "distributive"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "distributive/rule-name": 1 // 0 - off, 1 - warn, 2 - error
    }
}
```

## Rules
 - Brace style: Follow the Distributive style guide's guidelines on braces for function declarations, function expressions and object literals.

