import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A placeholder block with a pulse animation, used to reserve layout space while content loads. Marked `aria-hidden` so it is skipped by assistive technology.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'circle', 'text'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
  args: {
    variant: 'rectangle',
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * Each `variant` carries an intrinsic default size, so switching the variant control
 * renders a correctly-shaped placeholder without needing `width`/`height`. Provide the
 * optional `width`/`height` props to override a variant's own sizing (see CustomSize).
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]')
    await expect(skeleton).toBeInTheDocument()
    await expect(skeleton).toHaveClass('animate-pulse')
    await expect(skeleton).toHaveAttribute('aria-hidden', 'true')
    await expect(skeleton).toHaveAttribute('data-variant', 'rectangle')
  },
}

/**
 * The `width`/`height` shorthand props set inline styles that override the variant's
 * intrinsic sizing.
 */
export const CustomSize: Story = {
  args: { width: 240, height: 20 },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]')
    await expect(skeleton).toHaveStyle({ width: '240px', height: '20px' })
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    // A circle sized by a single dimension stays round (no ellipse).
    const circle = canvasElement.querySelector('[data-variant="circle"]')
    await expect(circle).toHaveStyle({ width: '48px', height: '48px' })
  },
  render: () => (
    <div className="flex items-center gap-6">
      <Skeleton variant="circle" width={48} />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={160} />
        <Skeleton variant="rectangle" width={200} height={100} />
      </div>
    </div>
  ),
}

/**
 * Compose several skeletons to mirror the shape of the content being loaded.
 */
export const CardPlaceholder: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="border-border w-72 rounded-xl border p-4">
      <Skeleton variant="rectangle" height={128} className="mb-4 w-full" />
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  ),
}
