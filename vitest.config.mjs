/**
 * @file    vitest.config.mjs - Configures `vitest` for testing the project.
 *
 *          See {@link https://vitest.dev/config/}.
 *
 * @author  Bryan Hoang <bryan@distributive.network>
 * @date    Aug. 2023
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Make `RulesTester` detect `vitest`'s `describe` & `test` functions.
    globals: true,
  },
});
