# @tyalau/commitlint-config

The central authority for Git commit message standards across the `@tyalau` engineering hub. This package enforces the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure a readable history and enable automated changelog generation.

## ✨ Features

- **Conventional Standard**: Extends `@commitlint/config-conventional`.
- **Pure Config**: Lightweight, ESM-native configuration without the CLI overhead.

## 🚀 Configuration

### 1. Enable the Rules

The package is already installed in the monorepo root. To activate it, create a `commitlint.config.js` file in your root directory:

```javascript
export default {
  extends: ['@tyalau/commitlint-config'],
}
```

### 2. Enforcement (Husky)

To ensure these rules are followed, the `@commitlint/cli` (installed at the root) must be triggered via a Git hook. Update your `.husky/commit-msg` file:

```bash
pnpm exec commitlint --edit "$1"
```

---

## 📜 Commit Convention

Commit messages must follow the pattern: `type(scope): description`.

For full details on the specification, please refer to the [Official Conventional Commits Documentation](https://www.conventionalcommits.org/en/v1.0.0/).

---

## 🏗️ Architecture Note

This package is designed as a **Pure Config** provider:

- **Included**: `@commitlint/config-conventional` as a direct dependency.
- **Excluded**: `@commitlint/cli`. The execution engine remains at the monorepo root to keep this package specialized and lightweight.
