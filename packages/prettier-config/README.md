# @tyalau/prettier-config

The single source of truth for code formatting across the `@tyalau` engineering hub. This package ensures visual consistency and eliminates "style-only" noise in Pull Requests.

## ✨ Features

- **Opinionated Defaults**: Optimized for readability and modern standards.
- **Automatic Import Sorting**: Powered by `@trivago/prettier-plugin-sort-imports`.
- **Zero-Friction Integration**: Designed for seamless use within the `pnpm` workspace.

## 🚀 Configuration

### 1. Link Config

The package is already installed in the monorepo root. To activate it, create a `.prettierrc` file in your root directory:

```json
"@tyalau/prettier-config"
```

### 2. Add Ignore Rules

Create a `.prettierignore` file in the root to prevent formatting build artifacts and system files:

```text
node_modules
dist
.next
.turbo
out
pnpm-lock.yaml
.prettiercache
```

---

## ⌨️ Scripts

Add this to your **root** `package.json` to manage formatting globally. The `--cache` flag ensures only changed files are processed, keeping the workflow fast.

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,mjs,ts,tsx,css,scss,md,json}\""
  }
}
```
