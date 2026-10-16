# Engineering Hub

A monorepo for my shared front-end tooling: a React component library and shared ESLint, Prettier and TypeScript configs, plus two Next.js apps that consume them. Built with pnpm workspaces and [Turborepo](https://turborepo.dev/).

## Packages

| Package                                                   | Description                                                         |
| :-------------------------------------------------------- | :------------------------------------------------------------------ |
| [`@tyalau/ui`](packages/ui)                               | React component library built on Radix UI and Tailwind CSS v4       |
| [`@tyalau/eslint-config`](packages/eslint-config)         | ESLint flat configs for TypeScript, React and Next.js               |
| [`@tyalau/prettier-config`](packages/prettier-config)     | Prettier config with import sorting                                 |
| [`@tyalau/typescript-config`](packages/typescript-config) | `tsconfig.json` presets for Next.js, React libraries and TypeScript |
| [`@tyalau/commitlint-config`](packages/commitlint-config) | Commitlint config for this repo (private, not published)            |

## Apps

| App                 | Port | Description                            |
| :------------------ | :--- | :------------------------------------- |
| [`web`](apps/web)   | 3000 | Next.js app that consumes `@tyalau/ui` |
| [`docs`](apps/docs) | 3001 | Next.js app that consumes `@tyalau/ui` |

## Getting started

Requires Node.js `>=24.14.1` and pnpm `>=10.6.3` (see `engines` in `package.json`).

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts both apps and rebuilds `@tyalau/ui` as you edit it. To work on components in isolation, run Storybook on port 6006:

```sh
pnpm --filter @tyalau/ui storybook
```

## Commands

Run these from the repo root:

| Command            | Purpose                                                                         |
| :----------------- | :------------------------------------------------------------------------------ |
| `pnpm dev`         | Start the dev servers (web on 3000, docs on 3001)                               |
| `pnpm build`       | Build all packages and apps                                                     |
| `pnpm lint`        | Lint everything, with zero warnings allowed                                     |
| `pnpm check-types` | Type-check the whole monorepo                                                   |
| `pnpm test`        | Run the tests (component stories run in Chromium through Vitest and Playwright) |
| `pnpm format`      | Format all files with Prettier                                                  |

Add `--filter` to target one package or app, for example `pnpm build --filter=@tyalau/ui`.

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/), checked by commitlint in a Git hook. A pre-commit hook formats staged files with Prettier.
- CI runs the Prettier check, lint, type check, build and tests on every pull request.

## Releasing

The published packages (`@tyalau/ui`, `@tyalau/eslint-config`, `@tyalau/prettier-config` and `@tyalau/typescript-config`) are versioned and released to npm with [Changesets](https://github.com/changesets/changesets). The apps and `@tyalau/commitlint-config` are private and never released.

### Adding a changeset

Changesets are added by hand, only when a change should be released. A PR without one releases nothing.

```sh
pnpm changeset
```

Select the packages, choose the bump (`major`, `minor` or `patch`), and write a one-line summary for the changelog. Commit the generated `.changeset/*.md` file together with the PR.

### Publishing to npm

1. Merge PRs to `main`. The [Release workflow](.github/workflows/release.yml) keeps a single `chore: version packages` PR up to date with every pending changeset, including the bumped versions and changelog entries.
2. When you want to release, review and merge that PR.
3. The merge runs the same workflow again, which builds the packages, publishes the new versions to npm and pushes the git tags.

> [!NOTE]
> Temporary, while testing: the repo is in Changesets pre mode, so versions are published as `x.y.z-beta.n` under the `beta` tag. Only `@tyalau/eslint-config` is released for now; the other published packages are listed under `ignore` in `.changeset/config.json`. When testing is done, run `pnpm changeset pre exit`, empty `ignore`, and delete this note.

## License

[MIT](LICENSE)
