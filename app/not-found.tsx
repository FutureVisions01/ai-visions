/**
 * Custom 404 page for unmatched routes.  Next.js will show this
 * component when a page or entry cannot be found.
 */
export default function NotFound() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
      <p className="text-zinc-400">
        The transmission you are looking for could not be recovered.
      </p>
      <a href="/" className="underline text-brand">
        Return home
      </a>
    </div>
  )
}