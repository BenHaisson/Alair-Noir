import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import InfoStrip from '@/components/InfoStrip';
import Vehicle from '@/components/Vehicle';
import Services from '@/components/Services';
import Testimonial from '@/components/Testimonial';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <InfoStrip />
        <Vehicle />
        <Services />
        <Testimonial />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
