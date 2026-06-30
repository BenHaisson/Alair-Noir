'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SIGNALS = [
  { label: 'Limousine Permit', value: 'Kanton Zürich' },
  { label: 'Tachograph', value: 'Certified' },
  { label: 'UID', value: 'CHE-411.952.415' },
  { label: 'Response Time', value: 'Within the hour' },
];

export default function EarlyTrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      aria-label="Licensing and trust signals"
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(28px,4vw,48px) clamp(28px,8vw,140px)',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: '10.4px', letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 'clamp(24px,3vw,36px)',
        }}
      >
        Licensed, prepared, and directly accountable.
      </motion.p>

      <div
        role="list"
        className="trust-strip-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}
      >
        {SIGNALS.map((s, i) => (
          <motion.div
            key={s.label}
            role="listitem"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              paddingRight: '24px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? '24px' : '0',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '9.3px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-subtle)',
            }}>
              {s.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(18.6px,1.6vw,25.5px)', color: 'var(--text-muted)',
            }}>
              {s.value}
            </span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-strip-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px !important; }
          .trust-strip-grid > div:nth-child(2) { border-right: none !important; }
          .trust-strip-grid > div:nth-child(odd) { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
