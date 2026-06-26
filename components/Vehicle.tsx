'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const specs = [
  { label: 'Model',          value: 'BMW i7 xDrive60' },
  { label: 'Generation',     value: 'G70' },
  { label: 'Drivetrain',     value: 'Full Electric · All-Wheel Drive' },
  { label: 'Interior',       value: 'Anthracite Quilted Leather' },
  { label: 'Trim',           value: 'Burgundy Contrast' },
  { label: 'Aero Package',   value: 'M Aerodynamic Package' },
  { label: 'Rear Seating',   value: 'Executive Lounge' },
  { label: 'Entertainment',  value: 'Amazon Fire TV Rear Screen' },
  { label: 'Complimentary',  value: 'Still Water on Every Journey' },
  { label: 'Certified',      value: 'Tachograph Certified' },
  { label: 'Permit',         value: 'Limousine Permit — Kanton Zürich' },
  { label: 'Plate',          value: 'ZH 992 590' },
];

export default function Vehicle() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="vehicle"
      ref={ref}
      aria-labelledby="vehicle-heading"
      className="flex flex-col md:flex-row"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Left label panel */}
      <div
        className="md:w-2/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 md:py-32"
        style={{ backgroundColor: '#0E1F16', borderRight: '1px solid #2F4A33' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-inter font-light text-[9px] tracking-[0.22em] uppercase text-stone mb-6"
        >
          The Vehicle
        </motion.p>

        <motion.h2
          id="vehicle-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant font-light text-ivory leading-none mb-6"
          style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}
        >
          One vehicle.
          <br />
          <em className="italic text-cream">One standard.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-inter font-light text-stone text-sm leading-relaxed max-w-xs"
        >
          The BMW i7 xDrive60 combines full electric performance with an interior designed for those who consider silence a luxury.
        </motion.p>
      </div>

      {/* Right specs */}
      <div className="md:w-3/5 px-8 md:px-14 lg:px-20 py-20 md:py-32">
        <dl className="flex flex-col">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
              className="flex items-baseline justify-between gap-4 py-4 border-b"
              style={{ borderColor: '#2F4A33' }}
            >
              <dt className="font-inter font-light text-[10px] tracking-[0.16em] uppercase text-stone flex-shrink-0">
                {s.label}
              </dt>
              <dd className="font-cormorant font-light text-cream text-base md:text-lg text-right">
                {s.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
