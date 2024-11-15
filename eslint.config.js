import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";
import pluginCypress from "eslint-plugin-cypress/flat";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-config-prettier";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue,js,mjs,cjs}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  pluginJs.configs.all,
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/support/**/*.{js,ts,jsx,tsx}",
    ],
  },
  skipFormatting,
  pluginPrettier,
  {
    rules: {
      // Don't force capitalized comments
      "capitalized-comments": "off",
      // Allow class methods that could be static
      "class-methods-use-this": "off",
      // Only force func names if needed
      "func-names": ["error", "as-needed"],
      // Allow both function declarations and expressions
      "func-style": "off",
      // Allow short id names
      "id-length": "off",
      // Disable max-params
      "max-params": "off",
      // Disable max-statements
      "max-statements": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      // Enforce separate lines for multiline comments
      "multiline-comment-style": ["error", "separate-lines"],
      // Allow use of "continue"
      "no-continue": "off",
      // Allow inline comments,
      "no-inline-comments": "off",
      // Allow magic numbers
      "no-magic-numbers": "off",
      // Allow negated conditions
      "no-negated-condition": "off",
      // Allow using function before defining them
      "no-use-before-define": ["error", { functions: false }],
      // Allow underscore dangle
      "no-underscore-dangle": "off",
      // Allow ternary
      "no-ternary": "off",
      // Allow warning comments
      "no-warning-comments": "off",
      // Force separate var declaration
      "one-var": ["error", "never"],
      // Disable sorting rules
      "sort-imports": "off",
      "sort-keys": "off",
      "sort-vars": "off",
      // Allow catching errors without using them by explicitly naming them
      // "ignore[Something].
      "@typescript-eslint/no-unused-vars": [
        "error",
        { caughtErrorsIgnorePattern: "^ignore" },
      ],
    },
  },
];
