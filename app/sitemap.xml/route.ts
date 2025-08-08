import { getAllEntries } from '@/lib/entries'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

/**
 * Generates an XML sitemap for crawlers.  It includes both static
 * and dynamic pages.  The base URL is read from the
 * NEXT_PUBLIC_SITE_URL environment variable with a sensible
 * fallback.
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const entries = getAllEntries()
  const urls = [
    { loc: `${baseUrl}/`, priority: '1.0' },
    { loc: `${baseUrl}/archive`, priority: '0.8' },
    { loc: `${baseUrl}/about`, priority: '0.5' },
    { loc: `${baseUrl}/subscribe`, priority: '0.5' },
    // dynamic entry pages
    ...entries.map((entry) => ({
      loc: `${baseUrl}/entry/${entry.slug}`,
      lastmod: entry.updatedAt.split('T')[0],
      priority: '0.7',
    })),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        return `<url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`
      })
      .join('\n') +
    '\n</urlset>'
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}