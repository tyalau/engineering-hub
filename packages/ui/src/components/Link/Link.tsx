import { isValidElement } from 'react'
import { cn } from '@tyalau/ui/lib/utils'
import { ExternalLink } from 'lucide-react'
import { Slot } from 'radix-ui'
import { linkVariants, type LinkVariantProps } from './variants'

export type LinkProps = React.ComponentProps<'a'> &
  LinkVariantProps & {
    asChild?: boolean
    isExternal?: boolean
  }

export const Link = ({ className, color, underline, asChild = false, isExternal = false, children, ...props }: LinkProps) => {
  const Comp = asChild && isValidElement(children) ? Slot.Root : 'a'
  const showIcon = !asChild && isExternal
  const content = showIcon ? (
    <>
      {children}
      <ExternalLink className="size-4 shrink-0" aria-hidden />
    </>
  ) : (
    children
  )

  return (
    <Comp
      data-slot="link"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(linkVariants({ color, underline }), showIcon && 'inline-flex items-center gap-1', className)}
      {...props}
    >
      {content}
    </Comp>
  )
}
