import type { Metadata } from 'next'
import { Figtree, Fragment_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { FilmGrain } from '@/components/FilmGrain'
import { Navbar } from '@/components/Navbar'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fragment-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Studio',
  description: 'A dark editorial design-studio homepage.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fragmentMono.variable}`}>
      <body className="bg-ink text-off antialiased">
        <SmoothScrollProvider>
          <FilmGrain />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
