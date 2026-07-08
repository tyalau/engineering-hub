import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An accessible loading indicator. Exposes `role="status"` with an `aria-label` so assistive technology announces the pending state.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
    },
    label: {
      control: 'text',
    },
  },
  args: {
    size: 'md',
    color: 'primary',
    speed: 'normal',
    label: 'Loading',
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  play: async ({ canvas }) => {
    const spinner = canvas.getByRole('status')
    await expect(spinner).toBeInTheDocument()
    await expect(spinner).toHaveAccessibleName('Loading')
  },
}

export const Sizes: Story = {
  argTypes: { size: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
}

export const Colors: Story = {
  argTypes: { color: { control: false } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Spinner {...args} color="primary" />
      <Spinner {...args} color="secondary" />
      <Spinner {...args} color="success" />
      <Spinner {...args} color="warning" />
      <Spinner {...args} color="error" />
      <Spinner {...args} color="info" />
    </div>
  ),
}

export const Speeds: Story = {
  argTypes: { speed: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} speed="slow" />
      <Spinner {...args} speed="normal" />
      <Spinner {...args} speed="fast" />
    </div>
  ),
}

/**
 * Provide a descriptive `label` so screen readers announce what is loading.
 */
export const CustomLabel: Story = {
  args: { label: 'Sending message' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toHaveAccessibleName('Sending message')
  },
}

export const WithText: Story = {
  argTypes: { size: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Spinner {...args} size="sm" />
      <span className="text-muted-foreground text-sm">Loading…</span>
    </div>
  ),
}
