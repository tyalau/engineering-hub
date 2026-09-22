'use client'

import { cn, isDefined } from '@tyalau/ui/lib/utils'
import { FieldContext, useFieldContext } from '../../shared/FieldContext'
import type { Size } from '../../shared/types'

const offsets: Record<
  Size,
  {
    left: string
    right: string
    padStart: string
    padEnd: string
    text: string
  }
> = {
  sm: {
    left: 'left-2.5',
    right: 'right-2.5',
    padStart: '**:data-[slot=input]:pl-8',
    padEnd: '**:data-[slot=input]:pr-8',
    text: 'text-sm',
  },
  md: {
    left: 'left-3',
    right: 'right-3',
    padStart: '**:data-[slot=input]:pl-8.5',
    padEnd: '**:data-[slot=input]:pr-8.5',
    text: 'text-sm',
  },
  lg: {
    left: 'left-3.5',
    right: 'right-3.5',
    padStart: '**:data-[slot=input]:pl-9',
    padEnd: '**:data-[slot=input]:pr-9',
    text: 'text-base',
  },
}

export type InputGroupProps = React.ComponentProps<'div'> & {
  size?: Size
  start?: React.ReactNode
  end?: React.ReactNode
}

export const InputGroup = ({ start, end, size, className, children, ...props }: InputGroupProps) => {
  const field = useFieldContext()
  const resolvedSize = size ?? field?.size ?? 'md'
  const o = offsets[resolvedSize]
  const inner = (
    <div
      data-slot="input-group"
      data-size={resolvedSize}
      className={cn('relative flex items-center', isDefined(start) && o.padStart, isDefined(end) && o.padEnd, className)}
      {...props}
    >
      {isDefined(start) && (
        <span className={cn('text-muted-foreground absolute flex items-center', o.left, o.text)}>{start}</span>
      )}
      {children}
      {isDefined(end) && <span className={cn('text-muted-foreground absolute flex items-center', o.right, o.text)}>{end}</span>}
    </div>
  )

  return field ? <FieldContext.Provider value={{ ...field, size: resolvedSize }}>{inner}</FieldContext.Provider> : inner
}
