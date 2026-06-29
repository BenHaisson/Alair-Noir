'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const VEHICLES = [
  {
    badge: 'Electric Executive Sedan',
    name: 'BMW i7',
    sub: 'xDrive60',
    image: '/images/bmw-i7-black-studio.png',
    imageAlt: 'Black BMW i7 xDrive60 in a dark studio setting',
    copy: 'For discreet executive travel, airport transfers, board meetings, and private long-distance journeys. Silent, composed, and prepared for clients who value calm over display.',
    bestFor: 'Executives · ZRH Airport · Private clients · Board meetings · Long-distance travel',
    details: [
      'Fully electric',
      'Executive rear cabin',
      'Rear theatre display',
      'Silent ride quality',
      'Plate: ZH 992 590',
    ],
  },
  {
    badge: 'Executive Group Vehicle',
    name: 'Mercedes-Benz',
    sub: 'V-Class',
    image: '/images/mercedes-v-class-black-studio.png',
    imageAlt: 'Black Mercedes-Benz V-Class in a dark studio setting',
    copy: 'For delegations, family offices, corporate teams, events, luggage-heavy transfers, and group journeys where space must still feel private.',
    bestFor: 'Delegations · Families · Events · Assistants booking for teams · Long-distance group travel',
    details: [
      'Up to 7 passengers',
      'Business-class layout',
      'Generous luggage capacity',
      'Executive group comfort',
      'Ideal for events and delegations',
    ],
  },
];

export default function FleetShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="collection"
      ref={ref}
      aria-labelledby="collection-heading"
      style={{ backgroundColor: 'var(--bg)', padding: 'clamp(80px,10vw,160px) 0' }}
    >
      <div style={{ padding: '0 clamp(28px,8vw,140px)', marginBottom: '64px' }}>
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
            marginBottom: '16px',
          }}
        >
          The Fleet
        </motion.p>
        <motion.h2
          id="collection-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(42px,5.5vw,80px)',
            lineHeight: 0.92,
            color: '#EDE8E0',
            marginBottom: '24px',
          }}
        >
          Two vehicles.
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.62)', paddingLeft: '6%' }}>
            Chosen deliberately.
          </em>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '560px' }}
        >
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '10px',
          }}>
            A limited fleet is not a limitation. It is how every detail stays controlled.
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '13px', lineHeight: 1.8, color: 'var(--text-subtle)',
          }}>
            One electric executive sedan. One business-class V-Class. Both prepared to the same standard.
          </p>
        </motion.div>
      </div>

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
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#0F0F0F' }}>
              <Image
                src={v.image}
                alt={v.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                style={{ filter: 'saturate(0.82) contrast(1.08)' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17,17,17,0.74) 0%, rgba(17,17,17,0.12) 52%, transparent 100%)',
                }}
              />
            </div>

            <div style={{ padding: 'clamp(28px,4vw,48px)', flex: 1 }}>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                  fontSize: '9px',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '12px',
                }}
              >
                {v.badge}
              </p>

              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(32px,3.5vw,50px)',
                    lineHeight: 1,
                    color: '#EDE8E0',
                  }}
                >
                  {v.name}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(18px,2vw,26px)',
                    lineHeight: 1,
                    color: 'var(--text-muted)',
                  }}
                >
                  {v.sub}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '13px', lineHeight: 1.8, color: 'var(--text-muted)',
                marginBottom: '28px',
              }}>
                {v.copy}
              </p>

              {/* Best for */}
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'var(--text-subtle)', marginBottom: '8px',
              }}>
                Best for
              </p>
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: '16px', lineHeight: 1.5, color: 'var(--text-muted)',
                marginBottom: '28px',
              }}>
                {v.bestFor}
              </p>

              {/* Details */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                {v.details.map((detail) => (
                  <li
                    key={detail}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--border)',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '12px',
                      letterSpacing: '0.04em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span aria-hidden="true" style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      backgroundColor: 'var(--gold)', flexShrink: 0,
                    }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
