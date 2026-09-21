import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Champagne Carbon • Philippine Premiere | Manila Wine',
  description: "The world's first champagne sealed in aerospace carbon fiber. Brought to the Philippines by Manila Wine.",
  openGraph: {
    title: 'Champagne Carbon Philippines | Manila Wine',
    description: 'A revolutionary perception of champagne. Grand Cru cellaring and Bugatti editions, brought to Manila by Manila Wine.',
    url: 'https://champagne-carbon.manila-wine.com',
    siteName: 'Champagne Carbon Manila Wine',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
