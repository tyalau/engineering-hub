import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Search, Settings, Trash } from 'lucide-react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: false,
      description: 'See the AsChild story for usage',
    },
  },
  args: {
    variant: 'ghost',
    size: 'md',
    color: 'primary',
    disabled: false,
    'aria-label': 'Action',
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Bell />
    </IconButton>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size="sm" aria-label="Search small">
        <Search />
      </IconButton>
      <IconButton {...args} size="md" aria-label="Search medium">
        <Search />
      </IconButton>
      <IconButton {...args} size="lg" aria-label="Search large">
        <Search />
      </IconButton>
    </div>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} variant="solid" aria-label="Solid">
        <Settings />
      </IconButton>
      <IconButton {...args} variant="outline" aria-label="Outline">
        <Settings />
      </IconButton>
      <IconButton {...args} variant="ghost" aria-label="Ghost">
        <Settings />
      </IconButton>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <IconButton {...args} color="primary" aria-label="Primary">
        <Bell />
      </IconButton>
      <IconButton {...args} color="secondary" aria-label="Secondary">
        <Bell />
      </IconButton>
      <IconButton {...args} color="success" aria-label="Success">
        <Bell />
      </IconButton>
      <IconButton {...args} color="warning" aria-label="Warning">
        <Bell />
      </IconButton>
      <IconButton {...args} color="error" aria-label="Error">
        <Bell />
      </IconButton>
      <IconButton {...args} color="info" aria-label="Info">
        <Bell />
      </IconButton>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} variant="solid" aria-label="Solid disabled">
        <Trash />
      </IconButton>
      <IconButton {...args} variant="outline" aria-label="Outline disabled">
        <Trash />
      </IconButton>
      <IconButton {...args} variant="ghost" aria-label="Ghost disabled">
        <Trash />
      </IconButton>
    </div>
  ),
}

export const FullMatrix: Story = {
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
  },
  render: () => {
    const variants = ['solid', 'outline', 'ghost'] as const
    const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const

    return (
      <div className="flex flex-col gap-6">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span className="font-mono text-xs text-muted-foreground">{variant}</span>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <IconButton key={color} variant={variant} color={color} aria-label={color}>
                  <Bell />
                </IconButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const AsChild: Story = {
  render: (args) => (
    <IconButton {...args} asChild aria-label="Go to settings">
      <a href="#settings">
        <Settings />
      </a>
    </IconButton>
  ),
}
