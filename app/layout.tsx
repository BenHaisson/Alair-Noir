import type { Metadata } from 'next';
import './globals.css';
import { MotionProvider } from '@/components/motion/MotionProvider';

export const metadata: Metadata = {
  title: 'ALAIR NOIR | Luxury Chauffeur Service & Zurich Airport Transfers',
  description:
    'ALAIR NOIR provides premium chauffeur services, Zurich airport transfers, executive travel, VIP transportation, corporate mobility, wedding transfers, and private driver services across Switzerland and Europe.',
  keywords: [
    'Zurich airport transfer',
    'private chauffeur Switzerland',
    'luxury chauffeur Europe',
    'VIP transportation',
    'chauffeur service Zurich',
    'executive car service Switzerland',
  ],
  openGraph: {
    title: 'ALAIR NOIR | Luxury Chauffeur Service & Zurich Airport Transfers',
    description: 'Private mobility, orchestrated with discretion.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
