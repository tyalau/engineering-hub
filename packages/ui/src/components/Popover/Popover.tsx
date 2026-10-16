import { Popover as PopoverPrimitive } from 'radix-ui'
import { cn } from '@tyalau/ui/lib/utils'

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>

const Popover = (props: PopoverProps) => <PopoverPrimitive.Root data-slot="popover" {...props} />

export type PopoverTriggerProps = React.ComponentProps<typeof PopoverPrimitive.Trigger>

const PopoverTrigger = (props: PopoverTriggerProps) => <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />

export type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Content>

const PopoverContent = ({ className, align = 'center', sideOffset = 4, ...props }: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground ring-foreground/10 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 z-50 flex w-60 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
)

export type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>

const PopoverAnchor = (props: PopoverAnchorProps) => <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />

export type PopoverHeaderProps = React.ComponentProps<'div'>

const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => (
  <div data-slot="popover-header" className={cn('flex flex-col gap-0.5 text-sm', className)} {...props} />
)

export type PopoverTitleProps = React.ComponentProps<'div'>

const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => (
  <div data-slot="popover-title" className={cn('font-medium', className)} {...props} />
)

export type PopoverDescriptionProps = React.ComponentProps<'p'>

const PopoverDescription = ({ className, ...props }: PopoverDescriptionProps) => (
  <p data-slot="popover-description" className={cn('text-muted-foreground', className)} {...props} />
)

export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
