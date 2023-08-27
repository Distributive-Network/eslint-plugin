import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Make `RulesTester` detect `vitest`'s `describe` & `test` functions.
    globals: true,
  },
});
