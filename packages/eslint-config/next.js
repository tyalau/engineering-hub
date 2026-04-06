import { globalIgnores, defineConfig } from "eslint/config";
import nextVitals from 'eslint-config-next/core-web-vitals'
import baseConfig from "./base.js";

export default defineConfig([
  ...nextVitals,
  ...baseConfig,

  {
    rules: {
      // react
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': 'error',
      'react/state-in-constructor': 'error',

      // react-hooks
      'react-hooks/exhaustive-deps': 0,
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);
