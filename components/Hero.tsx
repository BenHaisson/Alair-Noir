'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.05, ease } },
};

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bmw-i7.jpg"
          alt="Black BMW i7 arriving at a luxury Zurich hotel entrance"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: 'saturate(0.82) contrast(1.06) brightness(0.90)' }}
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.60) 45%, rgba(10,10,10,0.18) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, transparent 20%)' }} />
      </div>

      {/* ── Main copy ── */}
      <div className="relative z-10 an-container">
        <motion.div
          className="max-w-[680px]"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="font-inter text-gold text-[9px] tracking-[0.30em] uppercase mb-8 font-normal flex items-center gap-3"
          >
            <span className="inline-block w-6 h-px bg-gold opacity-60" />
            Switzerland · Executive Mobility
          </motion.p>

          {/* Headline — Cormorant upright + italic */}
          <motion.h1
            variants={item}
            className="font-cormorant font-light text-ivory tracking-[-0.04em] leading-[0.93] mb-7"
            style={{ fontSize: 'clamp(56px, 7.5vw, 118px)' }}
          >
            Private Mobility.
            <br />
            <em className="italic" style={{ color: '#E8E4DC', paddingLeft: '0.08em' }}>
              Perfectly Delivered.
            </em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="font-inter font-light text-muted leading-[1.75] max-w-[430px] mb-10"
            style={{ fontSize: 'clamp(13px, 1.15vw, 16px)' }}
          >
            Executive chauffeur service for VIP clients, corporate travel,
            airport transfers, delegations, and private events across Switzerland.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#booking"
              className="inline-flex items-center h-12 px-7 bg-gold text-noir font-inter text-[9px] tracking-[0.20em] uppercase font-medium hover:bg-ivory transition-colors duration-300"
            >
              Book a Chauffeur
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center h-12 px-7 border font-inter text-[9px] tracking-[0.20em] uppercase font-light text-ivory hover:border-ivory/50 transition-colors duration-300"
              style={{ borderColor: 'rgba(246,242,233,0.22)' }}
            >
              View Fleet
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom metadata ── */}
      <motion.div
        className="relative z-10 an-container mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        <div className="hidden md:flex items-center gap-7 font-inter text-muted text-[8px] tracking-[0.18em] uppercase">
          <span>Zürich · Geneva · Basel</span>
          <span className="w-4 h-px bg-gold opacity-40" />
          <span>Available 24 / 7</span>
          <span className="w-4 h-px bg-gold opacity-40" />
          <span>+41 77 287 09 56</span>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-12 z-10 flex items-center gap-3 font-inter text-muted text-[8px] tracking-[0.22em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <span className="w-7 h-px bg-gold opacity-50" />
        Scroll
      </motion.div>
    </section>
  );
}
