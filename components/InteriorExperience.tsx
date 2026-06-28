'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const INTERIOR_IMAGES = [
  {
    src: '/images/bmw-i7-executive-lounge.png',
    alt: 'Rear cabin of the BMW i7 with executive lounge seating and ambient lighting',
    label: 'Executive Lounge',
    detail: 'Quiet rear cabin for prepared arrivals',
    featured: true,
  },
  {
    src: '/images/bmw-i7-cockpit-night.png',
    alt: 'BMW i7 cockpit at night with illuminated controls',
    label: 'Cockpit',
    detail: 'Digital navigation, climate, and vehicle control',
    featured: false,
  },
  {
    src: '/images/bmw-i7-rear-theatre.png',
    alt: 'BMW i7 rear theatre display and passenger cabin',
    label: 'Rear Theatre',
    detail: 'Entertainment available for long-distance journeys',
    featured: false,
  },
];

const SIGNALS = ['Ambient privacy', 'Executive seating', 'Rear theatre display'];

export default function InteriorExperience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="cabin"
      ref={ref}
      aria-labelledby="cabin-heading"
      style={{
        backgroundColor: '#0D0D0D',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(80px,10vw,150px) clamp(24px,6vw,100px)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,0.72fr) minmax(0,1.28fr)',
          gap: 'clamp(40px,6vw,90px)',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
        className="interior-shell"
      >
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '9px',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '18px',
            }}
          >
            The Cabin
          </motion.p>

          <motion.h2
            id="cabin-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(42px,5.4vw,82px)',
              lineHeight: 0.92,
              color: '#EDE8E0',
              marginBottom: '28px',
            }}
          >
            Built around
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.62)', paddingLeft: '7%' }}>
              the pause.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.24 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '13px',
              lineHeight: 1.85,
              color: 'var(--text-muted)',
              maxWidth: '390px',
              marginBottom: '34px',
            }}
          >
            A quiet interior for the minutes between airport, hotel, meeting, and dinner. Lighting, seating, and media stay calm, precise, and ready for the route.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.36 }}
            role="list"
            style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}
          >
            {SIGNALS.map((signal) => (
              <div
                key={signal}
                role="listitem"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                  }}
                >
                  Included
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                  }}
                >
                  {signal}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '12px',
          }}
          className="interior-grid"
        >
          {INTERIOR_IMAGES.map((image, i) => (
            <motion.figure
              key={image.src}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.14 + i * 0.11 }}
              style={{
                position: 'relative',
                width: '100%',
                minWidth: 0,
                height: image.featured ? 'clamp(420px,45vw,650px)' : 'calc((clamp(420px,45vw,650px) - 12px) / 2)',
                gridRow: image.featured ? 'span 2' : 'span 1',
                overflow: 'hidden',
                backgroundColor: '#090909',
                border: '1px solid rgba(201,168,76,0.12)',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.featured ? '(max-width: 900px) 100vw, 48vw' : '(max-width: 900px) 100vw, 28vw'}
                className="object-cover"
                style={{ filter: 'saturate(0.88) contrast(1.04)' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8,8,8,0.78), rgba(8,8,8,0.1) 48%, transparent)',
                }}
              />
              <figcaption
                style={{
                  position: 'absolute',
                  left: 'clamp(18px,2vw,28px)',
                  right: 'clamp(18px,2vw,28px)',
                  bottom: 'clamp(18px,2vw,28px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '18px',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}
                >
                  {image.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '10px',
                    lineHeight: 1.5,
                    color: 'rgba(237,232,224,0.52)',
                    maxWidth: '180px',
                    textAlign: 'right',
                  }}
                >
                  {image.detail}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .interior-shell {
            grid-template-columns: 1fr !important;
          }
          .interior-grid {
            grid-template-columns: 1fr !important;
          }
          .interior-grid figure {
            grid-row: auto !important;
            width: 100% !important;
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
