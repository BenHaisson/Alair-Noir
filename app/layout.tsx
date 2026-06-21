import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALAIR NOIR | Luxury Chauffeur Service & Zurich Airport Transfers',
  description: 'ALAIR NOIR provides premium chauffeur services, Zurich airport transfers, executive travel, VIP transportation, corporate mobility, wedding transfers, and private driver services across Switzerland and Europe.',
  keywords: ['Zurich airport transfer', 'private chauffeur Switzerland', 'luxury chauffeur Europe', 'VIP transportation'],
  openGraph: {
    title: 'ALAIR NOIR | Luxury Chauffeur Service & Zurich Airport Transfers',
    description: 'Private mobility, orchestrated with discretion.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}


