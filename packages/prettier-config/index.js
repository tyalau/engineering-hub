import importPluginSortImports from "@trivago/prettier-plugin-sort-imports";

export default {
  "printWidth": 130,
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true,
  "plugins": [importPluginSortImports],
  "importOrder": [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^@/constants/",
    "^@/types/",
    "^@/utils/",
    "^@/lib/",
    "^@/hooks/",
    "^@/services/",
    "^@/components/",
    "^@/containers/",
    "^@/assets/",
    "^@/(?!assets/).*",
    "^[../]",
    "^[./]"
  ],
  "importOrderCaseInsensitive": true
}
