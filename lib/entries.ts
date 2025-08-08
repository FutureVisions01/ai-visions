import entriesData from '@/content/entries.json'

/**
 * Type definitions mirroring the shape of the JSON entries.  Keeping
 * the interfaces in code provides intellisense and compile time
 * safety across the rest of the application.
 */
export type MediaItem = {
  url: string
  type: 'image' | 'video' | 'loop'
  alt: string
  poster?: string
}

export interface Entry {
  id: string
  slug: string
  title: string
  subtitle?: string
  year: number
  createdAt: string
  updatedAt: string
  format: 'image' | 'loop'
  media: MediaItem[]
  caption: string
  story: string
  themes: string[]
  tags: string[]
  mood: string[]
  nsfwFlag: boolean
  views: number
}

const entries: Entry[] = entriesData as Entry[]

/**
 * Returns all entries sorted by year (desc) and then creation date.
 */
export function getAllEntries(): Entry[] {
  return [...entries].sort((a, b) => {
    if (a.year === b.year) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return b.year - a.year
  })
}

/**
 * Find a single entry by its slug.
 * @param slug The slug to search for
 */
export function findEntry(slug: string): Entry | undefined {
  return entries.find((entry) => entry.slug === slug)
}

/**
 * Given an entry, return a list of related entries.  A related entry
 * shares at least one theme or one tag with the provided entry.  The
 * result is sorted by creation date descending.
 * @param entry The entry for which to find related items
 * @param count Maximum number of related entries to return
 */
export function getRelatedEntries(entry: Entry, count = 3): Entry[] {
  const related = entries
    .filter((e) => e.slug !== entry.slug)
    .map((candidate) => {
      const sharedThemes = candidate.themes.filter((t) => entry.themes.includes(t))
      const sharedTags = candidate.tags.filter((t) => entry.tags.includes(t))
      return {
        candidate,
        score: sharedThemes.length + sharedTags.length,
      }
    })
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.candidate.createdAt).getTime() - new Date(a.candidate.createdAt).getTime())
    .slice(0, count)
    .map((i) => i.candidate)

  return related
}