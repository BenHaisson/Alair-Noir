import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alair Noir GmbH — Private Mobility. Perfectly Delivered.',
  description:
    'Private chauffeur service in Zürich. BMW i7 xDrive60. Airport transfers, executive transport, long distance across Switzerland and Europe.',
  keywords: [
    'private chauffeur Zürich',
    'airport transfer Zurich',
    'BMW i7 chauffeur',
    'executive transport Switzerland',
    'private driver Europe',
  ],
  openGraph: {
    title: 'Alair Noir GmbH — Private Mobility. Perfectly Delivered.',
    description: 'One vehicle. One standard. BMW i7 xDrive60 — Zürich & Europe.',
    type: 'website',
    locale: 'en_CH',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
