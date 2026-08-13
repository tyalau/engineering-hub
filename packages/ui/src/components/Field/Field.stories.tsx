import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { expect } from 'storybook/test'
import { Input } from '../Input'
import { InputGroup } from '../InputGroup'
import { Field } from './Field'

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Email',
    size: 'md',
    direction: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')
    await expect(input).toHaveAttribute('aria-required', 'true')
  },
}

export const WithHelperText: Story = {
  args: { helperText: "We'll never share your email." },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')
    await expect(input).toHaveAttribute('aria-describedby')
  },
}

export const WithError: Story = {
  args: { error: 'Please enter a valid email address.' },
  render: (args) => (
    <Field {...args}>
      <Input type="email" defaultValue="invalid@" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(input).toHaveAttribute('aria-describedby')
  },
}

export const Disabled: Story = {
  args: { disabled: true, helperText: "We'll never share your email." },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')
    await expect(input).toBeDisabled()
  },
}

export const ReadOnly: Story = {
  args: { readOnly: true, label: 'API Key' },
  render: (args) => (
    <Field {...args}>
      <Input value="sk-prod-abc123xyz456" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')
    await expect(input).toHaveAttribute('readonly')
  },
}

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Field label="Email" direction="horizontal" className="**:data-[slot=label]:w-28">
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field
        id="form-email"
        label="Username"
        direction="horizontal"
        helperText="Letters and numbers only."
        className="**:data-[slot=label]:w-28"
      >
        <Input aria-describedby="" placeholder="your_username" />
      </Field>
      <Field
        label="Password"
        direction="horizontal"
        required
        error="Password must be at least 8 characters."
        className="**:data-[slot=label]:w-28"
      >
        <Input type="password" defaultValue="abc" />
      </Field>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Field label="Small" size="sm">
        <Input placeholder="sm" />
      </Field>
      <Field label="Medium" size="md">
        <Input placeholder="md" />
      </Field>
      <Field label="Large" size="lg">
        <Input placeholder="lg" />
      </Field>
    </div>
  ),
}

export const WithInputGroup: Story = {
  args: { label: 'Search' },
  render: (args) => (
    <Field {...args}>
      <InputGroup start={<Search className="pointer-events-none size-4" />}>
        <Input placeholder="Search..." />
      </InputGroup>
    </Field>
  ),
}
