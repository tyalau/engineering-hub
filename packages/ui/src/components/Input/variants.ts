import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'flex w-full min-w-0 rounded-full border border-input bg-background text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-error aria-invalid:focus-visible:ring-error/50 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-3.5 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>
