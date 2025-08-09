"use client";

import Link from "next/link";
import Image from "next/image";
import type { Entry } from "@/lib/entries";

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  const poster = entry.media[0];

  return (
    <Link href={`/entry/${entry.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Media */}
        <div className="relative aspect-[16/9] bg-zinc-800">
          {poster?.type === "image" ? (
            <Image
              src={poster.url}
              alt={poster.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : poster?.type === "video" ? (
            <video
              src={poster.url}
              poster={poster.poster}
              className="w-full h-full object-cover"
              playsInline
              muted
              loop
              autoPlay
            />
          ) : (
            <div className="w-full h-full bg-zinc-900" />
          )}
        </div>

        {/* Text overlay */}
        <div className="p-3 sm:p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-base sm:text-lg font-medium group-hover:text-brand transition-colors">
              {entry.title}
            </h3>
            <span className="text-xs text-zinc-500 ml-2">{entry.year}</span>
          </div>
          <p className="text-sm text-zinc-400 overflow-hidden text-ellipsis">
            {entry.caption}
          </p>
        </div>

        {/* Hover gradient */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </Link>
  );
}

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