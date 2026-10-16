# @tyalau/eslint-config

Shareable [ESLint flat configs](https://eslint.org/docs/latest/use/configure/configuration-files) for TypeScript, React, and Next.js projects.

## 📦 Available Configs

| Entry point                   | Use for                              | Includes                                                                                      |
| :---------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------- |
| `@tyalau/eslint-config/base`  | Plain TypeScript / JavaScript, Node  | `@eslint/js` recommended, `typescript-eslint` recommended, extra style rules, Turborepo rules |
| `@tyalau/eslint-config/react` | React apps and libraries (e.g. Vite) | `base` + React, JSX runtime, Hooks, React Refresh, and `jsx-a11y` recommended                 |
| `@tyalau/eslint-config/next`  | Next.js apps                         | `base` + `eslint-config-next` Core Web Vitals and React rules                                 |

## 🚀 Getting Started

### 1. Install

```bash
pnpm add -D @tyalau/eslint-config eslint@^9 typescript@^5.9.2
```

`eslint` and `typescript` are peer dependencies. All plugins ship with this package.

The `next` preset additionally requires `next` itself to be installed: `eslint-config-next` loads its parser from the Next.js package.

Pin the majors as shown. ESLint 10 and TypeScript 7 are the current default installs, and neither is supported yet: `typescript-eslint` rejects TypeScript 7, and the React plugins fail on ESLint 10. Package managers only warn about the mismatch, so an unpinned install fails later, when you run lint.

| Peer         | Supported        |
| :----------- | :--------------- |
| `eslint`     | `^9.39.1`        |
| `typescript` | `>=5.9.2 <6.1.0` |

The TypeScript upper limit follows [`typescript-eslint`](https://typescript-eslint.io/users/dependency-versions)'s supported range. It will be raised when `typescript-eslint` supports newer versions.

### 2. Configure

Create an `eslint.config.js` (or `.mjs`) at the project root and export the config that matches your project:

```js
// eslint.config.js
import config from '@tyalau/eslint-config/react'

export default config
```

To add your own rules, spread the config into an array:

```js
// eslint.config.js
import config from '@tyalau/eslint-config/next'

export default [
  ...config,
  {
    rules: {
      'no-console': 'off',
    },
  },
]
```

### 3. Add a script

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0"
  }
}
```

## 📏 Notable Rules

On top of the recommended presets, `base` enforces:

- **Type-only imports**: `import { type Foo }` for types (`@typescript-eslint/consistent-type-imports`, inline style)
- **Arrow functions**: `func-style: expression` and `prefer-arrow-callback`
- **Strict equality**: `eqeqeq: always`
- **Flatter control flow**: `no-else-return`, `no-lonely-if`, `no-negated-condition`, `no-unneeded-ternary`
- **Modern syntax**: `prefer-template`, `prefer-destructuring`, `prefer-spread`, `prefer-rest-params`, `object-shorthand`
- **No stray logging**: `no-console` warns, except for `console.warn` and `console.error`
- **Declared env vars**: `turbo/no-undeclared-env-vars` flags environment variables missing from `turbo.json` (only applies in Turborepo projects)

`react` and `next` also require an explicit `type` on `<button>`, self-closing tags for empty elements, and stable `key`s instead of array indexes. They turn off `react-hooks/exhaustive-deps`.

Import order isn't enforced here. [`@tyalau/prettier-config`](https://www.npmjs.com/package/@tyalau/prettier-config) sorts imports when it formats files.

## 📄 License

[MIT](https://github.com/tyalau/engineering-hub/blob/main/LICENSE)
