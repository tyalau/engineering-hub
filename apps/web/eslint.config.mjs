import { defineConfig } from 'eslint/config'
import nextConfig from "@tyalau/eslint-config/next";

const eslintConfig = defineConfig([
  ...nextConfig,
]);

export default eslintConfig;
