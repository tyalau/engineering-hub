import { Popover as PopoverPrimitive } from 'radix-ui'
import { cn } from '@tyalau/ui/lib/utils'

const Popover = (props: React.ComponentProps<typeof PopoverPrimitive.Root>) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
)

const PopoverTrigger = (props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
)

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
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

const PopoverAnchor = (props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
)

const PopoverHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div data-slot="popover-header" className={cn('flex flex-col gap-0.5 text-sm', className)} {...props} />
)

const PopoverTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div data-slot="popover-title" className={cn('font-medium', className)} {...props} />
)

const PopoverDescription = ({ className, ...props }: React.ComponentProps<'p'>) => (
  <p data-slot="popover-description" className={cn('text-muted-foreground', className)} {...props} />
)

export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
