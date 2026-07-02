import { cn } from '@tyalau/ui/lib/utils'
import { useFieldContext } from '../../shared/FieldContext'
import { inputVariants, type InputVariantProps } from './variants'

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & InputVariantProps

export const Input = ({
  className,
  size,
  id,
  disabled,
  readOnly,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  'aria-required': ariaRequired,
  ...props
}: InputProps) => {
  const field = useFieldContext()
  const resolvedSize = size ?? field?.size

  return (
    <input
      data-slot="input"
      data-size={resolvedSize ?? 'md'}
      id={field?.id ?? id}
      disabled={field?.isDisabled || disabled}
      readOnly={field?.isReadOnly || readOnly}
      aria-invalid={field?.isInvalid ? true : (ariaInvalid ?? undefined)}
      aria-describedby={
        ariaDescribedBy === '' && !field?.describedBy
          ? undefined
          : [ariaDescribedBy, field?.describedBy].filter(Boolean).join(' ') || undefined
      }
      aria-required={field?.required ? true : (ariaRequired ?? undefined)}
      className={cn(inputVariants({ size: resolvedSize }), className)}
      {...props}
    />
  )
}
