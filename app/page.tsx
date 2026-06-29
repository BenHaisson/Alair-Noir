import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import EarlyTrustStrip from '@/components/EarlyTrustStrip';
import CinematicScrollStory from '@/components/CinematicScrollStory';
import FleetShowcase from '@/components/FleetShowcase';
import BmwI7Presentation from '@/components/BmwI7Presentation';
import InteriorExperience from '@/components/InteriorExperience';
import WhyAlairNoir from '@/components/WhyAlairNoir';
import FounderIntro from '@/components/FounderIntro';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import FaqSection from '@/components/FaqSection';
import BookingExperience from '@/components/BookingExperience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <HeroSection />
        <EarlyTrustStrip />
        <CinematicScrollStory />
        <FleetShowcase />
        <BmwI7Presentation />
        <InteriorExperience />
        <WhyAlairNoir />
        <FounderIntro />
        <ServicesSection />
        <TrustSection />
        <FaqSection />
        <BookingExperience />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
