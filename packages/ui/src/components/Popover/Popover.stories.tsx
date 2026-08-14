import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '../Button'
import { Field } from '../Field'
import { Input } from '../Input'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Popover>

// Content is portaled to document.body, so play functions query there rather
// than the story canvas. Radix does not give the content an implicit role, so
// assertions target its text/data attributes instead of getByRole('dialog').
export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline" color="secondary">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }))
    // Wait past the open animation (starts at opacity 0) before asserting visibility.
    await waitFor(() => expect(body.getByText('Dimensions')).toBeVisible())
    await expect(body.getByText('Set the dimensions for the layer.')).toBeInTheDocument()

    // Esc dismisses the popover.
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByText('Dimensions')).not.toBeInTheDocument())
  },
}

type PlacementArgs = React.ComponentProps<typeof Popover> & {
  side: 'top' | 'right' | 'bottom' | 'left'
  align: 'start' | 'center' | 'end'
  sideOffset: number
}

// `side` chooses which edge of the trigger the content opens against, `align`
// positions it along that edge, and `sideOffset` sets the gap from the trigger —
// flip them in Controls to see every placement. Note: in a cramped viewport Radix
// keeps the content on-screen, so a chosen side may flip to its opposite.
export const Placement: StoryObj<PlacementArgs> = {
  argTypes: {
    side: { control: 'radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
    sideOffset: { control: { type: 'range', min: 0, max: 24, step: 1 } },
  },
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 4,
  },
  render: ({ side, align, sideOffset, ...args }) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline" color="secondary">
          {side} / {align}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={sideOffset}>
        <PopoverDescription>
          Opens on the {side} of the trigger, aligned {align}.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvas, args }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: `${args.side} / ${args.align}` }))
    const description = await body.findByText(`Opens on the ${args.side} of the trigger, aligned ${args.align}.`)
    await waitFor(() => expect(description).toBeVisible())

    const content = description.closest('[data-slot="popover-content"]')
    await expect(content).toHaveAttribute('data-side', args.side)
    await expect(content).toHaveAttribute('data-align', args.align)
  },
}

// Popovers commonly host a small inline form (e.g. tweaking layout dimensions).
export const WithForm: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" color="secondary">
          Open dimensions
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <form className="grid gap-2.5" onSubmit={(event) => event.preventDefault()}>
          <Field label="Width" direction="horizontal" size="sm">
            <Input size="sm" defaultValue="100%" />
          </Field>
          <Field label="Height" direction="horizontal" size="sm">
            <Input size="sm" defaultValue="25px" />
          </Field>
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Open dimensions' }))
    const width = await body.findByLabelText('Width')
    await waitFor(() => expect(width).toBeVisible())

    // The form is editable.
    await userEvent.clear(width)
    await userEvent.type(width, '50%')
    await expect(width).toHaveValue('50%')
  },
}

// PopoverAnchor positions the content against an element other than the toggle.
// A custom anchor and PopoverTrigger can't coexist (Radix resets the anchor when
// the trigger unmounts its own), so control `open` yourself and toggle from a
// plain button — here the toggle button sits above the anchor box, and the popover
// opens to the right of that anchor rather than the button.
export const Anchor: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-start gap-6">
        <Button variant="outline" color="secondary" onClick={() => setOpen((prev) => !prev)}>
          Toggle popover
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverAnchor className="text-muted-foreground rounded-md border border-dashed px-4 py-6 text-sm">
            Anchor element
          </PopoverAnchor>
          <PopoverContent side="right">
            <PopoverDescription>Positioned against the anchor, opened by the button above.</PopoverDescription>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Toggle popover' }))
    const description = await body.findByText('Positioned against the anchor, opened by the button above.')
    await waitFor(() => expect(description).toBeVisible())
  },
}
