import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";

import TSCONFIG_APP from "./tsconfig.app.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default tseslint.config(
  {
    files: GLOB_TS,
    extends: [
      // eslintJs.configs.recommended,
      // tseslint.configs.recommended,
    ],
  },
  // base configuration for browser environment source files
  {
    files: TSCONFIG_APP.include,
    extends: [
      // tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // base configuration for node environment source files (*.config.ts, etc.)
  {
    files: TSCONFIG_NODE.include,
    ignores: TSCONFIG_NODE.exclude,
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  // react specific configurations
  {
    files: TSCONFIG_APP.include,
    extends: [
      eslintReact.configs.all,
    ],
  },
);
