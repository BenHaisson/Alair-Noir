'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FounderIntro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-labelledby="founder-heading"
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(80px,10vw,150px) clamp(28px,8vw,140px)',
      }}
    >
      <div
        className="founder-shell"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)',
          gap: 'clamp(40px,6vw,90px)',
          alignItems: 'start',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '10.4px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '18px',
          }}>
            The principle
          </p>
          <h2
            id="founder-heading"
            style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(41.8px,4.2vw,74.2px)', lineHeight: 0.95, color: '#F6F2E9',
            }}
          >
            Built around
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.62)' }}>
              continuity.
            </em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: 'clamp(16.2px,1.1vw,18.6px)', lineHeight: 1.85,
            color: 'var(--text-muted)', marginBottom: '32px',
          }}>
            ALAIR NOIR is a private chauffeur service that should not feel random, rushed, or anonymous. Every journey is prepared with the same principle: know the route, respect the passenger, protect the silence, and arrive without noise.
          </p>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(25.5px,2.4vw,37.1px)', lineHeight: 1.3,
            color: '#F6F2E9', paddingTop: '28px', borderTop: '1px solid var(--border-gold)',
          }}>
            Continuity, discretion, and precision — on every journey.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-shell { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
