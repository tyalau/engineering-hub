import { cva, type VariantProps } from 'class-variance-authority'
import { colorVariants, variantColorCompoundVariants } from '../../shared/colorVariants'

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full shrink-0 select-none transition-[colors,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
        ghost: '',
      },
      size: {
        sm: 'size-8 [&_svg]:size-4',
        md: 'size-9 [&_svg]:size-4',
        lg: 'size-10 [&_svg]:size-5',
      },
      color: colorVariants,
    },
    compoundVariants: [...variantColorCompoundVariants],
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
      color: 'primary',
    },
  }
)

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>
