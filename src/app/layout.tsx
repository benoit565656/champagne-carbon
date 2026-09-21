import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://champagne-carbon.manila-wine.com';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Champagne Carbon • Philippine Premiere | Manila Wine',
    template: '%s | Champagne Carbon Manila',
  },
  description:
    'The world’s first champagne sealed in aerospace carbon fiber. Handcrafted Grand Cru cuvées from Champillon, France, curated and officially allocated in the Philippines by Manila Wine.',
  keywords: [
    'Champagne Carbon',
    'Carbon Champagne Philippines',
    'Manila Wine',
    'Carbon Fiber Champagne',
    'Bugatti Champagne',
    'EB.01 Bugatti',
    'Chiron 300+ Champagne',
    'Grand Cru Champagne Manila',
    'Luxury Champagne Philippines',
    'Champagne Carbon Alexandre Mea',
  ],
  authors: [{ name: 'Manila Wine', url: 'https://manila-wine.com' }],
  creator: 'Manila Wine',
  publisher: 'Manila Wine',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-precomposed.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Champagne Carbon • Philippine Premiere | Manila Wine',
    description:
      'The world’s first champagne sealed in aerospace carbon fiber. Handcrafted Grand Cru cuvées and Bugatti editions, curated in the Philippines by Manila Wine.',
    url: APP_URL,
    siteName: 'Champagne Carbon Manila Wine',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Champagne Carbon • Philippine Premiere by Manila Wine',
      },
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Champagne Carbon • Philippine Premiere by Manila Wine',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Champagne Carbon • Philippine Premiere | Manila Wine',
    description:
      'The world’s first champagne sealed in aerospace carbon fiber. Handcrafted Grand Cru cuvées curated in Manila.',
    images: [`${APP_URL}/og-image.jpg`],
    creator: '@manilawine',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#ece9e2] antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
