/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { findEntry } from '@/lib/entries'

export const runtime = 'edge'

/**
 * Generates an Open Graph image for an entry.  The image uses
 * simple HTML/CSS rendered by the @vercel/og library.  If the
 * entry does not exist a generic site image is returned.
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const entry = findEntry(params.slug)
  const title = entry?.title ?? 'AI Visions'
  const caption = entry?.caption ?? 'Cinematic, minimalist near‑future art & micro‑stories.'
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          padding: '64px',
          color: '#ffffff',
          backgroundColor: '#0f0f23',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(107, 107, 232, 0.3), transparent 60%)',
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, maxWidth: 900 }}>
          {caption}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}