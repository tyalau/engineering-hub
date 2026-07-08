import { cn } from '@tyalau/ui/lib/utils'
import { spinnerVariants, type SpinnerVariantProps } from './variants'

export type SpinnerProps = React.ComponentProps<'div'> &
  SpinnerVariantProps & {
    /** Accessible label announced to assistive technology. */
    label?: string
  }

export const Spinner = ({ className, size, color, speed, label = 'Loading', ...props }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label={label}
      data-slot="spinner"
      data-size={size ?? 'md'}
      data-speed={speed ?? 'normal'}
      className={cn(spinnerVariants({ size, color, speed }), className)}
      {...props}
    />
  )
}
