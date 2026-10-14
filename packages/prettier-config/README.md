# @tyalau/prettier-config

Shareable [Prettier](https://prettier.io/) config with automatic import sorting.

## ✨ Options

| Option          | Value                                                                                              |
| :-------------- | :------------------------------------------------------------------------------------------------- |
| `printWidth`    | `130`                                                                                              |
| `semi`          | `false`                                                                                            |
| `singleQuote`   | `true`                                                                                             |
| `trailingComma` | `'es5'`                                                                                            |
| Import sorting  | [`@trivago/prettier-plugin-sort-imports`](https://github.com/trivago/prettier-plugin-sort-imports) |

### Import order

Imports are grouped in this order, sorted case-insensitively within each group:

1. `react`
2. Third-party modules
3. `@/` path aliases, in this order: `constants`, `types`, `utils`, `lib`, `hooks`, `services`, `components`, `containers`, `assets`, then any other `@/` path
4. Parent-directory imports (`../`)
5. Same-directory imports (`./`)

## 🚀 Getting Started

### 1. Install

```bash
pnpm add -D @tyalau/prettier-config prettier
```

`prettier` (`^3.8.2`) is a peer dependency. The import-sorting plugin ships with this package.

### 2. Configure

Reference the config from your `package.json`:

```json
{
  "prettier": "@tyalau/prettier-config"
}
```

To add other plugins or override options, create a `prettier.config.js` instead:

```js
// prettier.config.js
import config from '@tyalau/prettier-config'

export default {
  ...config,
  printWidth: 100,
}
```

When you add plugins, include `...config.plugins` in the new `plugins` array, or import sorting stops working.

### 3. Ignore build output

Create a `.prettierignore` so Prettier skips generated files:

```text
dist
.next
.turbo
out
pnpm-lock.yaml
```

### 4. Add scripts

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## 📄 License

[MIT](https://github.com/tyalau/engineering-hub/blob/main/LICENSE)
