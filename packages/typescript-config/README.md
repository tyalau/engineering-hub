# @tyalau/typescript-config

**The source of truth for TypeScript configurations across the `@tyalau` ecosystem.** This package provides standardized, pre-configured "flavors" for Next.js, Vite, and React libraries, ensuring consistent strictness and high-performance type checking.

## ✨ Features

- **Modern Resolution**: Built on `"moduleResolution": "bundler"` for seamless compatibility with Vite, Turbopack, and modern ESM.
- **Speed First**: Defaulted to `noEmit`—leaving transpilation to high-speed tools like SWC or esbuild while TypeScript focuses purely on safety.
- **Total Strictness**: Includes `strict: true` and several supplementary flags to prevent common runtime errors.

---

## 🚀 Getting Started

### 1. Installation

Ensure the package is added as a development dependency within your workspace:

```bash
pnpm add -D @tyalau/typescript-config --workspace
```

### 2. Implementation

Extend the flavor that matches your project type in your `tsconfig.json`:

#### **Next.js Applications**

Optimized for SWC, App Router, and type-safe metadata.

```json
{
  "extends": "@tyalau/typescript-config/nextjs",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### **React Libraries (Internal UI/Hooks)**

Enables `.d.ts` declaration emitting so consumers get full IntelliSense.

```json
{
  "extends": "@tyalau/typescript-config/react-library",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### **Vite Apps / Base Projects**

A minimalist browser-focused configuration.

```json
{
  "extends": "@tyalau/typescript-config/base",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "vite.config.ts"]
}
```

---

## 🏗️ Inheritance Model

We use a layered architecture to keep configs DRY (_Don't Repeat Yourself_):

| Config               | Purpose                                               | Inherits |
| :------------------- | :---------------------------------------------------- | :------- |
| `base.json`          | Core strictness, `esnext` target, and `noEmit` logic. | —        |
| `nextjs.json`        | Sets `jsx: preserve` and integrates Next.js plugins.  | `base`   |
| `react-library.json` | Enables `declaration: true` and `jsx: react-jsx`.     | `base`   |

---

## ⌨️ Validation

To run type-checking across the entire monorepo, execute the following from the **root**:

```bash
pnpm check-types
```

> [!NOTE] This leverages `turbo` to run `tsc --noEmit` in parallel across all packages, using the cached results where possible.
