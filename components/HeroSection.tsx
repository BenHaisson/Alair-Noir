'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Hero3DScene from './Hero3DScene';

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 92]);
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.04, 1]);
  const copyY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -34]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.72]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Full-bleed background image ── */}
      <motion.div style={{ position: 'absolute', inset: '-7% 0 -3%', y: imageY, scale: imageScale }} aria-hidden="true">
        <Image
          src="/images/bmw-i7-zurich.png"
          alt="BMW i7 xDrive60 on Zurich lakeside boulevard"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: 'brightness(0.72) saturate(0.9)' }}
        />
        {/* Bottom vignette — keeps text legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.45) 38%, rgba(8,8,8,0.08) 65%, transparent 100%)',
        }} />
        {/* Top bar for nav legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 20%)',
        }} />
      </motion.div>

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.42 }}
          transition={{ duration: 1.5, delay: 0.35, ease }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        >
          <Hero3DScene />
        </motion.div>
      )}

      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.75, ease }}
        style={{
          position: 'absolute',
          left: 'clamp(24px,6vw,100px)',
          right: 'clamp(24px,6vw,100px)',
          bottom: 'clamp(126px,10vw,174px)',
          zIndex: 2,
          height: '1px',
          transformOrigin: 'left',
          background:
            'linear-gradient(90deg, rgba(214, 199, 176,0.72), rgba(214, 199, 176,0.12) 46%, rgba(246, 242, 233,0))',
        }}
      />

      {/* ── Hero copy — stacks at bottom ── */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
      >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(80px,12vw,160px) clamp(24px,6vw,100px) clamp(48px,6vw,80px)',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            marginBottom: 'clamp(20px,3vw,32px)',
          }}
        >
          <span style={{ display: 'block', width: '28px', height: '1px', backgroundColor: 'var(--gold)', opacity: 0.7 }} />
          <span style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: 'clamp(10.4px,0.65vw,12.8px)', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            Zürich · Switzerland · Est. 2024
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.28, ease }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(51px,6.6vw,120.6px)',
            lineHeight: 0.92,
            color: '#F6F2E9',
            maxWidth: '900px',
            marginBottom: 'clamp(14px,1.8vw,22px)',
          }}
        >
          Private Chauffeur Service
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.68)', paddingLeft: '0.12em' }}>
            in Zürich.
          </em>
        </motion.h1>

        {/* Poetic line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(23.2px,2.4vw,39.4px)', lineHeight: 1.1,
            color: 'rgba(246, 242, 233,0.55)',
            marginBottom: 'clamp(20px,2.5vw,32px)',
          }}
        >
          The art of arrival.
        </motion.p>

        {/* Subline + CTAs row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.55, ease }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          {/* Sub text */}
          <div style={{ maxWidth: '430px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: 'clamp(13.9px,1vw,16.2px)', letterSpacing: '0.04em',
              color: 'rgba(246, 242, 233,0.52)',
              lineHeight: 1.7, marginBottom: '14px',
            }}>
              BMW i7 xDrive60 and Mercedes-Benz V-Class for private, corporate, airport, and long-distance travel across Switzerland and Europe.
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: 'clamp(10.4px,0.7vw,12.8px)', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Direct booking. No platform. No intermediary.
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '44px', padding: '0 28px',
                backgroundColor: 'var(--gold)', color: '#0A0A0A',
                fontFamily: 'var(--font-inter)', fontWeight: 400,
                fontSize: 'clamp(10.4px,0.65vw,11.6px)', letterSpacing: '0.22em', textTransform: 'uppercase',
                transition: 'opacity 0.25s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Reserve a Journey
            </a>
            <a
              href="https://wa.me/41772870956"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '44px', padding: '0 28px',
                border: '1px solid rgba(246, 242, 233,0.22)', color: '#F6F2E9',
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: 'clamp(10.4px,0.65vw,11.6px)', letterSpacing: '0.22em', textTransform: 'uppercase',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(246, 242, 233,0.6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(246, 242, 233,0.22)')}
            >
              WhatsApp Directly
            </a>
          </div>
        </motion.div>

        {/* Support line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            marginTop: 'clamp(20px,2.5vw,28px)',
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: 'clamp(11.6px,0.8vw,13.9px)', letterSpacing: '0.03em',
            color: 'rgba(246, 242, 233,0.4)', lineHeight: 1.7, maxWidth: '520px',
          }}
        >
          Your reservation goes straight to your driver — no dispatch layer, no anonymous assignment.
        </motion.p>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          style={{
            marginTop: 'clamp(36px,4vw,56px)',
            paddingTop: 'clamp(20px,2.5vw,28px)',
            borderTop: '1px solid rgba(246, 242, 233,0.10)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(24px,4vw,60px)',
          }}
        >
          {[
            { n: '24 / 7', label: 'Availability' },
            { n: '2', label: 'Vehicle Collection' },
            { n: 'ZRH', label: 'Based in Zürich' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: 'clamp(25.5px,2.2vw,37.1px)', lineHeight: 1,
                color: '#F6F2E9', marginBottom: '4px',
              }}>{n}</p>
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: 'clamp(9.3px,0.6vw,10.4px)', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(246, 242, 233,0.40)',
              }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        style={{
          position: 'absolute', bottom: 'clamp(20px,3vw,36px)', right: 'clamp(24px,6vw,100px)',
          display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.span
          animate={{ scaleY: [1, 1.6, 1], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'block', width: '1px', height: '32px',
            backgroundColor: 'var(--gold)', transformOrigin: 'top',
          }}
        />
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '9.3px',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(246, 242, 233,0.35)',
        }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
