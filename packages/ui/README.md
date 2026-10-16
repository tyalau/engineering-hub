# @tyalau/ui

React component library built on [Radix UI](https://www.radix-ui.com/) primitives and styled with [Tailwind CSS](https://tailwindcss.com/) v4. Ships as ES modules with TypeScript declarations and a prebuilt stylesheet.

## 📦 Installation

```bash
pnpm add @tyalau/ui react react-dom
```

`react` and `react-dom` (v19) are peer dependencies. The library uses your app's React instead of installing its own copy.

## 🚀 Usage

### 1. Import the stylesheet

Import the prebuilt CSS once, at your app's entry point (e.g. `app/layout.tsx` or `main.tsx`):

```ts
import '@tyalau/ui/styles.css'
```

The stylesheet is self-contained, so you don't need to install or configure Tailwind yourself. It includes:

- Tailwind's base reset (Preflight) and every utility the components use
- Light and dark theme tokens
- The Inter and JetBrains Mono fonts, loaded from Google Fonts

### 2. Import components

Each component has its own entry point, so you only bundle what you import:

```tsx
import { Button } from '@tyalau/ui/Button'
import { Flex } from '@tyalau/ui/Flex'

export const Actions = () => (
  <Flex gap="sm">
    <Button>Save</Button>
    <Button variant="outline" color="secondary">
      Cancel
    </Button>
  </Flex>
)
```

## 🧩 Components

| Entry point             | Exports                                                                                                                       |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `@tyalau/ui/Button`     | `Button`                                                                                                                      |
| `@tyalau/ui/IconButton` | `IconButton`                                                                                                                  |
| `@tyalau/ui/Link`       | `Link`                                                                                                                        |
| `@tyalau/ui/Input`      | `Input`                                                                                                                       |
| `@tyalau/ui/InputGroup` | `InputGroup`                                                                                                                  |
| `@tyalau/ui/Label`      | `Label`                                                                                                                       |
| `@tyalau/ui/Field`      | `Field`                                                                                                                       |
| `@tyalau/ui/RadioCard`  | `RadioCard`, `RadioCardRoot`, `RadioCardItem`                                                                                 |
| `@tyalau/ui/Dialog`     | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` |
| `@tyalau/ui/Popover`    | `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`         |
| `@tyalau/ui/Toast`      | `Toaster`, `toast` (built on [Sonner](https://sonner.emilkowal.ski/))                                                         |
| `@tyalau/ui/Container`  | `Container`                                                                                                                   |
| `@tyalau/ui/Flex`       | `Flex`                                                                                                                        |
| `@tyalau/ui/Skeleton`   | `Skeleton`                                                                                                                    |
| `@tyalau/ui/Spinner`    | `Spinner`                                                                                                                     |
| `@tyalau/ui/Portal`     | `Portal`                                                                                                                      |
| `@tyalau/ui/ClientOnly` | `ClientOnly`                                                                                                                  |

Every component also exports its props type (e.g. `ButtonProps`). Components with variants export their [CVA](https://cva.style/) function as well (e.g. `buttonVariants`), so you can apply the same styles to your own elements.

### Shared props

These props take the same values wherever they appear:

| Prop    | Values                                                                  | Default   | Components                                                                                          |
| :------ | :---------------------------------------------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------- |
| `color` | `primary` \| `secondary` \| `warning` \| `error` \| `success` \| `info` | `primary` | `Button`, `IconButton`, `Link`, `Spinner`                                                           |
| `size`  | `sm` \| `md` \| `lg`                                                    | `md`      | `Button`, `IconButton`, `Input`, `InputGroup`, `Field`, `DialogContent`, `RadioCardItem`, `Spinner` |
| `gap`   | `xs` \| `sm` \| `md` \| `lg` \| `xl`                                    | —         | `Flex`                                                                                              |

Each component has its own variants beyond these, e.g. `variant` on `Button` and `Skeleton`, `underline` on `Link`, `speed` on `Spinner`, and `direction`, `align`, `justify` and `wrap` on `Flex`. Import the component's props type (or its `*Variants` function) to see the full set.

`Container` is the exception: its `size` sets the maximum width rather than scaling the element, and takes `sm` \| `md` \| `lg` \| `xl` \| `full`, defaulting to `lg`.

`Button`, `IconButton` and `Link` accept `asChild`, which renders the styles onto your own child element via Radix [`Slot`](https://www.radix-ui.com/primitives/docs/utilities/slot):

```tsx
<Button asChild>
  <a href="/docs">Read the docs</a>
</Button>
```

## 🎨 Theming

### Dark mode

Add the `dark` class to `<html>` (or any ancestor) to switch every component inside it to the dark palette:

```html
<html class="dark"></html>
```

### Custom tokens

Colors, radius, and fonts are CSS custom properties. Override them after importing the stylesheet:

```css
:root {
  --primary: oklch(55% 0.2 150);
  --radius: 0.5rem;
}

.dark {
  --primary: oklch(70% 0.18 150);
}
```

Available tokens include `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, `--ring` and `--radius`, plus `--warning`, `--error`, `--success`, `--info` and a `-foreground` pair for each color. Fonts are set by `--font-body-data` and `--font-mono-data`.

## 🛠️ Utilities

`cn` merges class names and resolves Tailwind conflicts, the same way the components do internally:

```ts
import { cn } from '@tyalau/ui/lib/utils'

cn('px-2 py-1', isActive && 'bg-primary', 'px-4') // → 'py-1 bg-primary px-4'
```

## ⚛️ Next.js (App Router)

Every component can be rendered from a Server Component. Components that need the browser are marked `'use client'` internally.

Server Components can't pass functions as props, so move event handlers and callbacks (`onClick`, `onOpenChange`, etc.) into a Client Component. The same applies to `toast()`, which has to be called from client-side code:

```tsx
'use client'

import { Button } from '@tyalau/ui/Button'
import { toast } from '@tyalau/ui/Toast'

export const SaveButton = () => <Button onClick={() => toast.success('Saved')}>Save</Button>
```

## 📄 License

[MIT](https://github.com/tyalau/engineering-hub/blob/main/LICENSE)
