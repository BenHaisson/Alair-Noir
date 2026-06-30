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
  title: 'ALAIR NOIR | Private Chauffeur Service — Zürich & Switzerland',
  description:
    'Executive chauffeur service in Switzerland. BMW i7 and Mercedes-Benz V-Class for airport transfers, VIP transport, corporate travel, delegations, and private events.',
  keywords: [
    'private chauffeur Zürich',
    'airport transfer Zurich',
    'BMW i7 chauffeur',
    'Mercedes V-Class VIP',
    'executive transport Switzerland',
    'private driver Europe',
  ],
  openGraph: {
    title: 'ALAIR NOIR — Private Mobility. Perfectly Delivered.',
    description: 'Private chauffeur service in Zürich. Executive chauffeur across Switzerland and Europe.',
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
