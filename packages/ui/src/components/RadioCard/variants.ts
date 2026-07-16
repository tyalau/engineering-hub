import { cva, type VariantProps } from 'class-variance-authority'

export const radioCardItemVariants = cva(
  'flex flex-1 cursor-pointer items-start rounded-lg border font-medium leading-none select-none transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/20 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
  {
    variants: {
      size: {
        sm: 'gap-2.5 p-2.5 text-xs',
        md: 'gap-3 p-3 text-sm',
        lg: 'gap-3.5 p-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export type RadioCardItemVariantProps = VariantProps<typeof radioCardItemVariants>
