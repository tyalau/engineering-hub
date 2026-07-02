import { createContext, useContext } from 'react'
import type { Size } from './types'

export type FieldContextValue = {
  id: string
  isInvalid: boolean
  isDisabled: boolean
  isReadOnly: boolean
  required: boolean
  size: Size
  describedBy?: string
}

export const FieldContext = createContext<FieldContextValue | null>(null)

export const useFieldContext = () => useContext(FieldContext)
