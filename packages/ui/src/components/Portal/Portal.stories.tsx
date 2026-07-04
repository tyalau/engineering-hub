import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Button } from '../Button/Button'
import { Portal } from './Portal'

const meta: Meta<typeof Portal> = {
  title: 'Utilities/Portal',
  component: Portal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders its children into a different part of the DOM (by default `document.body`), escaping the parent stacking and overflow context. Used internally by overlay components.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Portal>

/**
 * The children are rendered at the end of `document.body`, not inside the clipping
 * container, so they visually escape `overflow: hidden`. A semi-transparent backdrop
 * layer makes it obvious that the portal is overlaid on top of the whole body.
 */
export const Default: Story = {
  render: () => (
    <div data-testid="clip-box" className="border-primary/40 relative h-24 w-64 overflow-hidden rounded border p-3 text-xs">
      <span className="text-muted-foreground">Clipping container (overflow-hidden)</span>
      <Portal>
        {/* Translucent backdrop covering the body shows the portal layer sits above everything */}
        <div data-testid="portal-overlay" className="bg-foreground/40 fixed inset-0 flex items-center justify-center">
          <Button>Portalled Button</Button>
        </div>
      </Portal>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // The Button is portalled to document.body, so it lives OUTSIDE the story canvas...
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('button', { name: 'Portalled Button' })).not.toBeInTheDocument()

    // ...but it does exist in the document body.
    const body = within(document.body)
    const portalledButton = await body.findByRole('button', { name: 'Portalled Button' })
    await expect(portalledButton).toBeInTheDocument()

    // And it is not a descendant of the clipping container.
    const clipBox = canvas.getByTestId('clip-box')
    await expect(clipBox).not.toContainElement(portalledButton)
  },
}
