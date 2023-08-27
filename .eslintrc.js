/**
 * @file    .eslintrc.js - Configures ESLint for the plugin repo.
 *
 * @author  Joash Mathew <joash@distributive.network>
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    June 2023, Aug. 2023
 */
'use strict';

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:eslint-plugin/tests',
    'plugin:eslint-plugin/rules-recommended',
    '@distributive',
    'plugin:@distributive/recommended',
  ],
  env: {
    node: true,
  },
  overrides: [ {
    files: ['**/*.mjs'],
    parserOptions: {
      sourceType: 'module',
    },
  },
  ],
  rules: {
    'eslint-plugin/meta-property-ordering': 'error',
    'eslint-plugin/report-message-format': ['error', '^[A-Z].*\\.$'],
    'eslint-plugin/require-meta-docs-description': [
      'error', {
        pattern: '^(Enforce|Require|Disallow)',
      },
    ],
  },
};
