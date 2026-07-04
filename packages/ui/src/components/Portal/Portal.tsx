import { Portal as PortalPrimitive } from 'radix-ui'

export type PortalProps = React.ComponentProps<typeof PortalPrimitive.Root>

/**
 * Renders its children into a different part of the DOM (by default `document.body`),
 * escaping the current stacking/overflow context. Used by overlay components such as
 * Dialog, Popover, and Toast so their content is not clipped by parent containers.
 */
export const Portal = (props: PortalProps) => <PortalPrimitive.Root data-slot="portal" {...props} />
