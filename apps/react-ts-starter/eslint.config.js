import baseConfig from '@tyalau/eslint-config/react'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
  },
])
