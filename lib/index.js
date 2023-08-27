/**
 * @fileoverview Plugin containing Distributive style guide stuff
 * @author Joash Mathew
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.meta = {
  name: "eslint-plugin-distributive",
  version: "1.0.0",
}

// import all rules in lib/rules
module.exports.rules = require('./rules');

// import processors
module.exports.processors = {
  // add your processors here
};

module.exports.configs = {
  recommended: {
    plugins: ['@distributive'],
    rules: {
      '@distributive/brace-style': 'error',
      'brace-style': 'off',
    },
  },
};
