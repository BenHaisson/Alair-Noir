import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { ScrollJourney } from '@/components/sections/ScrollJourney';
import { Services } from '@/components/sections/Services';
import { Fleet } from '@/components/sections/Fleet';
import { Process } from '@/components/sections/Process';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ScrollJourney />
      <Services />
      <Fleet />
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
