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
  <div className="bg-primary/10 border-primary/20 text-muted-foreground flex h-16 w-full items-center justify-center rounded border font-mono text-xs">
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
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const
    return (
      <div className="flex w-full flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-1">
            <span className="text-muted-foreground font-mono text-xs">size={size}</span>
            <Container size={size}>
              <Content />
            </Container>
          </div>
        ))}
      </div>
    )
  },
}
