import reactConfig from '@tyalau/eslint-config/react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...reactConfig,
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
