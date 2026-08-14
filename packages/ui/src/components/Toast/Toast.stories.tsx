import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '../Button'
import { Toaster, toast } from './Toast'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => toast.dismiss(),
          },
        })
      }
    >
      Show Toast
    </Button>
  ),
  play: async ({ canvas }) => {
    // Toasts are portaled to document.body, so query there rather than the story canvas.
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Show Toast' }))
    await waitFor(() => expect(body.getByText('Event has been created')).toBeInTheDocument())
    await expect(body.getByText('Sunday, December 03, 2023 at 9:00 AM')).toBeInTheDocument()

    // The action button dismisses the toast; assert it clears so state doesn't leak to other stories.
    await userEvent.click(body.getByRole('button', { name: 'Undo' }))
    await waitFor(() => expect(body.queryByText('Event has been created')).not.toBeInTheDocument())
  },
}

// Each toast type renders the matching icon configured on <Toaster> (success → check,
// info → info, warning → triangle, error → octagon, loading → spinner), plus a
// description and an action button.
const toastTypes = [
  {
    label: 'Success',
    message: 'Event has been created',
    description: 'Sunday, December 03, 2023 at 9:00 AM',
    action: 'Undo',
    show: toast.success,
  },
  {
    label: 'Info',
    message: 'A new update is available',
    description: 'Version 2.4.0 is ready to install.',
    action: 'View',
    show: toast.info,
  },
  {
    label: 'Warning',
    message: 'Your session is about to expire',
    description: 'You will be logged out in 5 minutes.',
    action: 'Extend',
    show: toast.warning,
  },
  {
    label: 'Error',
    message: 'Something went wrong',
    description: 'Your changes could not be saved.',
    action: 'Retry',
    show: toast.error,
  },
  {
    label: 'Loading',
    message: 'Saving your changes',
    description: 'This may take a few seconds.',
    action: 'Cancel',
    show: toast.loading,
  },
] as const

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {toastTypes.map(({ label, message, description, action, show }) => (
        <Button
          key={label}
          variant="outline"
          onClick={() => show(message, { description, action: { label: action, onClick: () => toast.dismiss() } })}
        >
          {label}
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    // Fire each type and assert its message (icon), description, and action button render.
    for (const { label, message, description, action } of toastTypes) {
      await userEvent.click(canvas.getByRole('button', { name: label }))
      await waitFor(() => expect(body.getByText(message)).toBeInTheDocument())
      await expect(body.getByText(description)).toBeInTheDocument()
      await expect(body.getByText(action)).toBeInTheDocument()
    }

    // Clear all toasts so state doesn't leak into other stories.
    toast.dismiss()
    await waitFor(() => expect(body.queryByText('Saving your changes')).not.toBeInTheDocument())
  },
}
