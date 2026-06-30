'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FAQS = [
  {
    q: 'Do you offer Zürich Airport transfers?',
    a: 'Yes. ALAIR NOIR provides private transfers to and from Zürich Airport, with flight-aware timing and direct communication.',
  },
  {
    q: 'Can I book for an executive or client?',
    a: 'Yes. Executive assistants, family offices, and corporate bookers can arrange journeys directly by email, phone, or WhatsApp.',
  },
  {
    q: 'Which vehicles are available?',
    a: 'The fleet consists of a BMW i7 xDrive60 and a Mercedes-Benz V-Class, both operated to the same private standard.',
  },
  {
    q: 'Do you operate outside Zürich?',
    a: 'Yes. Journeys are available across Switzerland and selected European routes by request.',
  },
  {
    q: 'Can I book long-distance travel?',
    a: 'Yes. Routes such as Davos, St. Moritz, Geneva, Basel, Milan, and Munich can be arranged.',
  },
  {
    q: 'How do I book?',
    a: 'Send your route, date, time, passenger count, and preferred contact method. You will receive a direct response.',
  },
];

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-heading"
      style={{ backgroundColor: 'var(--bg)', padding: 'clamp(80px,10vw,160px) clamp(28px,8vw,140px)' }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
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
          FAQ
        </motion.p>
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(44.1px,5vw,83.5px)', lineHeight: 0.92, color: '#F6F2E9',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          Before
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.62)' }}> you book.</em>
        </motion.h2>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '24px', padding: 'clamp(20px,2.5vw,28px) 0', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                    fontSize: 'clamp(23.2px,2vw,32.5px)', lineHeight: 1.2,
                    color: isOpen ? '#F6F2E9' : 'rgba(246, 242, 233,0.78)',
                    transition: 'color 0.3s',
                  }}>
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0, width: '20px', height: '20px', position: 'relative',
                      color: 'var(--gold)',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: '50%', left: 0, width: '20px', height: '1px',
                      backgroundColor: 'currentColor', transform: 'translateY(-50%)',
                    }} />
                    <span style={{
                      position: 'absolute', top: '50%', left: 0, width: '20px', height: '1px',
                      backgroundColor: 'currentColor',
                      transform: `translateY(-50%) rotate(${isOpen ? 0 : 90}deg)`,
                      transition: 'transform 0.3s',
                    }} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontFamily: 'var(--font-inter)', fontWeight: 300,
                        fontSize: '16.2px', lineHeight: 1.8, color: 'var(--text-muted)',
                        paddingBottom: 'clamp(20px,2.5vw,28px)', maxWidth: '640px',
                      }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
