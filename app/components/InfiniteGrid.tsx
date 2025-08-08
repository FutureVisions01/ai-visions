"use client"

import { useEffect, useRef, useState } from 'react'
import type { Entry } from '@/lib/entries'
import EntryGrid from './EntryGrid'

interface InfiniteGridProps {
  entries: Entry[]
  /**
   * Number of items to show initially
   */
  initialCount?: number
  /**
   * Number of items to load each time the sentinel comes into view
   */
  increment?: number
}

/**
 * Displays entries in a grid with infinite scroll.  A sentinel
 * element at the bottom of the list triggers loading of more
 * entries when it enters the viewport.
 */
export default function InfiniteGrid({ entries, initialCount = 12, increment = 6 }: InfiniteGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver((entriesObs) => {
      const [entry] = entriesObs
      if (entry.isIntersecting) {
        setVisibleCount((count) => Math.min(count + increment, entries.length))
      }
    }, { rootMargin: '0px 0px 200px 0px' })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [entries.length, increment])

  return (
    <>
      <EntryGrid entries={entries.slice(0, visibleCount)} />
      <div ref={sentinelRef} className="h-px" />
    </>
  )
}