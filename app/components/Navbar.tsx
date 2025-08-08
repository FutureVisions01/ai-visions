"use client"

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

/**
 * The primary navigation bar.  It remains simple and restrained
 * in keeping with the AI Visions aesthetic.  Links are underlined
 * on hover.  The theme toggle sits to the right.
 */
export default function Navbar() {
  return (
    <header className="w-full border-b border-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/" className="font-semibold tracking-widest uppercase text-sm hover:text-brand-light">
          AI Visions
        </Link>
        <nav className="hidden sm:flex items-center space-x-6 text-sm">
          <Link href="/archive" className="hover:text-brand-light">Archive</Link>
          <Link href="/about" className="hover:text-brand-light">About</Link>
          <Link href="/subscribe" className="hover:text-brand-light">Subscribe</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}