import baseConfig from '@tyalau/prettier-config'
import * as tailwindPlugin from 'prettier-plugin-tailwindcss'

export default {
  ...baseConfig,
  plugins: [...(baseConfig.plugins ?? []), tailwindPlugin],
}
