'use client'

import { useSyncExternalStore } from 'react'

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
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  return mounted ? children : fallback
}
