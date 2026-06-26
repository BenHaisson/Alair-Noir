'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const channels = [
  { method: 'Email',    value: 'booking@alairnoir.ch',  href: 'mailto:booking@alairnoir.ch',   note: 'Response within 2 hours' },
  { method: 'WhatsApp', value: '+41 77 287 09 56',       href: 'https://wa.me/41772870956',      note: 'Instant confirmation available' },
  { method: 'Phone',    value: '+41 77 287 09 56',       href: 'tel:+41772870956',               note: 'Available 24 hours, 7 days' },
];

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="booking"
      ref={ref}
      className="py-28 md:py-40"
      style={{ background: 'var(--noir)', borderTop: '1px solid rgba(246,242,233,0.06)' }}
    >
      <div className="an-container">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-inter text-gold text-[9px] tracking-[0.28em] uppercase mb-7 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-gold opacity-60" />
              Book a Chauffeur
            </p>
            <h2
              className="font-cormorant font-light tracking-[-0.04em] leading-[0.94] mb-8"
              style={{ fontSize: 'clamp(42px, 5vw, 76px)', color: 'var(--ivory)' }}
            >
              Ready when
              <br />
              <em className="italic" style={{ color: 'var(--muted)' }}>you are.</em>
            </h2>
            <p
              className="font-inter font-light leading-[1.75] max-w-[360px]"
              style={{ fontSize: '14px', color: 'var(--muted)' }}
            >
              Reach us by email, WhatsApp, or phone. We confirm your booking personally — no automated systems, no bots.
            </p>

            <div
              className="mt-10 pt-10"
              style={{ borderTop: '1px solid rgba(246,242,233,0.07)' }}
            >
              <p
                className="font-inter font-light leading-[1.7] max-w-[340px]"
                style={{ fontSize: '10px', color: 'var(--stone)' }}
              >
                ALAIR NOIR GMBH · Registered in Switzerland<br />
                Serving Zurich, Geneva, Basel, and all of Europe
              </p>
            </div>
          </motion.div>

          {/* Right — channels */}
          <div className="flex flex-col gap-4">
            {channels.map((c, i) => (
              <motion.a
                key={c.method}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group block p-7 transition-all duration-300"
                style={{
                  border: '1px solid rgba(246,242,233,0.09)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(212,175,55,0.40)';
                  el.style.background = 'var(--charcoal)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = 'rgba(246,242,233,0.09)';
                  el.style.background = 'transparent';
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-inter text-[8px] tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--stone)' }}>
                      {c.method}
                    </p>
                    <p className="font-inter font-light text-[18px] tracking-[-0.01em] text-ivory group-hover:text-gold transition-colors duration-300">
                      {c.value}
                    </p>
                    <p className="font-inter font-light text-[10px] mt-1" style={{ color: 'var(--stone)' }}>
                      {c.note}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0"
                    style={{ border: '1px solid rgba(246,242,233,0.10)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
