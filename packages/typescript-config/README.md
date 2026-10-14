# @tyalau/typescript-config

Shareable `tsconfig.json` presets for bundler-based TypeScript projects: Next.js apps, React libraries, and plain TypeScript.

## ✨ Features

- **Bundler resolution**: `"moduleResolution": "bundler"` with `"module": "esnext"`, for projects built by Vite, Next.js, esbuild or similar tools
- **Type-check only by default**: `noEmit` is on, so your bundler handles transpiling. The `react-library` preset turns emit back on to generate `.d.ts` files.
- **Strict**: `strict: true`, plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` and `noUncheckedSideEffectImports`

## 🚀 Getting Started

### 1. Install

```bash
pnpm add -D @tyalau/typescript-config typescript
```

Requires TypeScript 5.6 or later, the first version with `noUncheckedSideEffectImports`.

### 2. Extend a preset

In your `tsconfig.json`, extend the preset that matches your project.

#### Next.js apps

```json
{
  "extends": "@tyalau/typescript-config/nextjs",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### React libraries

Emits JavaScript with `.d.ts` declarations and declaration maps, so consumers get full type information:

```json
{
  "extends": "@tyalau/typescript-config/react-library",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### Plain TypeScript

`base` only includes the `esnext` library, with no DOM types. Browser projects should add the DOM libraries:

```json
{
  "extends": "@tyalau/typescript-config/base",
  "compilerOptions": {
    "lib": ["esnext", "dom", "dom.iterable"]
  },
  "include": ["src"]
}
```

### 3. Add a script

```json
{
  "scripts": {
    "check-types": "tsc --noEmit"
  }
}
```

## 🏗️ Presets

| Entry point                               | Adds on top of `base`                                                      |
| :---------------------------------------- | :------------------------------------------------------------------------- |
| `@tyalau/typescript-config/base`          | — (`target: esnext`, bundler resolution, strict flags, `noEmit`)           |
| `@tyalau/typescript-config/nextjs`        | `jsx: preserve`, DOM libs, `incremental`, the `next` TypeScript plugin     |
| `@tyalau/typescript-config/react-library` | `jsx: react-jsx`, DOM libs, emits JS with `declaration` + `declarationMap` |

`base` also turns on `allowImportingTsExtensions`, `isolatedModules`, `esModuleInterop`, `resolveJsonModule` and `skipLibCheck`. `react-library` turns `allowImportingTsExtensions` off, because TypeScript only allows it when `noEmit` is on.

## 📄 License

[MIT](https://github.com/tyalau/engineering-hub/blob/main/LICENSE)
