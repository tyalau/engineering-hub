import { cn } from '@tyalau/ui/lib/utils'
import { Slot } from 'radix-ui'
import { buttonVariants, type ButtonVariantProps } from './variants'

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantProps & {
    asChild?: boolean
  }

export const Button = ({ className, variant = 'default', size = 'default', asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
