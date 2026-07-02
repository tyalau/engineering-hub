import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    fullWidth: {
      control: 'boolean',
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
    children: 'Button',
    variant: 'solid',
    size: 'md',
    color: 'primary',
    fullWidth: false,
    disabled: false,
    asChild: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="error">
        Error
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div className="w-80">
      <Button {...args} />
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
            <span className="text-muted-foreground font-mono text-xs">{variant}</span>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

export const WithStartIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        <Mail />
        Send email
      </Button>
      <Button {...args} size="md">
        <Mail />
        Send email
      </Button>
      <Button {...args} size="lg">
        <Mail />
        Send email
      </Button>
    </div>
  ),
}

export const WithEndIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Continue
        <ArrowRight />
      </Button>
      <Button {...args} size="md">
        Continue
        <ArrowRight />
      </Button>
      <Button {...args} size="lg">
        Continue
        <ArrowRight />
      </Button>
    </div>
  ),
}

export const AsChild: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#demo">Link Button</a>
    </Button>
  ),
}
