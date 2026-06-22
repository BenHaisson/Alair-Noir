'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { luxuryEase } from '@/lib/motion';
import { SplitText } from '@/components/motion/SplitText';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 0.96]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section ref={ref} className="hero hero--switzerland" id="home" style={{ minHeight: '100svh', position: 'relative' }}>
      {/* Video background */}
      <div className="hero-campaign-image" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.95,
            y: videoY,
          }}
          src="/hero-background.mp4"
        />
      </div>

      {/* Floating hero copy */}
      <motion.div
        className="hero-copy"
        style={{ opacity, scale, position: 'relative', zIndex: 1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: luxuryEase, delay: 0.6 }}
        >
          Switzerland &amp; Europe
        </motion.p>

        <h1 style={{ margin: 0, fontSize: 'clamp(52px,7.8vw,112px)', lineHeight: 0.94, letterSpacing: '-0.055em', fontFamily: 'Georgia, Times New Roman, serif', fontWeight: 400 }}>
          <SplitText
            text="Luxury Travel"
            delay={0.75}
            staggerDelay={0.055}
            as="span"
            className="block"
          />
          <SplitText
            text="Across Switzerland"
            delay={0.95}
            staggerDelay={0.045}
            as="span"
            className="block"
            style={{ color: '#21F1A8' }}
          />
        </h1>

        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: luxuryEase, delay: 1.4 }}
        >
          Private mobility, orchestrated with discretion. Airport transfers, corporate
          travel, and bespoke journeys across Switzerland and Europe.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: luxuryEase, delay: 1.65 }}
        >
          <a href="#book" className="button button--gold">Reserve Your Journey</a>
          <a href="#services" className="button button--outline">Explore Services</a>
        </motion.div>
      </motion.div>

      {/* Hero meta */}
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.0 }}
      >
        <span>Zürich Airport</span>
        <i />
        <span>Geneva</span>
        <i />
        <span>St. Moritz</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
      >
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6">
          <rect x="1" y="1" width="12" height="22" rx="6" />
          <motion.line
            x1="7" y1="6" x2="7" y2="10"
            animate={{ y1: [6, 10, 6], y2: [10, 14, 10] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Scroll</span>
      </motion.div>
    </section>
  );
}
