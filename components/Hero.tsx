'use client';

import { motion } from 'framer-motion';
import type { BezierDefinition } from 'framer-motion';

const services = [
  'Airport Transfer — ZRH',
  'Corporate & Executive',
  'Long Distance',
  'Hourly Disposition',
  'WEF / Davos / Events',
  'Private Client',
];

const EASE: BezierDefinition = [0.25, 0.1, 0.25, 1];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left — Forest green */}
      <div
        className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-32 md:pt-0 pb-16 md:pb-0"
        style={{ backgroundColor: '#0E1F16' }}
      >
        <motion.p
          {...fade(0.1)}
          className="font-inter font-light text-[10px] tracking-[0.22em] uppercase text-stone mb-8"
        >
          Zürich · Switzerland
        </motion.p>

        <motion.h1
          {...fade(0.2)}
          className="font-cormorant font-light text-ivory leading-none mb-8"
          style={{ fontSize: 'clamp(52px, 7vw, 100px)' }}
        >
          The art
          <br />
          <em className="pl-[8%] not-italic italic text-cream">of arrival.</em>
        </motion.h1>

        <motion.p
          {...fade(0.35)}
          className="font-inter font-light text-stone text-sm md:text-[13px] tracking-wide mb-12 max-w-sm"
        >
          BMW i7 xDrive60 · Private &amp; Corporate · Switzerland &amp; Europe
        </motion.p>

        <motion.div {...fade(0.5)} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-cream text-black font-inter font-light text-[10px] tracking-[0.2em] uppercase hover:bg-ivory transition-colors duration-300"
          >
            Reserve Now
          </a>
          <a
            href="https://wa.me/41772870956"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 border border-moss text-cream font-inter font-light text-[10px] tracking-[0.2em] uppercase hover:border-cream transition-colors duration-300"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Right — Black */}
      <div
        className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 pb-16 md:pb-0 border-t md:border-t-0 md:border-l"
        style={{ backgroundColor: '#0A0A0A', borderColor: '#2F4A33' }}
      >
        <motion.p
          {...fade(0.3)}
          className="font-inter font-light text-[10px] tracking-[0.22em] uppercase text-stone mb-8"
        >
          Services
        </motion.p>

        <ul className="list-none flex flex-col">
          {services.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: 'easeOut' }}
              className="flex items-center gap-4 py-4 border-b"
              style={{ borderColor: '#2F4A33' }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#D4AF37' }}
                aria-hidden="true"
              />
              <span className="font-cormorant font-light text-cream text-lg md:text-xl tracking-wide">
                {s}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
