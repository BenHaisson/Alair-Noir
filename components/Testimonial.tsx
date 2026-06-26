'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Testimonial"
      className="flex flex-col md:flex-row border-y"
      style={{ borderColor: '#2F4A33' }}
    >
      {/* Left accent */}
      <div
        className="hidden md:block md:w-1/4 border-r"
        style={{ backgroundColor: '#0E1F16', borderColor: '#2F4A33' }}
      />

      {/* Quote */}
      <div className="flex-1 px-8 md:px-16 lg:px-24 py-20 md:py-28" style={{ backgroundColor: '#0A0A0A' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Gold rule */}
          <span
            className="block w-8 h-px mb-10"
            style={{ backgroundColor: '#D4AF37' }}
            aria-hidden="true"
          />

          <blockquote>
            <p
              className="font-cormorant font-light italic text-ivory leading-snug mb-8"
              style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}
            >
              "Punctual, immaculate, and utterly discreet. Exactly what I need every time I land in Zürich."
            </p>
            <footer>
              <cite className="font-inter font-light text-[10px] tracking-[0.2em] uppercase text-stone not-italic">
                Regular Traveller — Zürich, 2026
              </cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Right accent */}
      <div
        className="hidden md:block md:w-1/6 border-l"
        style={{ backgroundColor: '#0E1F16', borderColor: '#2F4A33' }}
      />
    </section>
  );
}
