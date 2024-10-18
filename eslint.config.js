import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [{
  files: [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.cts",
    "**.*.mts"
],
  settings: {
    react: {
      version: "detect",
    },
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
  },
  },


  plugins: {
    react: reactPlugin,
    '@typescript-eslint': typescriptPlugin,
    prettier: prettierPlugin,
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_$",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "no-multi-spaces": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-closing-bracket-location": [1, "tag-aligned"],
    "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    "react/jsx-curly-spacing": ["error", { when: "never" }],
    "react/jsx-boolean-value": ["warn", "never"],
    "react/no-array-index-key": "off",
    "react/jsx-wrap-multilines": ["error"],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img", "object", "area", 'input[type="image"]'],
        img: ["Image"],
        object: ["Object"],
        area: ["Area"],
        'input[type="image"]': ["InputImage"],
      },
    ],
    "jsx-a11y/img-redundant-alt": [
      "warn",
      {
        components: ["Image"],
      },
    ],
    "jsx-a11y/aria-role": [
      "warn",
      {
        allowedInvalidRoles: ["text"],
        ignoreNonDOM: true,
      },
    ],
  },
  ignores: [
    ".node_modules/",
    "**/dist/**/*",
    "yarn.lock",
    "**/public/**/*",
    ".eslintrc.json",
    ".prettierrc.json",
    "tsconfig.json",
    "package.json",
    ".babelrc",
    "LICENSE",
  ],
}];
