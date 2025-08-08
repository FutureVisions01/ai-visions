"use client"

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

/**
 * A button that toggles between dark and light themes.  The user
 * preference is persisted in localStorage so the choice is
 * remembered across visits.  When the component mounts it
 * initialises the document's class based on the saved value or
 * defaults to dark.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  })

  // Apply the theme class to the <html> element whenever it changes
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className={clsx(
        'p-2 rounded focus:outline-none focus-visible:ring ring-brand',
        'transition-colors duration-200',
        theme === 'dark' ? 'text-yellow-400' : 'text-zinc-800'
      )}
    >
      {theme === 'dark' ? '🌞' : '🌜'}
    </button>
  )
}