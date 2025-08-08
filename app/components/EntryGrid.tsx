import type { Entry } from '@/lib/entries'
import EntryCard from './EntryCard'

type EntryGridProps = {
  entries: Entry[]
}

/**
 * Renders a responsive grid of entry cards.  The number of columns
 * adapts to the viewport width.  Use this component on the home
 * and archive pages to display lists of entries.
 */
export default function EntryGrid({ entries }: EntryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}