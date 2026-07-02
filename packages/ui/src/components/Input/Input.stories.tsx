import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} size="sm" placeholder="sm input" />
      <Input {...args} size="md" placeholder="md input" />
      <Input {...args} size="lg" placeholder="lg input" />
    </div>
  ),
}

export const Error: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'invalid@',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
}

export const WithType: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} type="text" placeholder="Text" aria-required="true" />
      <Input {...args} type="email" placeholder="Email" />
      <Input {...args} type="password" placeholder="Password" />
      <Input {...args} type="number" placeholder="Number" />
    </div>
  ),
}
