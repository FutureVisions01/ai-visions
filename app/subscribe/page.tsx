"use client"

import { useState } from 'react'

/**
 * Subscribe page with a simple email capture form.  Emails are
 * validated on the client and posted to `/api/subscribe`.  On
 * success a thank you message is shown.
 */
export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Basic email regex for client side validation
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        throw new Error('Subscription failed')
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Subscribe</h1>
      <p className="text-zinc-400">
        Receive occasional transmissions when new entries are added.  Your
        email will never be shared.
      </p>
      {status === 'success' ? (
        <p className="text-green-400">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 p-2 text-sm"
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-4 py-2 bg-brand text-white rounded disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting…' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}