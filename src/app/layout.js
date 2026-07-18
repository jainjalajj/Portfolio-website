 import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Jalaj Jain - Software Developer',
  description: 'Professional portfolio showcasing modern web development skills, creative projects, and innovative solutions.',
  keywords: ['web developer', 'full stack', 'react', 'next.js', 'portfolio'],
  authors: [{ name: 'Jalaj Jain' }],
  creator: 'Jalaj Jain',
  publisher: 'Jalaj Jain',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourwebsite.com'),
  openGraph: {
    title: 'Jalaj Jain - Software Developer',
    description: 'Professional portfolio showcasing modern web development skills and projects.',
    url: 'https://jalajjain.com',
    siteName: 'Jalaj Jain Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jalaj Jain - Software Developer',
    description: 'Professional portfolio showcasing modern web development skills and projects.',
    images: ['/images/twitter-image.jpg'],
    creator: '@jalajjain_31',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

import { ThemeProvider } from '@/components/ThemeProvider'
import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <div id="root" className="relative">
            <CustomCursor />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
