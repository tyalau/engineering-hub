import { cva, type VariantProps } from 'class-variance-authority'

export const skeletonVariants = cva('block shrink-0 animate-pulse bg-muted', {
  variants: {
    variant: {
      rectangle: 'h-24 w-full rounded-md',
      circle: 'size-12 rounded-full',
      text: 'h-4 w-full rounded',
    },
  },
  defaultVariants: {
    variant: 'rectangle',
  },
})

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>
