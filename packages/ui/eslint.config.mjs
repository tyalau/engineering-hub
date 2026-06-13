// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import reactConfig from '@tyalau/eslint-config/react'
import storybook from 'eslint-plugin-storybook'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/'],
  },
  ...reactConfig,
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
])
