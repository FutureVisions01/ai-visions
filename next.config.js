/**
 * @type {import('next').NextConfig}
 *
 * The Next.js configuration for AI Visions.  The site
 * opts into the app directory and disables image optimisation
 * for simplicity when deploying to environments without the
 * default Sharp binary.  If you plan to host on Vercel or
 * another platform that supports automatic image optimisation
 * you can remove the `unoptimized` flag.
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Opt out of built‑in image optimisation so our generated
    // assets work without requiring additional native
    // dependencies during build.  To enable optimisation set
    // this to `false` or remove it entirely.
    unoptimized: true
  }
};

module.exports = nextConfig;