'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'Punctual, immaculate, and utterly discreet. Exactly what I need every time I land in Zürich.',
    cite: 'Frequent ZRH Traveller',
  },
  {
    quote: 'The value is consistency. Same standard, same calm communication, same prepared arrival.',
    cite: 'Executive Assistant, Private Office',
  },
  {
    quote: 'For client movements during event weeks, discretion and timing matter more than anything. Alair Noir understands both.',
    cite: 'Corporate Guest Coordinator',
  },
];

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Client testimonials"
      style={{
        backgroundColor: '#080808',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(80px,10vw,140px) clamp(28px,8vw,140px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: 'clamp(48px,6vw,72px)' }}
      >
        <span
          aria-hidden="true"
          style={{ display: 'block', width: '32px', height: '1px', backgroundColor: 'var(--gold)' }}
        />
        <p style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: '10.4px', letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--text-subtle)',
        }}>
          In their words
        </p>
      </motion.div>

      <div
        className="testimonials-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(28px,4vw,56px)',
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.cite}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.12 }}
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              gap: '28px',
              borderTop: '1px solid var(--border-gold)',
              paddingTop: '28px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic',
              fontSize: 'clamp(25.5px,2vw,34.8px)', lineHeight: 1.3,
              color: '#EDE8E0',
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer>
              <cite style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '10.4px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--text-subtle)', fontStyle: 'normal',
              }}>
                — {t.cite}
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
