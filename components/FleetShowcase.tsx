'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const VEHICLES = [
  {
    badge: 'Primary Fleet',
    name: 'BMW i7',
    sub: 'xDrive60 · G70',
    type: 'Full Electric',
    plate: 'ZH 992 590',
    hasImage: true,
    specs: [
      ['Interior',     'Anthracite Quilted Leather'],
      ['Trim',         'Burgundy Contrast'],
      ['Package',      'M Aerodynamic'],
      ['Rear Seating', 'Executive Lounge'],
      ['Entertainment','Amazon Fire TV'],
      ['Complimentary','Still Water'],
      ['Certified',    'Tachograph + Limousine Permit'],
    ],
  },
  {
    badge: 'Group & Executive',
    name: 'Mercedes-Benz',
    sub: 'V-Class · Long',
    type: 'Executive Van',
    plate: null,
    hasImage: false,
    specs: [
      ['Seating',      'Up to 7 passengers'],
      ['Configuration','Business Class layout'],
      ['Luggage',      'Generous cargo capacity'],
      ['Use Case',     'Group transfers, delegations'],
      ['Coverage',     'Switzerland & Europe'],
      ['Booking',      'On request'],
    ],
  },
];

export default function FleetShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="fleet"
      ref={ref}
      aria-labelledby="fleet-heading"
      style={{ backgroundColor: '#080808', padding: 'clamp(80px,10vw,160px) 0' }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(28px,8vw,140px)', marginBottom: '64px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '16px',
          }}
        >
          The Fleet
        </motion.p>
        <motion.h2
          id="fleet-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(42px,5.5vw,80px)',
            lineHeight: 0.92, color: '#EDE8E0',
          }}
        >
          Defined by
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.62)', paddingLeft: '6%' }}>
            what you need.
          </em>
        </motion.h2>
      </div>

      {/* Vehicle cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,520px),1fr))' }}>
        {VEHICLES.map((v, i) => (
          <motion.article
            key={v.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
            style={{
              backgroundColor: '#111111',
              borderTop: '1px solid var(--border-gold)',
              borderRight: i === 0 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Image or placeholder */}
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#0F0F0F' }}>
              {v.hasImage ? (
                <>
                  <Image
                    src="/images/bmw-i7-studio.png"
                    alt="BMW i7 xDrive60 — ZH 992 590"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    style={{ filter: 'saturate(0.8) contrast(1.05)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 50%)' }} />
                </>
              ) : (
                <div style={{
                  inset: 0, position: 'absolute',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '12px',
                }}>
                  {/* Mercedes silhouette placeholder */}
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
                    <path d="M4 28 Q40 4 76 28" stroke="rgba(201,168,76,0.2)" strokeWidth="1" fill="none" />
                    <circle cx="40" cy="20" r="12" stroke="rgba(201,168,76,0.15)" strokeWidth="1" fill="none" />
                    <circle cx="40" cy="20" r="1.5" fill="rgba(201,168,76,0.3)" />
                    <path d="M40 8 L40 32 M28 14 L52 26 M52 14 L28 26" stroke="rgba(201,168,76,0.15)" strokeWidth="0.8" />
                  </svg>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: '9px',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                  }}>
                    Available on request
                  </p>
                </div>
              )}
            </div>

            {/* Card content */}
            <div style={{ padding: 'clamp(28px,4vw,48px)', flex: 1 }}>
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '12px',
              }}>
                {v.badge}
              </p>

              <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                  fontSize: 'clamp(32px,3.5vw,50px)', lineHeight: 1,
                  color: '#EDE8E0',
                }}>
                  {v.name}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                  fontSize: 'clamp(18px,2vw,26px)', lineHeight: 1,
                  color: 'var(--text-muted)',
                }}>
                  {v.sub}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-inter)', fontWeight: 300,
                  fontSize: '10px', letterSpacing: '0.14em',
                  color: 'var(--text-subtle)',
                }}>
                  {v.type}
                </span>
                {v.plate && (
                  <>
                    <span style={{ color: 'var(--border-gold)' }}>·</span>
                    <span style={{
                      fontFamily: 'var(--font-inter)', fontWeight: 300,
                      fontSize: '10px', letterSpacing: '0.14em',
                      color: 'var(--text-subtle)',
                    }}>
                      {v.plate}
                    </span>
                  </>
                )}
              </div>

              {/* Specs */}
              <dl style={{ display: 'flex', flexDirection: 'column' }}>
                {v.specs.map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                      gap: '12px', padding: '10px 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <dt style={{
                      fontFamily: 'var(--font-inter)', fontWeight: 300,
                      fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'var(--text-subtle)', flexShrink: 0,
                    }}>
                      {label}
                    </dt>
                    <dd style={{
                      fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                      fontSize: '15px', color: 'var(--text-muted)',
                      textAlign: 'right',
                    }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
