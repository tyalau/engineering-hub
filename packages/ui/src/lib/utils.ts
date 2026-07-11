import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/** Narrows out `null` and `undefined` — the repo's `eqeqeq` rule forbids the `!= null` shorthand. */
export const isDefined = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined
