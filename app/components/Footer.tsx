"use client"

/**
 * A simple footer displayed on every page.  It shows the current
 * year and a small copyright notice.  You may extend this
 * component with additional links (e.g. social profiles) if
 * desired.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t border-zinc-800 text-xs text-zinc-400 py-6 text-center">
      © {year} AI Visions.  All rights reserved.
    </footer>
  )
}