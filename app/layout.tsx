import type { Metadata } from 'next'
import { Playfair_Display, Inter, IBM_Plex_Serif } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plex = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-plex',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Department of Sociology — Kaduna State University',
  description: 'Advancing Social Science in Northern Nigeria. Peer-reviewed research, academic programmes, and community engagement.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${plex.variable}`}>
      <body className="font-inter">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}