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

        {/* Text */}
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
