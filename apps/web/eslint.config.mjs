import nextConfig from '@tyalau/eslint-config/next'
import { defineConfig } from 'eslint/config'

const eslintConfig = defineConfig([...nextConfig])

export default eslintConfig
