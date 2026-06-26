'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SIGNALS = [
  { label: 'Limousine Permit',   value: 'Kanton Zürich' },
  { label: 'Tachograph',         value: 'Certified' },
  { label: 'UID',                value: 'CHE-411.952.415' },
  { label: 'Response Time',      value: 'Within the hour' },
];

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Testimonial and trust signals"
      style={{ backgroundColor: '#080808', borderTop: '1px solid var(--border)' }}
    >
      {/* Testimonial */}
      <div
        style={{
          padding: 'clamp(80px,10vw,140px) clamp(28px,8vw,140px)',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gap: 'clamp(40px,6vw,100px)',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Gold rule + label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <span
            aria-hidden="true"
            style={{ display: 'block', width: '32px', height: '1px', backgroundColor: 'var(--gold)' }}
          />
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--text-subtle)',
          }}>
            Client — Zürich, 2026
          </p>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(26px,3.2vw,48px)', lineHeight: 1.2,
            color: '#EDE8E0',
          }}>
            "Punctual, immaculate, and utterly discreet. Exactly what I need every time I land in Zürich."
          </p>
          <footer style={{ marginTop: '20px' }}>
            <cite style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-subtle)', fontStyle: 'normal',
            }}>
              Regular Traveller
            </cite>
          </footer>
        </motion.blockquote>
      </div>

      {/* Trust signals strip */}
      <div
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {SIGNALS.map((s, i) => (
          <motion.div
            key={s.label}
            role="listitem"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            style={{
              padding: 'clamp(28px,3vw,44px) clamp(20px,3vw,40px)',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-subtle)',
            }}>
              {s.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(16px,1.6vw,22px)',
              color: 'var(--text-muted)',
            }}>
              {s.value}
            </span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[aria-label="Testimonial and trust signals"] > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
          section[aria-label="Testimonial and trust signals"] > div[role="list"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section[aria-label="Testimonial and trust signals"] > div[role="list"] > div:nth-child(2) {
            border-right: none !important;
          }
          section[aria-label="Testimonial and trust signals"] > div[role="list"] > div:nth-child(3),
          section[aria-label="Testimonial and trust signals"] > div[role="list"] > div:nth-child(4) {
            border-top: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
