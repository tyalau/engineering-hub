import { isValidElement } from 'react'
import { cn } from '@tyalau/ui/lib/utils'
import { Slot } from 'radix-ui'
import { iconButtonVariants, type IconButtonVariantProps } from './variants'

export type IconButtonProps = Omit<React.ComponentProps<'button'>, 'children'> &
  IconButtonVariantProps & {
    asChild?: boolean
    'aria-label': string
    children: React.ReactNode
  }

export const IconButton = ({ className, variant, size, color, asChild = false, type, children, ...props }: IconButtonProps) => {
  const Comp = asChild && isValidElement(children) ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="icon-button"
      data-variant={variant ?? 'ghost'}
      data-size={size ?? 'md'}
      type={Comp === 'button' ? (type ?? 'button') : type}
      className={cn(iconButtonVariants({ variant, size, color }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
