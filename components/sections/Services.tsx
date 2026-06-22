'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { cardReveal } from '@/lib/motion';

const services = [
  {
    num: '01',
    title: 'Airport Pick & Drop',
    desc: 'Punctual, professional transfers between Zurich, Geneva, and Basel airports and any destination. Flight tracking included.',
    image: '/images/service-airport-transfer-zurich.jpg',
    static: true,
  },
  {
    num: '02',
    title: 'Wedding Transfers',
    desc: 'Immaculate presentation for your most important day. White-glove service for the bridal party and guests.',
    image: '/images/service-wedding-transfers.jpg',
    static: true,
  },
  {
    num: '03',
    title: 'Corporate & Private',
    desc: 'Executive travel for board meetings, roadshows, and client entertainment across Switzerland and Europe.',
    image: '/images/service-corporate-private-pickup.jpg',
    static: false,
  },
  {
    num: '04',
    title: 'Picnic & Parties',
    desc: 'Curated day escapes to lakeside retreats, mountain events, and private gatherings — arrival in style.',
    image: '/images/service-picnic-parties-transfers.png',
    static: false,
  },
  {
    num: '05',
    title: 'Documents Transfer',
    desc: 'Confidential courier service for time-sensitive legal and financial documents. Chain-of-custody guaranteed.',
    image: '/images/service-documents-transfer.png',
    static: false,
  },
  {
    num: '06',
    title: 'Government & Diplomatic',
    desc: 'Discreet transportation for official delegations, ambassadors, and high-profile principals. Full NDA available.',
    image: '/images/service-government-diplomatic.png',
    static: false,
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className={`service-card${service.static ? ' card--no-hover' : ''}`}
      variants={cardReveal}
      custom={index % 3}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ position: 'relative', overflow: 'hidden' }}
      whileHover={service.static ? undefined : { y: -4, transition: { duration: 0.3 } }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: service.static ? 0.18 : 0.22,
            filter: 'saturate(0.6) contrast(1.1)',
          }}
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(15,15,14,.82) 0%, rgba(15,15,14,.55) 100%)',
        }} />
      </div>

      {/* Content */}
      <span className="service-number" style={{ position: 'relative', zIndex: 1 }}>{service.num}</span>
      <h3 style={{ position: 'relative', zIndex: 1 }}>{service.title}</h3>
      <p style={{ position: 'relative', zIndex: 1 }}>{service.desc}</p>
      <div className="service-line" />
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="service-section service-section--new" id="services">
      <div className="section-header">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>
        <SplitText
          text="Private Mobility, Every Occasion"
          as="h2"
          delay={0.1}
          staggerDelay={0.04}
        />
        <Reveal delay={0.3}>
          <p className="section-copy">
            From the airport tarmac to mountain retreats, ALAIR NOIR is available across
            Switzerland and Europe for any transport need — discreet, punctual, impeccable.
          </p>
        </Reveal>
      </div>

      <div className="service-grid service-grid--new">
        {services.map((service, i) => (
          <ServiceCard key={service.num} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
