import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    isExternal: {
      control: 'boolean',
    },
    asChild: {
      control: false,
      description: 'See the AsChild story for usage',
    },
  },
  args: {
    children: 'Link',
    color: 'primary',
    underline: 'hover',
    isExternal: false,
    href: '#demo',
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const Underline: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Link {...args} underline="always">
        Always underlined
      </Link>
      <Link {...args} underline="hover">
        Underline on hover
      </Link>
      <Link {...args} underline="none">
        No underline
      </Link>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Link {...args} color="primary">
        Primary link
      </Link>
      <Link {...args} color="secondary">
        Secondary link
      </Link>
      <Link {...args} color="success">
        Success link
      </Link>
      <Link {...args} color="warning">
        Warning link
      </Link>
      <Link {...args} color="error">
        Error link
      </Link>
      <Link {...args} color="info">
        Info link
      </Link>
    </div>
  ),
}

export const External: Story = {
  args: {
    isExternal: true,
    href: 'https://example.com',
    children: 'Open in new tab',
  },
}

export const InText: Story = {
  render: (args) => (
    <p className="max-w-sm text-sm">
      This is a paragraph with an inline <Link {...args}>link inside text</Link> to demonstrate how it looks in context.
    </p>
  ),
}

const RouterLink = ({ href, children, ...props }: React.ComponentProps<'a'>) => (
  <a href={href} data-router-link {...props}>
    {children}
  </a>
)

export const AsChild: Story = {
  render: (args) => (
    <Link {...args} asChild>
      <RouterLink href="#dashboard">Go to Dashboard</RouterLink>
    </Link>
  ),
}
