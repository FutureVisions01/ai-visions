import Image from 'next/image'
import Link from 'next/link'

type HeroProps = {
  /**
   * Optional heading to display on top of the hero image.
   */
  heading?: string
  /**
   * Optional subheading to display beneath the heading.
   */
  subheading?: string
}

/**
 * A responsive hero component with a fixed aspect ratio that
 * adapts between mobile (9:16) and desktop (16:9).  The
 * background image is pulled from the `public/media` folder and
 * will not trigger a client side fetch thanks to Next/Image.
 */
export default function Hero({ heading, subheading }: HeroProps) {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden aspect-[9/16] md:aspect-[16/9]">
        <Image
          src="/media/hero.png"
          alt="Cinematic near‑future backdrop"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-zinc-900/20" />
        <div className="absolute inset-0 flex flex-col justify-end items-start p-6 md:p-12 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-prose">
            {heading || 'Cinematic futures & micro‑stories'}
          </h1>
          {subheading && (
            <p className="text-lg sm:text-xl text-zinc-400 max-w-prose">
              {subheading}
            </p>
          )}
          <Link
            href="/archive"
            className="mt-4 inline-block px-6 py-3 border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-sm uppercase tracking-widest"
          >
            Explore Archive
          </Link>
        </div>
      </div>
    </section>
  )
}