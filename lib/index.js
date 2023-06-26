/**
 * @fileoverview Plugin containing Distributive style guide stuff
 * @author Joash Mathew
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.meta = {
  name: "eslint-plugin-distributive",
  version: "1.0.0",
}

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// import processors
module.exports.processors = {
  // add your processors here
};

