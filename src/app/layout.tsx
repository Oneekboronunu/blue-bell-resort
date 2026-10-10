import type { Metadata, Viewport } from 'next';
import './globals.css';
import RootLayoutClient from '@/components/layout/RootLayoutClient';
import { initialSiteSettings } from '@/data/seedData';
import { getHotelSchema } from '@/lib/formatters';

export const viewport: Viewport = {
  themeColor: '#0B3C8C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bluebellresort.com'),
  title: {
    default: 'Blue Bell Resort | Luxury Hotel & Suites in Chattogram, Bangladesh',
    template: '%s | Blue Bell Resort',
  },
  description:
    'Where comfort meets calm. Blue Bell Resort offers 5-star ocean-view luxury suites, chauffeur car rental, fine coastal dining, and bespoke event facilities in Chattogram, Bangladesh.',
  keywords: [
    'Blue Bell Resort',
    'Blue Bell Hotel Chattogram',
    'Luxury resort Chattogram',
    'Best hotel Patenga',
    'Resort in Chittagong',
    'Chattogram sea beach hotel',
    'Rent a car Chattogram',
    'Luxury suites Bangladesh',
    'Wedding hall Chittagong',
    'Chittagong port hotel',
    'Shah Amanat airport hotel',
    'ব্লু বেল রিসোর্ট',
    'চট্টগ্রাম রিসোর্ট',
    'পতেঙ্গা হোটেল',
  ],
  authors: [{ name: 'Blue Bell Resort' }],
  creator: 'Blue Bell Resort',
  publisher: 'Blue Bell Resort',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: 'https://bluebellresort.com',
    siteName: 'Blue Bell Resort',
    title: 'Blue Bell Resort — Where Comfort Meets Calm',
    description:
      'Indulge in coastal tranquility, luxury suites, chauffeur car rentals, and five-star hospitality in Chattogram.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Blue Bell Resort Luxury Hotel Chattogram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Bell Resort — Luxury Hospitality in Chattogram',
    description:
      'Five-star suites, executive chauffeur car rental, banquet hall, and ocean serenity in Chattogram, Bangladesh.',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hotelSchema = getHotelSchema(initialSiteSettings);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Hind+Siliguri:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="antialiased bg-resort-sand/30 text-slate-900 font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
