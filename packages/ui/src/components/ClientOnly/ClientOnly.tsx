'use client'

import { useEffect, useState } from 'react'

export type ClientOnlyProps = {
  children: React.ReactNode
  /** Rendered on the server and during the first client render, before hydration completes. */
  fallback?: React.ReactNode
}

/**
 * Defers rendering of its children until after the component has mounted on the client,
 * preventing SSR hydration mismatches for client-only content (e.g. portals, values that
 * read from `window`). Renders `fallback` on the server and until the first effect runs.
 */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? children : fallback
}
