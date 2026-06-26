import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CinematicScrollStory from '@/components/CinematicScrollStory';
import FleetShowcase from '@/components/FleetShowcase';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import BookingExperience from '@/components/BookingExperience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <CinematicScrollStory />
        <FleetShowcase />
        <ServicesSection />
        <TrustSection />
        <BookingExperience />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
