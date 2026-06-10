import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

// temporary component test
// Mock icon component to validate your CVA styling rules:
// [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
const MockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      description: 'Applies layout design token variant coordinates.',
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      description: 'Controls structural height increments and rounding matrix adjustments.',
    },
    disabled: {
      control: 'boolean',
      description: 'Triggers pointer-disable states and drops structural canvas opacity.',
    },
    asChild: {
      control: 'boolean',
      description: 'Swaps native element wrappers out to utilize Radix Slot structures.',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Simulates error validation conditions, shifting focus borders to destructive channels.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    asChild: false,
    children: 'Button Action',
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * 🎨 Standard Core Variations
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Primary Luma State',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Flat Boundary State',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Mist Tint State',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Minimal Canvas State',
  },
}

/**
 * 🚨 Destructive Danger State
 * Validates your oklch alpha channels: bg-destructive/10 text-destructive
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Danger Alert Action',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Text Anchor Modifier',
  },
}

/**
 * 🛠️ Contextual Layout Scenarios
 */

// Validates icon size scaling calculations specified inside your CVA maps
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button {...args} data-icon="inline-start">
          <MockIcon />
          Prefix Stream
        </Button>
        <Button {...args} data-icon="inline-end">
          Suffix Stream
          <MockIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button {...args} size="icon" aria-label="Icon only">
          <MockIcon />
        </Button>
        <Button {...args} size="icon-sm" aria-label="Small icon only">
          <MockIcon />
        </Button>
      </div>
    </div>
  ),
}

// Validates boundary styling adjustments triggered under: aria-invalid:border-destructive
export const ValidationErrors: Story = {
  args: {
    variant: 'outline',
    'aria-invalid': true,
    children: 'Invalid Data Focus Border',
  },
}

// Validates the custom layout behavior triggered via your: active:not-aria-[haspopup]:translate-y-px execution rules
export const ActiveScaleCheck: Story = {
  args: {
    children: 'Press and Hold Me to View Click Offset',
  },
}

/**
 * 🎛️ Complete Component Matrix Grid Showcase
 */
export const FullLayoutMatrix: Story = {
  render: () => {
    const variants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const
    const sizes = ['xs', 'sm', 'default', 'lg'] as const

    return (
      <div className="flex flex-col gap-8 p-4">
        {variants.map((v) => (
          <div key={v} className="flex flex-col gap-2">
            <h3 className="text-xs font-mono uppercase text-muted-foreground mb-1">Variant: {v}</h3>
            <div className="flex flex-wrap items-center gap-4">
              {sizes.map((s) => (
                <Button key={s} variant={v} size={s}>
                  Size {s.toUpperCase()}
                </Button>
              ))}
              <Button variant={v} size="default" disabled>
                Disabled
              </Button>
              <Button variant={v} size="icon" aria-label={`Icon placeholder for ${v}`}>
                <MockIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  },
}
