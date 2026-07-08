import { cva, type VariantProps } from 'class-variance-authority'
import type { ColorVariant } from '../../shared/colorVariants'

// Spinner has no solid/outline/ghost axis, so it can't reuse the shared compound-variant
// classes — but keying this map by `ColorVariant` makes any future color added to the
// shared palette a compile error here until Spinner defines its matching text class.
const spinnerColorVariants: Record<ColorVariant, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary-foreground',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
}

export const spinnerVariants = cva(
  'inline-block shrink-0 animate-spin rounded-full border-current border-t-transparent align-[-0.125em] border-2',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-8',
      },
      color: spinnerColorVariants,
      speed: {
        slow: '[animation-duration:1.2s]',
        normal: '[animation-duration:0.8s]',
        fast: '[animation-duration:0.5s]',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
      speed: 'normal',
    },
  }
)

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants>
