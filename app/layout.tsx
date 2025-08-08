import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AI Visions',
    template: '%s — AI Visions',
  },
  description: 'Cinematic, minimalist near‑future art & micro‑stories.',
  openGraph: {
    title: 'AI Visions',
    description: 'Cinematic, minimalist near‑future art & micro‑stories.',
    images: [
      {
        url: '/media/hero.png',
        width: 1200,
        height: 630,
        alt: 'AI Visions hero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Visions',
    description: 'Cinematic, minimalist near‑future art & micro‑stories.',
    images: ['/media/hero.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}