import globals from "globals";
import js from "@eslint/js";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.es2021,
    },
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'array-callback-return': 'error',
      'dot-notation': 'error',
      "eqeqeq": ['error', 'always'],
      'func-style': ['error', 'expression'],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-duplicate-imports': 'error',
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-negated-condition': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      "no-self-compare": "error",
      'no-template-curly-in-string': 'error',
      'no-undef': 0,
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': [
        'error',
        {
          object: true,
        },
      ],
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      "turbo/no-undeclared-env-vars": "error",

      // @typescript-eslint
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { 
          prefer: 'type-imports', 
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true 
        }
      ],
      "@typescript-eslint/no-import-type-side-effects": "error"
    },
  },
];
