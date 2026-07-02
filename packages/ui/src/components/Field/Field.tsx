import { useId, useMemo } from 'react'
import { cn } from '@tyalau/ui/lib/utils'
import { FieldContext, type FieldContextValue } from '../../shared/FieldContext'
import type { Size } from '../../shared/types'
import { Label } from '../Label/Label'

export type FieldProps = React.ComponentProps<'div'> & {
  label?: React.ReactNode
  required?: boolean
  error?: string
  helperText?: string
  direction?: 'vertical' | 'horizontal'
  disabled?: boolean
  readOnly?: boolean
  size?: Size
}

export const Field = ({
  label,
  required,
  error,
  helperText,
  direction = 'vertical',
  disabled,
  readOnly,
  id: idProp,
  size = 'md',
  className,
  children,
  ...props
}: FieldProps) => {
  const generatedId = useId()
  const descriptionId = `${generatedId}-description`
  const isInvalid = !!error
  const hasDescription = !!(error || helperText)

  const ctx = useMemo<FieldContextValue>(
    () => ({
      id: generatedId,
      isInvalid,
      isDisabled: !!disabled,
      isReadOnly: !!readOnly,
      required: !!required,
      size,
      describedBy: hasDescription ? descriptionId : undefined,
    }),
    [generatedId, isInvalid, disabled, readOnly, required, size, hasDescription, descriptionId]
  )

  return (
    <FieldContext.Provider value={ctx}>
      <div
        id={idProp}
        className={cn(
          direction === 'vertical' ? 'flex flex-col gap-1.5' : 'grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1',
          className
        )}
        {...props}
      >
        {label && (
          <Label htmlFor={generatedId} className={cn(disabled && 'cursor-not-allowed opacity-50')}>
            {label}
            {required && (
              <span className="ml-0.5 text-error" aria-hidden>
                *
              </span>
            )}
          </Label>
        )}
        <div className={cn(direction === 'horizontal' && !label && 'col-span-2')}>{children}</div>
        {hasDescription && (
          <p
            id={descriptionId}
            className={cn(
              'text-sm',
              direction === 'horizontal' && (label ? 'col-start-2' : 'col-span-2'),
              isInvalid ? 'text-error' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  )
}
