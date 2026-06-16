# Claude Code Instructions for Engineering Hub

## GitHub Issue Formatting

When creating or updating GitHub issues, use this exact structure:

### Title Convention

- Start with an action verb (e.g., "Fix", "Add", "Update")
- Example: `Fix unhandled token color mixings in dark mode`

### Description Body Template

Must include these three headers:

1. **🎯 Goal** — 1-2 sentence statement of what the issue solves
2. **🛠️ Implementation Steps** — Checkbox list of changes needed. Wrap file paths, commands, and code references in backticks (e.g., `` `~/.agents/AGENTS.md` ``, `` `pnpm build` ``)
3. **✅ Definition of Done** — Clear acceptance criteria in bullet points

### Labeling

Always assign:

- **One `type:` label**: `type:bug`, `type:feature`, `type:refactor`, `type:engineering`, `type:docs`, `type:dx`
- **One `scope:` label**: `scope:ui`, `scope:configs`, `scope:starter`, `scope:workflows`

### Project Fields

- **Project**: "Engineering Hub"
- **Phase**: Select appropriate phase from project's predefined phases (required)
- **Assignee**: `@tyalau` (unless otherwise specified)

## Storybook MCP Usage

When working on UI components, always use Storybook MCP to verify component properties.

### Critical Rule

Never hallucinate component properties! Before using ANY property on a component, you MUST verify it using MCP tools.

### Process

1. Query `list-all-documentation` to get all components
2. Query `get-documentation` for the specific component
3. Only use properties explicitly documented or shown in examples
4. If a property isn't documented, ask the user rather than assuming
5. Use `get-storybook-story-instructions` before creating/updating stories
6. Verify work with `run-story-tests`

## Code Quality

### General

- Follow ESLint rules strictly
- Run `pnpm build` before committing to verify no lint errors
- Ensure `pnpm test` passes for changed modules
- Follow the project's existing code style and conventions

### React Components

- No need to import React (React 17+ JSX transform)
- Use `type` instead of `interface` when defining component props
- Use `React.ComponentProps<'div'>` (not `React.HTMLAttributes<HTMLDivElement>`) for component prop types — covers `ref` natively on React 19

### @tyalau/ui Component Props

Define component props using these predefined values:

**Color** (default: `primary`):

- `primary` | `secondary` | `warning` | `error` | `success` | `info`

**Size / Gap**:

- `xs` | `sm` | `md` | `lg` | `xl`

## Development Workflow

### Environment Setup

- See `package.json` `engines` field for required Node.js and pnpm versions
- Run `pnpm install` to set up the workspace

### Common Commands

| Command            | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `pnpm dev`         | Start all dev servers (web on 3000, docs on 3001) |
| `pnpm build`       | Build all packages and apps                       |
| `pnpm lint`        | Lint all packages with zero warnings allowed      |
| `pnpm test`        | Run tests for changed modules                     |
| `pnpm check-types` | Type check entire monorepo                        |
| `pnpm format`      | Format code with Prettier                         |

### Filtering & Running Specific Packages

Use `--filter` flag to target specific packages:

```bash
turbo dev --filter=web
turbo lint --filter=@tyalau/ui
pnpm build --filter=@tyalau/eslint-config
```

## File Organization & Code Patterns

### Component Structure

Components live in `/src/components/<Name>/` with this file structure:

```
components/Button/
├── Button.tsx          # Component implementation
├── variants.ts         # CVA variant definitions
├── Button.stories.tsx  # Storybook story
└── index.tsx           # Barrel export
```

### Styling & Variants

- **Variant System**: Use `class-variance-authority` (CVA) for all component variants
- **Composition**: Use Radix-ui's `Slot` component for polymorphic `asChild` support
- **Tailwind CSS**: Use utility classes; organize complex styles in `variants.ts`
- **Data Attributes**: Add `data-slot` and `data-variant`/`data-size` for styling/testing

Example:

```typescript
export const buttonVariants = cva(baseStyles, {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { default: '...', sm: '...' },
  },
})
```

### Export Pattern

Always export from `index.tsx` to support barrel imports:

```typescript
// components/Button/index.tsx
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

## Code Quality Standards

- Follow the ESLint config (`@tyalau/eslint-config`) for your project type (base, react, or next)
- Follow the Prettier config (`@tyalau/prettier-config`) — automatically sorts imports
- Follow the TypeScript config (`@tyalau/typescript-config`) — choose the appropriate flavor (nextjs, react-library, or base)
- Pre-commit hooks validate linting and commit messages automatically (Husky)
- Run `pnpm check-types` before committing
- Run `pnpm test` for changed modules

## Naming Conventions

- **Published Packages**: Always use `@tyalau/` namespace
- **Port Assignment**:
  - `web` app: 3000
  - `docs` app: 3001
- **Import Paths**: Prefer workspace imports for local packages

## Commits

Include a clear commit message that explains the "why" behind changes, not just the "what".

## Pull Requests

- Link related GitHub issues
- Provide context for reviewers
- Ensure CI checks pass before requesting review
