import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 IRL Lagos - Prompt to Production',
  description: 'Join us for Lagos\'s first official v0 IRL event. A hands-on workshop where we\'ll build a complete full stack application together on February 7, 2026.',
  generator: 'v0.app',
  openGraph: {
    title: 'v0 IRL Lagos - Prompt to Production',
    description: 'Join us for Lagos\'s first official v0 IRL event. A hands-on workshop where we\'ll build a complete full stack application together on February 7, 2026.',
    url: 'https://v0-irl-lagos.vercel.app',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'v0 IRL Lagos - Prompt to Production',
      },
      {
        url: '/opengraph-square.jpg',
        width: 1000,
        height: 1000,
        alt: 'v0 IRL Lagos - Prompt to Production',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'v0 IRL Lagos - Prompt to Production',
    description: 'Join us for Lagos\'s first official v0 IRL event. A hands-on workshop where we\'ll build a complete full stack application together on February 7, 2026.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
