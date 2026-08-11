import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Renders as inline-flex instead of flex.',
    },
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary text-primary-foreground flex h-10 w-16 items-center justify-center rounded text-xs font-medium">
    {children}
  </div>
)

export const Default: Story = {
  args: {
    inline: false,
    direction: 'row',
    align: 'center',
    justify: 'start',
    gap: 'md',
    wrap: 'nowrap',
  },
  render: (args) => (
    <Flex {...args} className="h-24 w-60">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
      <Item>Four</Item>
    </Flex>
  ),
}

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
  },
  render: (args) => (
    <Flex {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Flex>
  ),
}

export const Alignment: Story = {
  args: {
    align: 'end',
    justify: 'start',
  },
  render: (args) => (
    <Flex {...args} className="border-border h-24 w-full rounded border p-4">
      <Item>Start</Item>
      <Item>Middle</Item>
      <Item>End</Item>
    </Flex>
  ),
}

export const Wrapping: Story = {
  args: {
    wrap: 'wrap',
    gap: 'sm',
  },
  render: (args) => (
    <Flex {...args} className="w-48">
      {Array.from({ length: 6 }, (_, i) => (
        <Item key={i}>{i + 1}</Item>
      ))}
    </Flex>
  ),
}

export const Inline: Story = {
  args: {
    inline: true,
    gap: 'sm',
  },
  render: (args) => (
    <div>
      Text with
      <Flex {...args}>
        <Item>A</Item>
        <Item>B</Item>
      </Flex>
      inline inside.
    </div>
  ),
}

export const GapScale: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return (
      <Flex direction="column" gap="lg">
        {gaps.map((gap) => (
          <Flex key={gap} direction="column" gap="xs">
            <span className="text-muted-foreground font-mono text-xs">gap={gap}</span>
            <Flex gap={gap}>
              <Item>A</Item>
              <Item>B</Item>
              <Item>C</Item>
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  },
}
