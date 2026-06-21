import { cva, type VariantProps } from 'class-variance-authority'

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
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      // solid
      { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground hover:bg-primary/80' },
      { variant: 'solid', color: 'secondary', class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
      { variant: 'solid', color: 'success', class: 'bg-success text-success-foreground hover:bg-success/80' },
      { variant: 'solid', color: 'warning', class: 'bg-warning text-warning-foreground hover:bg-warning/80' },
      { variant: 'solid', color: 'error', class: 'bg-error text-error-foreground hover:bg-error/80' },
      { variant: 'solid', color: 'info', class: 'bg-info text-info-foreground hover:bg-info/80' },
      // outline
      { variant: 'outline', color: 'primary', class: 'border-primary text-primary hover:bg-primary/10' },
      {
        variant: 'outline',
        color: 'secondary',
        class: 'border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary/50',
      },
      { variant: 'outline', color: 'success', class: 'border-success text-success hover:bg-success/10' },
      { variant: 'outline', color: 'warning', class: 'border-warning text-warning hover:bg-warning/10' },
      { variant: 'outline', color: 'error', class: 'border-error text-error hover:bg-error/10' },
      { variant: 'outline', color: 'info', class: 'border-info text-info hover:bg-info/10' },
      // ghost
      { variant: 'ghost', color: 'primary', class: 'text-primary hover:bg-primary/10' },
      { variant: 'ghost', color: 'secondary', class: 'text-secondary-foreground hover:bg-secondary/50' },
      { variant: 'ghost', color: 'success', class: 'text-success hover:bg-success/10' },
      { variant: 'ghost', color: 'warning', class: 'text-warning hover:bg-warning/10' },
      { variant: 'ghost', color: 'error', class: 'text-error hover:bg-error/10' },
      { variant: 'ghost', color: 'info', class: 'text-info hover:bg-info/10' },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      color: 'primary',
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
