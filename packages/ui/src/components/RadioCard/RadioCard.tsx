import { useId } from 'react'
import { cn, isDefined } from '@tyalau/ui/lib/utils'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { radioCardItemVariants, type RadioCardItemVariantProps } from './variants'

export type RadioCardRootProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>

const RadioCardRoot = ({ className, ...props }: RadioCardRootProps) => (
  <RadioGroupPrimitive.Root
    data-slot="radio-card"
    // Horizontal by default: items sit side by side as equal-width, equal-height
    // cards (flex row + items-stretch, with flex-1 on each item). Override with
    // e.g. `flex-col` to stack, or `flex-wrap` to wrap on small screens.
    className={cn('flex w-full items-stretch gap-3', className)}
    {...props}
  />
)

export type RadioCardItemProps = Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'children'> &
  RadioCardItemVariantProps & {
    label?: React.ReactNode
    description?: React.ReactNode
    children?: React.ReactNode
  }

const RadioCardItem = ({ className, size, label, description, children, id, ...props }: RadioCardItemProps) => {
  const generatedId = useId()
  const itemId = id ?? generatedId
  const titleId = `${itemId}-title`
  const descriptionId = `${itemId}-description`
  const usesDefaultContent = !isDefined(children)
  const hasLabel = usesDefaultContent && isDefined(label)
  const hasDescription = usesDefaultContent && isDefined(description)

  return (
    <label data-slot="radio-card-item" data-size={size ?? 'md'} className={cn(radioCardItemVariants({ size }), className)}>
      <RadioGroupPrimitive.Item
        id={itemId}
        data-slot="radio-card-control"
        aria-labelledby={hasLabel ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        className={cn(
          'border-input dark:bg-input/30 flex size-4 shrink-0 items-center justify-center rounded-full border shadow-xs transition-[color,box-shadow] outline-none',
          'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          // Disabled dimming is handled once on the wrapping label (has-[[data-disabled]]:opacity-50).
          'disabled:cursor-not-allowed'
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator data-slot="radio-card-indicator" className="flex items-center justify-center">
          <span className="bg-primary-foreground size-2 rounded-full" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children ?? (
        <div className="grid gap-1 font-normal">
          {hasLabel && (
            <div id={titleId} className="font-medium">
              {label}
            </div>
          )}
          {hasDescription && (
            <div id={descriptionId} className="text-muted-foreground text-xs leading-snug text-balance">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  )
}

export const RadioCard = {
  Root: RadioCardRoot,
  Item: RadioCardItem,
}

export { RadioCardRoot, RadioCardItem }
