import { cn } from '@tyalau/ui/lib/utils'
import { Label as LabelPrimitive } from 'radix-ui'

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    data-slot="label"
    className={cn('text-foreground text-sm leading-none font-medium', className)}
    {...props}
  />
)
