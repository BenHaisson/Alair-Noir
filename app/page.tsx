import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import CinematicScrollStory from '@/components/CinematicScrollStory';
import FleetShowcase from '@/components/FleetShowcase';
import BmwI7Presentation from '@/components/BmwI7Presentation';
import InteriorExperience from '@/components/InteriorExperience';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import BookingExperience from '@/components/BookingExperience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <HeroSection />
        <CinematicScrollStory />
        <FleetShowcase />
        <BmwI7Presentation />
        <InteriorExperience />
        <ServicesSection />
        <TrustSection />
        <BookingExperience />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
