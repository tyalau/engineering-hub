import { cva, type VariantProps } from 'class-variance-authority'
import { colorVariants, variantColorCompoundVariants } from '../../shared/colorVariants'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap shrink-0 select-none transition-[colors,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
        ghost: '',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-6 text-base',
      },
      color: colorVariants,
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [...variantColorCompoundVariants],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      color: 'primary',
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
