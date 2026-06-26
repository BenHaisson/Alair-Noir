'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const vehicles = [
  {
    id:       'bmw-i7',
    name:     'BMW i7',
    subtitle: 'Executive Sedan',
    image:    '/images/bmw-i7-executive-sedan.jpg',
    fallback: '/images/hero-bmw-i7.jpg',
    alt:      'Black BMW i7 executive sedan',
    specs: [
      { label: 'Category',  value: 'Executive Sedan' },
      { label: 'Capacity',  value: '1 – 3 Passengers' },
      { label: 'Luggage',   value: '2 Large Cases' },
      { label: 'Drive',     value: 'Full Electric' },
    ],
    desc: 'Our flagship vehicle. Silent, effortless power with a rear cabin built for focus — reclining executive seats, panoramic roof, and ambient lighting.',
    ideal: 'CEO transfers · Airport arrivals · One-on-one meetings · VIP hotel pickups',
  },
  {
    id:       'mercedes-v',
    name:     'Mercedes-Benz V-Class',
    subtitle: 'Premium Group Transport',
    image:    '/images/mercedes-v-class-premium-van.jpg',
    fallback: '/images/hero-bmw-i7.jpg',
    alt:      'Black Mercedes-Benz V-Class premium van',
    specs: [
      { label: 'Category',      value: 'Premium Van' },
      { label: 'Capacity',      value: 'Up to 7 Passengers' },
      { label: 'Luggage',       value: '6 – 8 Cases' },
      { label: 'Configuration', value: 'Lounge or Standard' },
    ],
    desc: 'Space, privacy, and presence for group travel. The V-Class moves delegations and families with the same standard as our sedan — no compromise.',
    ideal: 'Delegations · Board transfers · Family travel · Multi-executive shuttle',
  },
];

export default function Vehicle() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="fleet"
      ref={ref}
      className="py-24 md:py-36"
      style={{ background: 'var(--parchment)' }}
    >
      <div className="an-container">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-inter text-gold text-[9px] tracking-[0.28em] uppercase mb-5 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-gold opacity-60" />
            Our Fleet
          </p>
          <h2
            className="font-cormorant font-light tracking-[-0.04em] leading-[0.94]"
            style={{ fontSize: 'clamp(42px, 5vw, 76px)', color: 'var(--graphite)' }}
          >
            Two vehicles.
            <br />
            <em className="italic" style={{ color: 'var(--slate)' }}>One standard.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {vehicles.map((v, i) => (
            <motion.article
              key={v.id}
              className="group overflow-hidden"
              style={{ background: 'var(--platinum)', border: '1px solid var(--border-light)' }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '16/9', background: '#1C1A18' }}
              >
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = v.fallback;
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 55%)' }}
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-inter text-gold text-[8px] tracking-[0.24em] uppercase mb-1">{v.subtitle}</p>
                  <h3
                    className="font-cormorant font-light tracking-[-0.03em]"
                    style={{ fontSize: '32px', color: 'var(--ivory)' }}
                  >
                    {v.name}
                  </h3>
                </div>
              </div>

              {/* Specs */}
              <div
                className="grid grid-cols-4"
                style={{ borderBottom: '1px solid var(--border-light)' }}
              >
                {v.specs.map((s) => (
                  <div
                    key={s.label}
                    className="py-4 px-4"
                    style={{ borderRight: '1px solid var(--border-light)' }}
                  >
                    <p className="font-inter text-[8px] tracking-[0.14em] uppercase mb-1" style={{ color: 'var(--stone)' }}>
                      {s.label}
                    </p>
                    <p className="font-inter text-[11px] font-light leading-tight" style={{ color: 'var(--graphite)' }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="p-6 md:p-7">
                <p
                  className="font-inter text-[13px] font-light leading-[1.75] mb-4"
                  style={{ color: 'var(--slate)' }}
                >
                  {v.desc}
                </p>
                <p className="font-inter text-[10px] font-light leading-[1.6]" style={{ color: 'var(--stone)' }}>
                  <span className="text-gold mr-2">Ideal for</span>
                  {v.ideal}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
