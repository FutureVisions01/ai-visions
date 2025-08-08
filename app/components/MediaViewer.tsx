"use client"

import { useState } from 'react'
import Image from 'next/image'
import type { MediaItem } from '@/lib/entries'

interface MediaViewerProps {
  media: MediaItem[]
}

/**
 * Displays a primary media element with selectable thumbnails.  Images
 * and videos are supported.  When there is only a single media item
 * the thumbnails are omitted.
 */
export default function MediaViewer({ media }: MediaViewerProps) {
  const [index, setIndex] = useState(0)
  const item = media[index]

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-lg border border-zinc-800">
        {item.type === 'image' && (
          <div className="relative aspect-video">
            <Image
              src={item.url}
              alt={item.alt}
              fill
              className="object-contain object-center"
            />
          </div>
        )}
        {item.type !== 'image' && (
          <video
            src={item.url}
            poster={item.poster}
            controls
            loop
            autoPlay
            muted
            playsInline
            className="w-full h-auto"
          />
        )}
      </div>
      {media.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto py-1">
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={
                'relative w-20 h-14 border rounded overflow-hidden ' +
                (i === index ? 'border-brand' : 'border-zinc-700')
              }
            >
              {m.type === 'image' ? (
                <Image src={m.url} alt={m.alt} fill className="object-cover" />
              ) : (
                <Image src={m.poster || '/media/hero.png'} alt={m.alt} fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}