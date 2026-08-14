import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import type { Size } from '../../shared/types'
import { Button } from '../Button/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

const sizes = ['sm', 'md', 'lg'] as const satisfies readonly Size[]

// Root props plus Content `size` so the trigger story can expose it as a control.
type StoryArgs = React.ComponentProps<typeof Dialog> & {
  size?: Size
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: sizes },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  render: ({ size, ...args }) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>Enable Notification</DialogTitle>
          <DialogDescription>{"We'd like to send you notifications. Tap 'Enable' to continue."}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button>Enable</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas }) => {
    // Content is portaled to document.body, so query there rather than the story canvas.
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await body.findByRole('dialog')
    // Wait past the open animation (starts at opacity 0) before asserting visibility.
    await waitFor(() => expect(dialog).toBeVisible())
    await expect(body.getByText('Enable Notification')).toBeInTheDocument()

    await userEvent.click(body.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
  },
}

// Controlled open state — the pattern the FCM playground uses (opens the dialog
// imperatively from app state rather than a trigger).
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Enable Notification</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enable Notification</DialogTitle>
              <DialogDescription>{"We'd like to send you notifications."}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" color="secondary">
                  Not now
                </Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)}>Enable</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Enable Notification' }))
    const dialog = await body.findByRole('dialog')
    await waitFor(() => expect(dialog).toBeVisible())

    // Esc closes a modal dialog.
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
  },
}
