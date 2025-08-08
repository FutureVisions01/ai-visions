import { findEntry, getRelatedEntries } from '@/lib/entries'
import MediaViewer from '../../components/MediaViewer'
import EntryGrid from '../../components/EntryGrid'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EntryPageProps {
  params: {
    slug: string
  }
}

/**
 * Detail page for an individual entry.  Displays the media viewer,
 * metadata, caption, story and a selection of related entries.
 */
export default async function EntryPage({ params }: EntryPageProps) {
  const entry = findEntry(params.slug)
  if (!entry) {
    notFound()
  }
  const related = getRelatedEntries(entry!, 3)
  return (
    <article className="space-y-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {entry!.title}
        </h1>
        <span className="text-zinc-400 text-sm">{entry!.year}</span>
      </div>
      <MediaViewer media={entry!.media} />
      {entry!.caption && (
        <p className="text-lg italic text-zinc-400">{entry!.caption}</p>
      )}
      {entry!.story && (
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: `<p>` +
              entry!.story
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br />') +
              `</p>`,
          }}
        />
      )}
      <div className="flex flex-wrap gap-2">
        {entry!.themes.map((theme) => (
          <span key={theme} className="bg-zinc-800 text-xs px-2 py-1 rounded">
            #{theme}
          </span>
        ))}
        {entry!.tags.map((tag) => (
          <span key={tag} className="bg-zinc-800 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Entries</h2>
          <EntryGrid entries={related} />
        </section>
      )}
      <div>
        <Link href="/archive" className="text-sm underline">
          ← Back to archive
        </Link>
      </div>
    </article>
  )
}