"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Entry } from '@/lib/entries'

type EntryCardProps = {
  entry: Entry
}

/**
 * A preview card for a single entry.  The card displays the
 * poster image (or the first media frame) along with the title and
 * year.  Hovering the card slightly scales the preview and
 * reveals the caption.  Clicking navigates to the entry detail.
 */
export default function EntryCard({ entry }: EntryCardProps) {
  const media = entry.media[0]
  // Use the poster for loop/video formats if provided
  const previewSrc = media.poster || media.url
  return (
    <Link href={`/entry/${entry.slug}`} className="group block">
      <motion.div
        className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      >
        <div className="aspect-[4/5] relative">
          <Image
            src={previewSrc}
            alt={media.alt || entry.title}
            fill
            className="object-cover object-center transition-opacity duration-300 group-hover:opacity-75"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-zinc-950/90 via-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h3 className="text-lg font-medium mb-1">{entry.title}</h3>
          <p className="text-sm text-zinc-400 overflow-hidden text-ellipsis">
            {entry.caption}
          </p>
        </div>
        <span className="absolute top-2 right-2 bg-zinc-800 text-xs px-2 py-1 rounded">
          {entry.year}
        </span>
      </motion.div>
    </Link>
  )
}