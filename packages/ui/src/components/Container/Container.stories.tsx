import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Controls the max-width of the container.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

const Content = () => (
  <div className="h-16 w-full rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-muted-foreground font-mono">
    content
  </div>
)

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Content />
    </Container>
  ),
}

export const SizeScale: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const
    return (
      <div className="flex flex-col gap-4 w-full">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <span className="font-mono text-xs text-muted-foreground">size={size}</span>
            <Container size={size}>
              <Content />
            </Container>
          </div>
        ))}
      </div>
    )
  },
}
