import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { ClientOnly } from './ClientOnly'

const meta: Meta<typeof ClientOnly> = {
  title: 'Utilities/ClientOnly',
  component: ClientOnly,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Defers rendering of its children until after the component has mounted on the client, preventing SSR hydration mismatches. Renders an optional `fallback` until then.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ClientOnly>

/**
 * After mount, the client-only children replace nothing (no fallback provided) and render.
 */
export const Default: Story = {
  render: () => (
    <ClientOnly>
      <span data-testid="client-content" className="text-sm">
        Rendered on the client
      </span>
    </ClientOnly>
  ),
  play: async ({ canvas }) => {
    const content = await canvas.findByTestId('client-content')
    await expect(content).toBeInTheDocument()
    await expect(content).toHaveTextContent('Rendered on the client')
  },
}

/**
 * Provides a `fallback` for the server / pre-mount render. By the time the play function
 * runs (post-mount) the real children have replaced the fallback.
 */
export const WithFallback: Story = {
  render: () => (
    <ClientOnly fallback={<span data-testid="fallback">Loading…</span>}>
      <span data-testid="client-content" className="text-sm">
        Client value ready
      </span>
    </ClientOnly>
  ),
  play: async ({ canvas }) => {
    const content = await canvas.findByTestId('client-content')
    await expect(content).toBeInTheDocument()
    await expect(canvas.queryByTestId('fallback')).not.toBeInTheDocument()
  },
}
