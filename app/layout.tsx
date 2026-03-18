import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import GrainOverlay from '@/components/GrainOverlay'
import CustomCursor from '@/components/CustomCursor'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0D0600',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nocara-dark.vercel.app'),
  title: 'Nocara Dark — Single Origin Luxury Chocolate',
  description: 'Dark. Pure. Obsessive. Handcrafted from single-origin cocoa beans.',
  openGraph: {
    title: 'Nocara Dark — Single Origin Luxury Chocolate',
    description: 'Dark. Pure. Obsessive. Handcrafted from single-origin cocoa beans.',
    images: ['/frames/frame_0001.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
