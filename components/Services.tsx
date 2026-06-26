'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'Airport Transfer',
    body: 'Zurich Airport (ZRH) curbside pickup and drop-off. Flight tracking included. No waiting, no uncertainty.',
  },
  {
    num: '02',
    title: 'Corporate & Executive',
    body: 'Discreet transport for executives, board members, and VIP clients. Absolute confidentiality.',
  },
  {
    num: '03',
    title: 'Long Distance',
    body: 'Davos, St. Moritz, Geneva, Milan, Munich. Door to door across Switzerland and Europe.',
  },
  {
    num: '04',
    title: 'Hourly Disposition',
    body: 'Vehicle retained by the hour for multi-stop business days. Your schedule, your pace.',
  },
  {
    num: '05',
    title: 'WEF / Davos / Events',
    body: 'World Economic Forum, Zürich Film Festival, Art Basel, and all major international events.',
  },
  {
    num: '06',
    title: 'Private Client',
    body: 'Dedicated service for returning clients. Preferences remembered, direct contact with your driver.',
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      className="py-24 md:py-32"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Header */}
      <div className="px-8 md:px-14 lg:px-20 mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-inter font-light text-[9px] tracking-[0.22em] uppercase text-stone mb-4"
        >
          Services
        </motion.p>
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant font-light text-ivory leading-none"
          style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}
        >
          Every journey,
          <br />
          <em className="italic text-cream pl-[5%]">attended to.</em>
        </motion.h2>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l"
        style={{ borderColor: '#2F4A33' }}
      >
        {services.map((s, i) => (
          <motion.article
            key={s.num}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            className="group relative flex flex-col gap-4 p-8 md:p-10 border-r border-b transition-colors duration-300"
            style={{
              borderColor: '#2F4A33',
              backgroundColor: '#0E1F16',
            }}
          >
            {/* hover overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: 'rgba(47,74,51,0.2)' }}
              aria-hidden="true"
            />

            <span className="font-inter font-light text-[9px] tracking-[0.2em] text-stone">
              {s.num}
            </span>

            <h3 className="font-cormorant font-light text-ivory text-2xl md:text-3xl leading-tight">
              {s.title}
            </h3>

            <p className="font-inter font-light text-stone text-[13px] leading-relaxed">
              {s.body}
            </p>

            {/* Gold accent line on hover */}
            <span
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: '#D4AF37' }}
              aria-hidden="true"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
