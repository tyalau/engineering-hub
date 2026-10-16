import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import baseConfig from './base.js'

export default [
  ...baseConfig,

  // ESLint only lints .js/.mjs/.cjs by default, and typescript-eslint adds .ts/.tsx.
  // Without this, .jsx files are silently skipped.
  { files: ['**/*.jsx'] },

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginJsxA11y.flatConfigs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      // react-refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

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
]
