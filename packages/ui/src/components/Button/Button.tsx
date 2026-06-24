import { isValidElement } from 'react'
import { cn } from '@tyalau/ui/lib/utils'
import { Slot } from 'radix-ui'
import { buttonVariants, type ButtonVariantProps } from './variants'

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantProps & {
    asChild?: boolean
  }

export const Button = ({ className, variant, size, color, fullWidth, asChild = false, type, ...props }: ButtonProps) => {
  const Comp = asChild && isValidElement(props.children) ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? 'solid'}
      data-size={size ?? 'md'}
      type={Comp === 'button' ? (type ?? 'button') : type}
      className={cn(buttonVariants({ variant, size, color, fullWidth }), className)}
      {...props}
    />
  )
}
