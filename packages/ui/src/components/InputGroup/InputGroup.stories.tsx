import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search, Eye, EyeOff, Mail, Copy, Check } from 'lucide-react'
import { Input } from '../Input/Input'
import { InputGroup } from './InputGroup'

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    start: { control: false },
    end: { control: false },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const StartIcon: Story = {
  render: (args) => (
    <InputGroup {...args} start={<Search className="size-4 pointer-events-none" />}>
      <Input size={args.size} placeholder="Search..." />
    </InputGroup>
  ),
}

export const EndIcon: Story = {
  render: (args) => (
    <InputGroup {...args} end={<Mail className="size-4 pointer-events-none" />}>
      <Input size={args.size} type="email" placeholder="you@example.com" />
    </InputGroup>
  ),
}

export const BothIcons: Story = {
  render: (args) => (
    <InputGroup
      {...args}
      start={<Search className="size-4 pointer-events-none" />}
      end={<Mail className="size-4 pointer-events-none" />}
    >
      <Input size={args.size} placeholder="Search email..." />
    </InputGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InputGroup size="sm" start={<Search className="size-4 pointer-events-none" />}>
        <Input size="sm" placeholder="sm input" />
      </InputGroup>
      <InputGroup size="md" start={<Search className="size-4 pointer-events-none" />}>
        <Input size="md" placeholder="md input" />
      </InputGroup>
      <InputGroup size="lg" start={<Search className="size-4 pointer-events-none" />}>
        <Input size="lg" placeholder="lg input" />
      </InputGroup>
    </div>
  ),
}

export const CopyToClipboard: Story = {
  argTypes: { size: { control: false } },
  render: () => {
    const value = 'sk-prod-abc123xyz456'
    const [copied, setCopied] = useState(false)
    const Icon = copied ? Check : Copy
    return (
      <InputGroup
        end={
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(value)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy to clipboard"
          >
            <Icon className="size-4" />
          </button>
        }
      >
        <Input readOnly value={value} aria-label="API key" />
      </InputGroup>
    )
  },
}

export const TextAdornment: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <InputGroup {...args} start="$" end=".00">
        <Input size={args.size} type="number" placeholder="0" className="pl-8! pr-8!" />
      </InputGroup>
      <InputGroup {...args} start="https://" end="/path">
        <Input size={args.size} placeholder="example.com" className="pl-17! pr-13!" />
      </InputGroup>
    </div>
  ),
}

export const PasswordToggle: Story = {
  argTypes: { size: { control: false } },
  render: () => {
    const [visible, setVisible] = useState(false)
    const Icon = visible ? EyeOff : Eye
    return (
      <InputGroup
        end={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            <Icon className="size-4" />
          </button>
        }
      >
        <Input type={visible ? 'text' : 'password'} placeholder="Password" />
      </InputGroup>
    )
  },
}
