import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ theme = 'system', richColors = true, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      richColors={richColors}
      className="toaster"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          // Subtle status tints (AA-legible): light bg + dark text, color-mixed against
          // --popover/--foreground so they adapt to light/dark.
          '--success-bg': 'color-mix(in oklab, var(--success) 14%, var(--popover))',
          '--success-text': 'color-mix(in oklab, var(--success) 62%, var(--foreground))',
          '--success-border': 'color-mix(in oklab, var(--success) 34%, var(--popover))',
          '--info-bg': 'color-mix(in oklab, var(--info) 14%, var(--popover))',
          '--info-text': 'color-mix(in oklab, var(--info) 62%, var(--foreground))',
          '--info-border': 'color-mix(in oklab, var(--info) 34%, var(--popover))',
          '--warning-bg': 'color-mix(in oklab, var(--warning) 14%, var(--popover))',
          '--warning-text': 'color-mix(in oklab, var(--warning) 62%, var(--foreground))',
          '--warning-border': 'color-mix(in oklab, var(--warning) 34%, var(--popover))',
          '--error-bg': 'color-mix(in oklab, var(--error) 14%, var(--popover))',
          '--error-text': 'color-mix(in oklab, var(--error) 62%, var(--foreground))',
          '--error-border': 'color-mix(in oklab, var(--error) 34%, var(--popover))',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          // Description color is set per type in styles.css (muted on neutral toasts).
          actionButton: '!rounded-[var(--radius)] !border !border-current !bg-transparent !text-current hover:!bg-foreground/10',
        },
      }}
      {...props}
    />
  )
}
export { Toaster }
export { toast, type ToasterProps } from 'sonner'
