import { cn } from '@tyalau/ui/lib/utils'
import { FieldContext, useFieldContext } from '../../shared/FieldContext'
import type { Size } from '../../shared/types'

const offsets: Record<Size, { left: string; right: string; padStart: string; padEnd: string; text: string }> = {
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
      className={cn(
        'relative flex items-center',
        start !== null && start !== undefined && o.padStart,
        end !== null && end !== undefined && o.padEnd,
        className
      )}
      {...props}
    >
      {start !== null && start !== undefined && (
        <span className={cn('absolute flex items-center text-muted-foreground', o.left, o.text)}>{start}</span>
      )}
      {children}
      {end !== null && end !== undefined && (
        <span className={cn('absolute flex items-center text-muted-foreground', o.right, o.text)}>{end}</span>
      )}
    </div>
  )

  return field ? <FieldContext.Provider value={{ ...field, size: resolvedSize }}>{inner}</FieldContext.Provider> : inner
}
