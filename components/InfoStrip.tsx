'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const items = [
  { label: 'Vehicle',       value: 'BMW i7 xDrive60' },
  { label: 'Coverage',      value: 'Switzerland & Europe' },
  { label: 'Class',         value: 'Full Electric Luxury' },
  { label: 'Availability',  value: '24 / 7' },
];

export default function InfoStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      role="list"
      className="grid grid-cols-2 md:grid-cols-4 border-y"
      style={{ borderColor: '#2F4A33', backgroundColor: '#0E1F16' }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          role="listitem"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="flex flex-col gap-2 px-8 py-8 border-r last:border-r-0"
          style={{ borderColor: '#2F4A33' }}
        >
          <span className="font-inter font-light text-[9px] tracking-[0.22em] uppercase text-stone">
            {item.label}
          </span>
          <span className="font-cormorant font-light text-ivory text-xl md:text-2xl">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
