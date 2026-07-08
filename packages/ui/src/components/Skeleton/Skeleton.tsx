import { cn } from '@tyalau/ui/lib/utils'
import { skeletonVariants, type SkeletonVariantProps } from './variants'

export type SkeletonProps = React.ComponentProps<'div'> &
  SkeletonVariantProps & {
    /** Convenience shorthand for the placeholder width (any CSS length or number of px). */
    width?: number | string
    /** Convenience shorthand for the placeholder height (any CSS length or number of px). */
    height?: number | string
  }

export const Skeleton = ({ className, variant, width, height, style, ...props }: SkeletonProps) => {
  // A circle must stay round, so a single dimension (width, falling back to height) drives
  // both axes — passing a mismatched width/height can never produce an ellipse.
  const isCircle = variant === 'circle'
  const size = width ?? height

  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      data-variant={variant ?? 'rectangle'}
      className={cn(skeletonVariants({ variant }), className)}
      style={{ width: isCircle ? size : width, height: isCircle ? size : height, ...style }}
      {...props}
    />
  )
}
