import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import JournalEditorial from '@/components/JournalEditorial';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Journal | ALAIR NOIR — Notes from the Quiet Hours',
  description:
    'Editorial notes from ALAIR NOIR on private mobility, discretion, and the road — reflections written between journeys across Zürich, the Alps, and Europe.',
  keywords: [
    'ALAIR NOIR journal',
    'luxury chauffeur editorial',
    'private mobility Zürich',
    'discreet executive transport',
    'BMW i7 chauffeur story',
  ],
  openGraph: {
    title: 'The Journal — ALAIR NOIR',
    description:
      'Reflections on movement, discretion, and the road, written between journeys across Switzerland and Europe.',
    type: 'website',
    locale: 'en_CH',
  },
};

export default function JournalPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollProgress />
      <JournalEditorial />
      <Footer />
    </SmoothScroll>
  );
}
