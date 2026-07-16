import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import type { Size } from '../../shared/types'
import { RadioCard } from './RadioCard'

const sizes = ['sm', 'md', 'lg'] as const satisfies readonly Size[]

// Root props, plus item `size` so the Default story can expose it as a control
// (it maps cleanly to every card) without polluting RadioCard.Root's prop surface.
type StoryArgs = React.ComponentProps<typeof RadioCard.Root> & {
  size?: Size
}

const meta: Meta<StoryArgs> = {
  title: 'Components/RadioCard',
  component: RadioCard.Root,
  tags: ['autodocs'],
  argTypes: {
    // onValueChange is a callback — it belongs in the Actions panel, not the
    // Controls table, so hide the row entirely (the fn() spy still logs/tests).
    onValueChange: { table: { disable: true } },
  },
  // In real usage the parent form/dialog constrains width and the RadioCard
  // fills it (w-full). Simulate that container once here so stories stay width-free.
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  args: {
    onValueChange: fn(),
    size: 'md',
  },
  argTypes: {
    size: { control: 'select', options: sizes },
  },
  render: ({ size, ...args }) => (
    <RadioCard.Root defaultValue="starter" {...args}>
      <RadioCard.Item size={size} value="starter" label="Starter Plan" description="Perfect for small businesses." />
      <RadioCard.Item size={size} value="pro" label="Pro Plan" description="More features and storage." />
    </RadioCard.Root>
  ),
  play: async ({ canvas, args }) => {
    const starter = canvas.getByRole('radio', { name: 'Starter Plan' })
    const pro = canvas.getByRole('radio', { name: 'Pro Plan' })

    await expect(starter).toBeChecked()
    await expect(pro).not.toBeChecked()

    await userEvent.click(pro)

    // Selection moves to the clicked card and the previous one deselects.
    await expect(pro).toBeChecked()
    await expect(starter).not.toBeChecked()
    await expect(args.onValueChange).toHaveBeenCalledWith('pro')
  },
}

// Items are horizontal by default; pass `flex-col` to RadioCard.Root to stack
// them vertically (full-width cards).
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioCard.Root defaultValue="starter" className="flex-col">
      <RadioCard.Item value="starter" label="Starter Plan" description="Perfect for small businesses." />
      <RadioCard.Item value="pro" label="Pro Plan" description="More features and storage." />
    </RadioCard.Root>
  ),
}

export const Sizes: Story = {
  // Showcase story: size is hardcoded per item and no args feed the render.
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <RadioCard.Root key={size} defaultValue="starter">
          <RadioCard.Item
            size={size}
            value="starter"
            label={`Starter Plan (${size})`}
            description="Perfect for small businesses."
          />
          <RadioCard.Item size={size} value="pro" label={`Pro Plan (${size})`} description="More features and storage." />
        </RadioCard.Root>
      ))}
    </div>
  ),
}

export const WithDisabledOption: Story = {
  parameters: {
    // Showcase story: fixed items, no args feed the render.
    controls: { disable: true },
    // The disabled card is dimmed via opacity-50, so its text intentionally
    // falls below the contrast threshold. WCAG 1.4.3 exempts inactive/disabled
    // controls, so scope off the color-contrast rule for this showcase.
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => (
    <RadioCard.Root defaultValue="starter">
      <RadioCard.Item value="starter" label="Starter Plan" description="Perfect for small businesses." />
      <RadioCard.Item value="pro" label="Pro Plan" description="Currently unavailable." disabled />
    </RadioCard.Root>
  ),
}

// Instead of the label/description props, pass custom `children` for a richer
// layout. The wrapping <label> still supplies the radio's accessible name from
// its text content, so selection stays keyboard- and screen-reader-friendly.
export const CustomChildren: Story = {
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <RadioCard.Root defaultValue="monthly" {...args}>
      <RadioCard.Item value="monthly">
        <div className="flex w-full items-center justify-between gap-2 font-normal">
          <div className="grid gap-1">
            <div className="font-medium">Monthly</div>
            <div className="text-muted-foreground text-xs leading-snug">Billed every month.</div>
          </div>
          <span className="text-sm font-semibold">$12/mo</span>
        </div>
      </RadioCard.Item>
      <RadioCard.Item value="yearly">
        <div className="flex w-full items-center justify-between gap-2 font-normal">
          <div className="grid gap-1">
            <div className="font-medium">Yearly</div>
            <div className="text-muted-foreground text-xs leading-snug">Two months free.</div>
          </div>
          <span className="text-sm font-semibold">$120/yr</span>
        </div>
      </RadioCard.Item>
    </RadioCard.Root>
  ),
  play: async ({ canvas, args }) => {
    const yearly = canvas.getByRole('radio', { name: /Yearly/i })

    await userEvent.click(yearly)

    await expect(yearly).toBeChecked()
    await expect(args.onValueChange).toHaveBeenCalledWith('yearly')
  },
}
