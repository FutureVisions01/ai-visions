"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Entry } from '@/lib/entries'

export interface FilterState {
  theme: string | null
  year: string | null
  format: string | null
  search: string
}

interface FilterBarProps {
  entries: Entry[]
}

/**
 * A control panel allowing users to filter and search entries.  The
 * selected filters are synced to the URL's query parameters so
 * that the state can be shared and preserved across navigation.
 */
export default function FilterBar({ entries }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Derive unique values for each facet
  const themes = Array.from(new Set(entries.flatMap((e) => e.themes))).sort()
  const years = Array.from(new Set(entries.map((e) => e.year.toString()))).sort((a, b) => Number(b) - Number(a))
  const formats = Array.from(new Set(entries.map((e) => e.format)))

  const [state, setState] = useState<FilterState>(() => {
    return {
      theme: searchParams.get('theme'),
      year: searchParams.get('year'),
      format: searchParams.get('format'),
      search: searchParams.get('q') || '',
    }
  })

  // Update the URL when filter state changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (state.theme) params.set('theme', state.theme)
    if (state.year) params.set('year', state.year)
    if (state.format) params.set('format', state.format)
    if (state.search) params.set('q', state.search)
    const qs = params.toString()
    router.replace(`?${qs}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.theme, state.year, state.format, state.search])

  return (
    <form
      className="flex flex-wrap items-center gap-4 mb-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Theme filter */}
      <div>
        <label htmlFor="theme" className="sr-only">
          Theme
        </label>
        <select
          id="theme"
          value={state.theme || ''}
          onChange={(e) => setState((s) => ({ ...s, theme: e.target.value || null }))}
          className="bg-zinc-900 border border-zinc-700 p-2 text-sm"
        >
          <option value="">All themes</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      {/* Year filter */}
      <div>
        <label htmlFor="year" className="sr-only">
          Year
        </label>
        <select
          id="year"
          value={state.year || ''}
          onChange={(e) => setState((s) => ({ ...s, year: e.target.value || null }))}
          className="bg-zinc-900 border border-zinc-700 p-2 text-sm"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Format filter */}
      <div>
        <label htmlFor="format" className="sr-only">
          Format
        </label>
        <select
          id="format"
          value={state.format || ''}
          onChange={(e) => setState((s) => ({ ...s, format: e.target.value || null }))}
          className="bg-zinc-900 border border-zinc-700 p-2 text-sm"
        >
          <option value="">All formats</option>
          {formats.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="flex-grow">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search…"
          value={state.search}
          onChange={(e) => setState((s) => ({ ...s, search: e.target.value }))}
          className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm"
        />
      </div>
    </form>
  )
}