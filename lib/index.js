/**
 * @file    lib/index.js - Entrypoint for the plugin.
 *
 * @author  Joash Mathew <joash@distributive.network>
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    June 2023, Aug. 2023
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

module.exports.meta = {
  name: require('../package.json').name,
  version: require('../package.json').version,
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
