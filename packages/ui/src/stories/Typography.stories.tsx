import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Base typography styles applied globally via `styles.css`. Use native HTML elements directly — no component import needed.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h1>h1 — The quick brown fox</h1>
      <h2>h2 — The quick brown fox</h2>
      <h3>h3 — The quick brown fox</h3>
      <h4>h4 — The quick brown fox</h4>
      <h5>h5 — The quick brown fox</h5>
      <h6>h6 — The quick brown fox</h6>
    </div>
  ),
}

export const Paragraph: Story = {
  render: () => (
    <div>
      <p>
        This is a paragraph. Typography forms the foundation of any interface — clear hierarchy and consistent spacing makes
        content easy to scan and read.
      </p>
      <p>A second paragraph to show the bottom margin between paragraphs. The last paragraph has no trailing margin.</p>
      <p>Last paragraph — no margin below.</p>
    </div>
  ),
}

export const InlineElements: Story = {
  render: () => (
    <p>
      This sentence has <strong>bold text</strong>, <em>italic text</em>, and <small>small text</small> all inline.
    </p>
  ),
}

export const Lists: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground font-mono mb-2">Unordered list</p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-mono mb-2">Ordered list</p>
        <ol>
          <li>First step</li>
          <li>Second step</li>
          <li>Third step</li>
        </ol>
      </div>
    </div>
  ),
}

export const AllTogether: Story = {
  render: () => (
    <article className="max-w-prose">
      <h1>Getting Started</h1>
      <p>
        Welcome to <strong>@tyalau/ui</strong> — a component library built with Radix UI and Tailwind CSS. This guide walks you
        through the basics.
      </p>
      <h2>Installation</h2>
      <p>Install the package from the npm registry and import the styles in your app entry point.</p>
      <h3>Requirements</h3>
      <ul>
        <li>Node.js 24 or higher</li>
        <li>React 19</li>
        <li>Tailwind CSS 4</li>
      </ul>
      <h3>Steps</h3>
      <ol>
        <li>Install the package</li>
        <li>Import styles</li>
        <li>Use components</li>
      </ol>
      <p>
        <small>Last updated June 2026.</small>
      </p>
    </article>
  ),
}
