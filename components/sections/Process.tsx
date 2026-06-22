'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { cardReveal } from '@/lib/motion';

const steps = [
  {
    num: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="4" width="16" height="15" rx="1.5" />
        <path d="M3 9h16M8 2v4M14 2v4" />
      </svg>
    ),
    title: 'Book Online',
    desc: 'Submit your journey details via our secure booking form. Instant confirmation within 15 minutes.',
  },
  {
    num: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="11" cy="8" r="4" />
        <path d="M4 19c0-3.314 3.134-6 7-6s7 2.686 7 6" />
      </svg>
    ),
    title: 'Driver Assigned',
    desc: 'Your personal chauffeur is selected, briefed, and confirmed. You receive their name and photo.',
  },
  {
    num: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M11 3C7.134 3 4 6.134 4 10c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7z" />
        <circle cx="11" cy="10" r="2.5" />
      </svg>
    ),
    title: 'Tracked Journey',
    desc: 'Real-time GPS tracking shared with your team. Your driver monitors flight arrivals automatically.',
  },
  {
    num: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 11l5 5L18 6" />
      </svg>
    ),
    title: 'Arrive in Style',
    desc: 'Step out refreshed. No app required, no surge pricing — just the service you were promised.',
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="booking-journey">
      <div className="section-header" style={{ maxWidth: '100%', marginBottom: 52 }}>
        <Reveal>
          <p className="eyebrow">How It Works</p>
        </Reveal>
        <SplitText
          text="The Alair Noir Experience"
          as="h2"
          delay={0.1}
          staggerDelay={0.04}
        />
      </div>

      <div ref={ref} className="journey-grid">
        {steps.map((step, i) => (
          <motion.article
            key={step.num}
            variants={cardReveal}
            custom={i}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span>{step.num}</span>
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
