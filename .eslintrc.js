"use strict";

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:eslint-plugin/tests",
    "plugin:eslint-plugin/rules-recommended",
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
  rules: {
    "eslint-plugin/meta-property-ordering": "error",
    "eslint-plugin/report-message-format": ["error", "^[A-Z].*\\.$"],
    "eslint-plugin/require-meta-docs-description": [
      "error",
      {
        pattern: '^(Enforce|Require|Disallow)',
      },
    ],
  },
};
