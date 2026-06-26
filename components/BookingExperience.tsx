'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHANNELS = [
  {
    method: 'Email',
    value:  'booking@alairnoir.ch',
    href:   'mailto:booking@alairnoir.ch',
    label:  'Send an email to book',
    external: false,
  },
  {
    method: 'WhatsApp',
    value:  '+41 77 287 09 56',
    href:   'https://wa.me/41772870956',
    label:  'Message on WhatsApp',
    external: true,
  },
  {
    method: 'Phone',
    value:  '+41 77 287 09 56',
    href:   'tel:+41772870956',
    label:  'Call to book',
    external: false,
  },
];

export default function BookingExperience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="booking-heading"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Left — intro */}
      <div
        style={{
          backgroundColor: '#111111',
          padding: 'clamp(60px,8vw,120px) clamp(28px,6vw,80px)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '20px',
          }}
        >
          Book a Journey
        </motion.p>

        <motion.h2
          id="booking-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(40px,5vw,72px)',
            lineHeight: 0.9, color: '#EDE8E0', marginBottom: '28px',
          }}
        >
          Ready when
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.65)', paddingLeft: '8%' }}>
            you are.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '13px', lineHeight: 1.8,
            color: 'var(--text-muted)', maxWidth: '320px',
          }}
        >
          Direct booking — no platform, no intermediary. Your reservation goes straight to your driver. Response within the hour.
        </motion.p>
      </div>

      {/* Right — channels */}
      <div style={{ backgroundColor: '#080808', padding: 'clamp(60px,8vw,120px) clamp(28px,6vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ul style={{ listStyle: 'none' }}>
          {CHANNELS.map((c, i) => (
            <motion.li
              key={c.method}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <a
                href={c.href}
                aria-label={c.label}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '16px', padding: '28px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-gold)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{
                    fontFamily: 'var(--font-inter)', fontWeight: 300,
                    fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                  }}>
                    {c.method}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                    fontSize: 'clamp(22px,2.6vw,38px)', color: '#EDE8E0',
                    transition: 'color 0.3s',
                  }}>
                    {c.value}
                  </span>
                </span>

                {/* Arrow */}
                <svg
                  width="22" height="14" viewBox="0 0 22 14"
                  fill="none" aria-hidden="true"
                  style={{ color: 'var(--gold)', flexShrink: 0, transition: 'transform 0.3s' }}
                >
                  <path d="M0 7H20M15 1l6 6-6 6" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ marginTop: '40px' }}
        >
          <a
            href="https://instagram.com/alairnoir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Alair Noir on Instagram"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--text-subtle)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
            @alairnoir
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact { grid-template-columns: 1fr !important; }
          #contact > div:first-of-type { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
