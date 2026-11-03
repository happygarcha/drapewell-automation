import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules/**", "dist/**"] },
  js.configs.recommended,
  { files: ["app/**/*.js", "extensions/**/*.js", "tests/**/*.js", "eslint.config.js"], languageOptions: { ecmaVersion: 2023, sourceType: "module", globals: { ...globals.node } } },
  { files: ["theme/assets/*.js"], languageOptions: { ecmaVersion: 2023, sourceType: "script", globals: { ...globals.browser } } },
];
