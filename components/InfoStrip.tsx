'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  { n: '01', label: 'Discretion',     desc: 'Absolute confidentiality for every engagement' },
  { n: '02', label: 'Precision',      desc: 'Down to the minute, every time' },
  { n: '03', label: 'Security',       desc: 'Vetted chauffeurs, secure vehicles' },
  { n: '04', label: 'Swiss Standard', desc: 'The highest benchmark, without exception' },
];

export default function InfoStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="border-y"
      style={{ borderColor: 'var(--border-light)', background: 'var(--platinum)' }}
    >
      <div className="an-container">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: '1px solid var(--border-light)' }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              className="py-10 px-6 md:px-8"
              style={{ borderRight: '1px solid var(--border-light)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-inter text-gold text-[8px] tracking-[0.28em] uppercase mb-2">{p.n}</p>
              <h3
                className="font-cormorant text-[22px] font-light tracking-[-0.02em] mb-2"
                style={{ color: 'var(--graphite)' }}
              >
                {p.label}
              </h3>
              <p
                className="font-inter font-light text-[11px] leading-[1.65]"
                style={{ color: 'var(--stone)' }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
