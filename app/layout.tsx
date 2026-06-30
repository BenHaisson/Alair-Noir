import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALAIR NOIR | Private Chauffeur Service in Zürich for CEOs, Executives & Private Clients',
  description:
    'Private chauffeur service in Zürich for CEOs, executives, private clients, family offices, airport arrivals, events, and long-distance journeys across Switzerland and selected European routes. BMW i7 xDrive60 and Mercedes-Benz V-Class available by request.',
  keywords: [
    'private chauffeur Zürich',
    'Zurich airport transfer',
    'executive chauffeur Zurich',
    'luxury chauffeur Zurich',
    'BMW i7 chauffeur Zurich',
    'Mercedes V-Class chauffeur',
    'family office chauffeur Switzerland',
  ],
  openGraph: {
    title: 'ALAIR NOIR | Private Chauffeur Service in Zürich',
    description:
      'Private chauffeur service in Zürich for CEOs, executives, private clients, family offices, airport arrivals, events, and long-distance journeys.',
    type: 'website',
    locale: 'en_CH',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
