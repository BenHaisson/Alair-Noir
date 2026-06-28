'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: '#080808',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── 3D particle canvas ── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <Hero3DScene />
      </div>

      {/* ── BMW i7 image — right side ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '58%',
          zIndex: 1,
        }}
      >
        <Image
          src="/images/bmw-i7-zurich.png"
          alt="BMW i7 xDrive60 driving alongside Lake Zurich on a bright day"
          fill
          priority
          sizes="58vw"
          className="object-cover object-center"
        />
        {/* Left gradient fade */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #080808 0%, rgba(8,8,8,0.75) 28%, rgba(8,8,8,0.25) 65%, transparent 100%)',
          }}
        />
        {/* Bottom darkener */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          width: '100%',
          padding: '120px clamp(28px, 8vw, 140px) 80px',
        }}
      >
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ marginBottom: '36px' }}
        >
          <Logo variant="full" animate color="#EDE8E0" accentColor="#C9A84C" height={160} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '28px',
          }}
        >
          Zürich · Switzerland · Est. 2024
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.38 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(62px, 9.5vw, 138px)',
            lineHeight: 0.88,
            color: '#EDE8E0',
            maxWidth: '700px',
          }}
        >
          The art
          <br />
          <em style={{ fontStyle: 'italic', paddingLeft: '9%', color: 'rgba(237,232,224,0.72)' }}>
            of arrival.
          </em>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '12px', letterSpacing: '0.09em',
            color: 'var(--text-muted)',
            margin: '36px 0 44px', maxWidth: '400px', lineHeight: 1.7,
          }}
        >
          BMW i7 xDrive60 · Mercedes-Benz V-Class
          <br />
          Private &amp; Corporate · Switzerland &amp; Europe
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}
        >
          <a
            href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '48px', padding: '0 32px',
              backgroundColor: 'var(--gold)', color: '#080808',
              fontFamily: 'var(--font-inter)', fontWeight: 400,
              fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold-bright)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)')}
          >
            Reserve a Journey
          </a>
          <a
            href="https://wa.me/41772870956"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '48px', padding: '0 32px',
              border: '1px solid rgba(201,168,76,0.3)', color: 'var(--text)',
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)')}
          >
            WhatsApp
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            position: 'absolute',
            bottom: '36px',
            left: 'clamp(28px, 8vw, 140px)',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}
        >
          <motion.span
            animate={{ scaleY: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'block', width: '1px', height: '36px',
              backgroundColor: 'var(--gold)',
              transformOrigin: 'top',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '8px',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--text-subtle)',
          }}>
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
