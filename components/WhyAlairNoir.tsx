'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BLOCKS = [
  {
    title: 'Direct relationship',
    body: 'No platform. No anonymous assignment. Your reservation reaches the person responsible for the journey.',
  },
  {
    title: 'Preferences remembered',
    body: 'Routes, cabin preferences, timing habits, and privacy expectations become part of the service.',
  },
  {
    title: 'Executive precision',
    body: 'Airport timing, meeting schedules, luggage, waiting time, and arrival rhythm are handled with quiet discipline.',
  },
  {
    title: 'Limited fleet, higher control',
    body: 'A limited fleet allows the standard to stay consistent, inspected, and tightly controlled.',
  },
  {
    title: 'Switzerland and Europe',
    body: 'Zürich, ZRH Airport, Davos, St. Moritz, Basel, Geneva, Milan, Munich, and private routes by request.',
  },
];

export default function WhyAlairNoir() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="why"
      ref={ref}
      aria-labelledby="why-heading"
      style={{ backgroundColor: 'var(--bg)', padding: 'clamp(80px,10vw,160px) clamp(28px,8vw,140px)' }}
    >
      <div style={{ maxWidth: '720px', marginBottom: 'clamp(48px,6vw,80px)' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '10.4px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '16px',
          }}
        >
          Why Alair Noir
        </motion.p>
        <motion.h2
          id="why-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(44.1px,5vw,83.5px)', lineHeight: 0.92, color: '#F6F2E9',
            marginBottom: '24px',
          }}
        >
          A private standard,
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.62)', paddingLeft: '5%' }}>
            personally held.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '16.2px', lineHeight: 1.8, color: 'var(--text-muted)',
          }}
        >
          What makes the service different is not only the vehicle. It is the continuity behind it.
        </motion.p>
      </div>

      <div
        className="why-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        {BLOCKS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            style={{
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              padding: 'clamp(28px,3.5vw,48px)',
              display: 'flex', flexDirection: 'column', gap: '14px',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(25.5px,2.2vw,34.8px)', lineHeight: 1.1, color: '#F6F2E9',
            }}>
              {b.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '15.1px', lineHeight: 1.75, color: 'var(--text-muted)',
            }}>
              {b.body}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) and (min-width: 769px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
