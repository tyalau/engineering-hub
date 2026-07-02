import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Email address',
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {}

export const WithHtmlFor: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label {...args} htmlFor="email-input" />
      <input id="email-input" type="email" placeholder="you@example.com" className="rounded border px-3 py-1.5 text-sm" />
    </div>
  ),
}

export const CustomClass: Story = {
  args: {
    className: 'text-lg font-bold',
    children: 'Custom styled label',
  },
}
