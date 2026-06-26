'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stages = [
  {
    n: '01', label: 'Arrival',
    heading: ['We meet you', 'at the gate.'],
    body: 'Your chauffeur tracks your flight in real time and is waiting before you reach arrivals — discreet sign, no fuss.',
  },
  {
    n: '02', label: 'The Cabin',
    heading: ['Your private', 'space begins.'],
    body: 'Cold water, silence, preferred temperature, preferred music — or none at all. The cabin is yours from the first second.',
  },
  {
    n: '03', label: 'Privacy',
    heading: ['What happens', 'in the car—'],
    body: 'Conversations, calls, documents. We never repeat, never report. Our professional discretion is absolute.',
  },
  {
    n: '04', label: 'Destination',
    heading: ['Delivered', 'perfectly.'],
    body: 'Door-to-door, on time, composed. Whether you need 3 minutes of silence or the whole journey to prepare.',
  },
];

function Stage({ s, i }: { s: typeof stages[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isRight = i % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row ${isRight ? 'md:flex-row-reverse' : ''}`}
      style={{ minHeight: '50vh', borderBottom: '1px solid var(--border-light)' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Color block (image placeholder) */}
      <div
        className="flex-1 relative flex items-end p-8 md:p-12"
        style={{
          background: i % 2 === 0
            ? 'linear-gradient(135deg, #1C1A18 0%, #2A2724 100%)'
            : 'linear-gradient(135deg, #111110 0%, #1C1A18 100%)',
          minHeight: '40vw',
        }}
      >
        {/* Platinum shimmer */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: 'linear-gradient(135deg, #E8E4DC, transparent 60%)' }}
        />
        <motion.p
          className="relative font-inter text-gold text-[8px] tracking-[0.26em] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {s.label}
        </motion.p>
      </div>

      {/* Text block */}
      <div
        className="flex-1 flex items-center"
        style={{ background: 'var(--parchment)' }}
      >
        <div className="p-10 md:p-14 lg:p-20 max-w-[500px]">
          <motion.p
            className="font-inter text-gold text-[9px] tracking-[0.28em] uppercase mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {s.n} — {s.label}
          </motion.p>
          <motion.h3
            className="font-cormorant font-light tracking-[-0.04em] leading-[0.96] mb-7"
            style={{ fontSize: 'clamp(36px, 3.8vw, 58px)', color: 'var(--graphite)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {s.heading[0]}
            <br />
            <em className="italic" style={{ color: 'var(--slate)' }}>{s.heading[1]}</em>
          </motion.h3>
          <motion.p
            className="font-inter font-light leading-[1.78] max-w-[360px]"
            style={{ fontSize: '14px', color: 'var(--slate)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.32 }}
          >
            {s.body}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="journey"
      style={{ background: 'var(--parchment)', borderTop: '1px solid var(--border-light)' }}
    >
      {/* Section header */}
      <div ref={ref} className="an-container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-inter text-gold text-[9px] tracking-[0.28em] uppercase mb-5 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-gold opacity-60" />
            The Journey
          </p>
          <h2
            className="font-cormorant font-light tracking-[-0.04em] leading-[0.94] max-w-[580px]"
            style={{ fontSize: 'clamp(40px, 4.8vw, 72px)', color: 'var(--graphite)' }}
          >
            From departure
            <br />
            <em className="italic" style={{ color: 'var(--slate)' }}>to destination.</em>
          </h2>
        </motion.div>
      </div>

      {/* Stages */}
      <div style={{ borderTop: '1px solid var(--border-light)' }}>
        {stages.map((s, i) => (
          <Stage key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
