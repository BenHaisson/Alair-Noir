'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const INTERIOR_IMAGES = [
  {
    src: '/images/mercedes-v-class-cabin-side.png',
    alt: 'Mercedes-Benz V-Class rear passenger cabin with black leather seating and warm ceiling light',
    label: 'V-Class Lounge',
    detail: 'Executive space for arrivals, groups, and luggage',
    featured: true,
  },
  {
    src: '/images/mercedes-v-class-cabin-rear.png',
    alt: 'Mercedes-Benz V-Class cabin viewed from the rear with facing passenger rows',
    label: 'Passenger Bay',
    detail: 'Room for delegations and private family travel',
    featured: false,
  },
  {
    src: '/images/mercedes-v-class-cabin-seats.png',
    alt: 'Mercedes-Benz V-Class black leather executive seats at night',
    label: 'Executive Seats',
    detail: 'Upright comfort for airport and event schedules',
    featured: false,
  },
  {
    src: '/images/mercedes-v-class-cockpit.png',
    alt: 'Mercedes-Benz V-Class cockpit and front cabin with warm ambient lighting',
    label: 'Driver Cabin',
    detail: 'Controlled route, timing, and handover',
    featured: false,
  },
];

const FEATURES = [
  { name: 'Business-Class Layout', desc: 'Comfortable executive seating for group transfers and longer routes.' },
  { name: 'Delegation Comfort', desc: 'A composed cabin for corporate teams, guests, and private delegations.' },
  { name: 'Luggage Capacity', desc: 'Prepared for airport arrivals, event transfers, and multi-day journeys.' },
  { name: 'Family Office & Events', desc: 'Discreet movement for families, assistants, guests, and VIP groups.' },
];

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
        backgroundColor: '#0A0A0A',
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
              fontSize: '10.4px',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '18px',
            }}
          >
            V-Class Cabin
          </motion.p>

          <motion.h2
            id="cabin-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(48.7px,5.4vw,95.1px)',
              lineHeight: 0.92,
              color: '#F6F2E9',
              marginBottom: '28px',
            }}
          >
            Space held
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.62)', paddingLeft: '7%' }}>
              quietly.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.24 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '15.1px',
              lineHeight: 1.85,
              color: 'var(--text-muted)',
              maxWidth: '390px',
              marginBottom: '34px',
            }}
          >
            The Mercedes-Benz V-Class brings the same Alair Noir standard to group travel. More space does not mean less discretion. It means every passenger, bag, and schedule is handled with the same calm precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.36 }}
            role="list"
            style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}
          >
            {FEATURES.map((feature) => (
              <div
                key={feature.name}
                role="listitem"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '23.2px',
                    color: '#F6F2E9',
                  }}
                >
                  {feature.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '13.9px',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                  }}
                >
                  {feature.desc}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '42px', padding: '0 26px', marginTop: '32px',
              border: '1px solid rgba(214, 199, 176,0.45)', color: 'var(--gold)',
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11.6px', letterSpacing: '0.20em', textTransform: 'uppercase',
              alignSelf: 'flex-start',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'var(--gold)'; el.style.color = '#0A0A0A'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'transparent'; el.style.color = 'var(--gold)'; }}
          >
            Request the V-Class
          </motion.a>
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
                height: image.featured ? 'clamp(480px,48vw,720px)' : 'calc((clamp(480px,48vw,720px) - 24px) / 3)',
                gridRow: image.featured ? 'span 3' : 'span 1',
                overflow: 'hidden',
                backgroundColor: '#090909',
                border: '1px solid rgba(214, 199, 176,0.12)',
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
                    fontSize: '10.4px',
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
                    fontSize: '11.6px',
                    lineHeight: 1.5,
                    color: 'rgba(246, 242, 233,0.52)',
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
