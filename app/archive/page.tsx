import { getAllEntries } from '@/lib/entries'
import FilterBar from '../components/FilterBar'
import InfiniteGrid from '../components/InfiniteGrid'
import type { Entry } from '@/lib/entries'

interface ArchivePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * The archive page lists all entries with faceted search and
 * infinite scrolling.  Filters are synchronised with query
 * parameters so the list can be shared and revisited.
 */
export default function ArchivePage({ searchParams }: ArchivePageProps) {
  const allEntries = getAllEntries()
  // Apply filters based on query parameters
  let filtered: Entry[] = allEntries
  const theme = typeof searchParams.theme === 'string' ? searchParams.theme : null
  const year = typeof searchParams.year === 'string' ? searchParams.year : null
  const format = typeof searchParams.format === 'string' ? searchParams.format : null
  const query = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : ''
  if (theme) {
    filtered = filtered.filter((entry) => entry.themes.includes(theme))
  }
  if (year) {
    filtered = filtered.filter((entry) => entry.year.toString() === year)
  }
  if (format) {
    filtered = filtered.filter((entry) => entry.format === format)
  }
  if (query) {
    filtered = filtered.filter((entry) => {
      const haystack = [entry.title, entry.caption, entry.story].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Archive</h1>
      <FilterBar entries={allEntries} />
      {filtered.length > 0 ? (
        <InfiniteGrid entries={filtered} initialCount={12} increment={6} />
      ) : (
        <p>No entries match your criteria.</p>
      )}
    </div>
  )
}