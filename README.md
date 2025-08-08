# AI Visions

AI Visions is a cinematic, minimalist catalogue of near‑future art and micro‑stories.  The
application is built with Next.js 14 and leverages the App Router, TypeScript,
TailwindCSS and Framer Motion to deliver a refined user experience.  It
includes dynamic OG image generation, a sitemap, robots.txt, dark/light theme
support and a simple API endpoint for email capture.

## Features

* **App Router** – pages are defined under the `app/` directory with support for
  nested layouts, route segments and API routes.
* **TypeScript models** – all entry and subscriber data is strongly typed using
  `zod` and custom TypeScript interfaces.
* **TailwindCSS & shadcn/ui** – the UI is composed with a mobile‑first design
  using utility classes and minimal bespoke components.  Dark mode is enabled
  by default with a toggle.
* **Framer Motion** – subtle page transitions, hover effects and interactive
  previews elevate the browsing experience.
* **Dynamic OG images** – `/og/[slug]` generates Open Graph images for each
  entry on the fly using the `@vercel/og` library.  These images are
  leveraged when your links are shared on social media.
* **Sitemap & robots** – a dynamic sitemap is served from `/sitemap.xml` and
  a permissive `robots.txt` is included in the `public/` folder.
* **Email capture** – the `/subscribe` page posts to a lightweight API route
  which validates the email address and logs the payload.  Replace the
  implementation to integrate with your preferred marketing service.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a `.env` file**

   Copy `.env.example` to `.env` and populate the values.  At a minimum you
   should set `NEXT_PUBLIC_SITE_URL` to the domain where the site will be
   deployed.

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.  As you edit the code
   the page will automatically reload.

4. **Build for production**

   ```bash
   npm run build
   npm run start
   ```

   Next.js will generate an optimised production build and serve it.

## Deployment

The repository is ready for deployment on [Vercel](https://vercel.com/):

1. **Create a new Vercel project** and select this repository from your
   version control provider.
2. **Set the environment variables** from your `.env` file in the Vercel
   dashboard (e.g. `NEXT_PUBLIC_SITE_URL`).
3. **Deploy** – Vercel will detect the Next.js framework, install
   dependencies and build the application.  Once deployed your site will be
   available at the generated domain, e.g. `https://ai‑visions.vercel.app`.

If you prefer to self‑host, any platform capable of running a Node.js process
can host the output of `next build` by running `next start`.  Ensure the
`NEXT_PUBLIC_SITE_URL` points to your domain so that the sitemap and OG images
contain the correct canonical URLs.

## Content

Entry data lives in `content/entries.json`.  To add or update entries simply
edit this file.  Each entry includes metadata such as the title, year,
formats (image or loop), caption and story.  Media assets should be placed
under `public/media/` and referenced by relative path.

## Acknowledgements

AI Visions draws inspiration from glitch art, dystopian fiction and
contemporary net‑art aesthetics.  The codebase uses a handful of open source
libraries including Next.js, TailwindCSS, Framer Motion, Zod and
@vercel/og.  Feel free to extend, remix and build upon this foundation.
