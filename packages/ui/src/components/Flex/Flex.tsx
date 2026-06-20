import { cn } from '@tyalau/ui/lib/utils'
import { flexVariants, type FlexVariantProps } from './variants'

export type FlexProps = React.ComponentProps<'div'> & FlexVariantProps

export const Flex = ({ className, direction, align, justify, gap, wrap, inline, ...props }: FlexProps) => {
  return (
    <div data-slot="flex" className={cn(flexVariants({ direction, align, justify, gap, wrap, inline }), className)} {...props} />
  )
}
