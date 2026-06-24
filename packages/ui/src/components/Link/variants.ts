import { cva, type VariantProps } from 'class-variance-authority'

export const linkVariants = cva(
  'underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm',
  {
    variants: {
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
        info: 'text-info',
      },
      underline: {
        always: 'underline',
        hover: 'hover:underline',
        none: '',
      },
    },
    defaultVariants: {
      color: 'primary',
      underline: 'hover',
    },
  }
)

export type LinkVariantProps = VariantProps<typeof linkVariants>
