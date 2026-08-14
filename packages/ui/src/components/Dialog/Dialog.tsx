import { XIcon } from 'lucide-react'
import { cn } from '@tyalau/ui/lib/utils'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { IconButton } from '../IconButton/IconButton'
import { Portal } from '../Portal'
import { dialogContentVariants, type DialogContentVariantProps } from './variants'

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>

const Dialog = (props: DialogProps) => <DialogPrimitive.Root data-slot="dialog" {...props} />

export type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

const DialogTrigger = (props: DialogTriggerProps) => <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />

export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>

const DialogClose = (props: DialogCloseProps) => <DialogPrimitive.Close data-slot="dialog-close" {...props} />

const DialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    data-slot="dialog-overlay"
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20 duration-100 supports-backdrop-filter:backdrop-blur-xs',
      className
    )}
    {...props}
  />
)

export type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> &
  DialogContentVariantProps & {
    /** Render the built-in top-right close button. Defaults to `true`. */
    showCloseButton?: boolean
  }

// Overlay and Content each manage their own Radix Presence, so wrapping them in
// the generic Portal (instead of Dialog.Portal) still animates in/out correctly.
const DialogContent = ({ className, children, size, showCloseButton = true, ...props }: DialogContentProps) => (
  <Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      data-slot="dialog-content"
      data-size={size ?? 'md'}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close data-slot="dialog-close" asChild>
          <IconButton size="sm" color="secondary" className="absolute top-2 right-2" aria-label="Close">
            <XIcon />
          </IconButton>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </Portal>
)

const DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div data-slot="dialog-header" className={cn('flex flex-col gap-2', className)} {...props} />
)

const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div data-slot="dialog-footer" className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-lg leading-none font-semibold', className)} {...props} />
)

const DialogDescription = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
)

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
