import { cva, type VariantProps } from 'class-variance-authority'

export const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-md',
      md: 'max-w-screen-lg',
      lg: 'max-w-screen-xl',
      xl: 'max-w-screen-2xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

export type ContainerVariantProps = VariantProps<typeof containerVariants>
