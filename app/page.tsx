import { getAllEntries } from '@/lib/entries'
import Hero from './components/Hero'
import EntryGrid from './components/EntryGrid'

/**
 * Home page showing the hero banner and a selection of the latest
 * entries.  The hero introduces the site’s purpose and encourages
 * visitors to explore the archive.
 */
export default async function Home() {
  const entries = getAllEntries()
  const latest = entries.slice(0, 6)
  return (
    <div className="space-y-12">
      <Hero />
      <section>
        <h2 className="text-xl font-semibold mb-4">Latest Entries</h2>
        <EntryGrid entries={latest} />
      </section>
    </div>
  )
}