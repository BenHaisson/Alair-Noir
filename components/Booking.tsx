'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contacts = [
  {
    method: 'Email',
    value: 'booking@alairnoir.ch',
    href: 'mailto:booking@alairnoir.ch',
    label: 'Send an email to book',
  },
  {
    method: 'WhatsApp',
    value: '+41 77 287 09 56',
    href: 'https://wa.me/41772870956',
    label: 'Message on WhatsApp',
    external: true,
  },
  {
    method: 'Phone',
    value: '+41 77 287 09 56',
    href: 'tel:+41772870956',
    label: 'Call to book',
  },
];

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="flex flex-col md:flex-row"
    >
      {/* Left — Forest */}
      <div
        className="md:w-2/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 md:py-32 border-r"
        style={{ backgroundColor: '#0E1F16', borderColor: '#2F4A33' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-inter font-light text-[9px] tracking-[0.22em] uppercase text-stone mb-6"
        >
          Book a Journey
        </motion.p>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant font-light text-ivory leading-none mb-6"
          style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}
        >
          Ready when
          <br />
          <em className="italic text-cream">you are.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-inter font-light text-stone text-sm leading-relaxed max-w-xs"
        >
          Direct booking — no platform, no intermediary. Your reservation goes straight to your driver. Response within the hour.
        </motion.p>
      </div>

      {/* Right — Black */}
      <div
        className="md:w-3/5 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 md:py-32"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <ul className="list-none flex flex-col gap-0">
          {contacts.map((c, i) => (
            <motion.li
              key={c.method}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <a
                href={c.href}
                aria-label={c.label}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center justify-between gap-6 py-8 border-b transition-colors duration-300 hover:border-cream"
                style={{ borderColor: '#2F4A33' }}
              >
                <span className="flex flex-col gap-1">
                  <span className="font-inter font-light text-[9px] tracking-[0.2em] uppercase text-stone group-hover:text-stone transition-colors">
                    {c.method}
                  </span>
                  <span className="font-cormorant font-light text-cream group-hover:text-ivory transition-colors"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}>
                    {c.value}
                  </span>
                </span>

                {/* Arrow */}
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-stone group-hover:text-gold transition-colors duration-300 flex-shrink-0"
                  style={{ color: 'inherit' }}
                >
                  <path d="M0 7H18M13 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <a
            href="https://instagram.com/alairnoir"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Alair Noir on Instagram"
            className="inline-flex items-center gap-3 font-inter font-light text-[10px] tracking-[0.18em] uppercase text-stone hover:text-cream transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
            </svg>
            @alairnoir
          </a>
        </motion.div>
      </div>
    </section>
  );
}
