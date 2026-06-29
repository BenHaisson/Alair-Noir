'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const I7_SLIDES = [
  {
    src: '/images/bmw-i7-private-office.png',
    alt: 'BMW i7 rear cabin at night with an executive passenger viewing market data beside a city window',
    label: 'Private Office',
    title: 'Work held in silence.',
    detail: 'A rear cabin prepared for board notes, market screens, calls, and the quiet minutes between hotel, runway, and arrival.',
    featured: true,
  },
  {
    src: '/images/bmw-i7-dashboard-light.png',
    alt: 'BMW i7 crystalline dashboard and passenger door lighting with purple ambient illumination',
    label: 'Ambient Command',
    title: 'Light without spectacle.',
    detail: 'Crystal surfaces, precise controls, and a low night glow create a cabin that feels composed before the route begins.',
    featured: false,
  },
  {
    src: '/images/bmw-i7-rear-theatre.png',
    alt: 'BMW i7 rear passenger cabin with theatre display and violet ambient lighting',
    label: 'Rear Theatre',
    title: 'The cabin becomes a suite.',
    detail: 'The rear display and executive seating turn distance into privacy: watch, prepare, review, or simply disappear from the city.',
    featured: false,
  },
  {
    src: '/images/bmw-i7-executive-lounge.png',
    alt: 'BMW i7 rear cabin viewed from the back seats with illuminated roof and executive lounge seating',
    label: 'Executive Lounge',
    title: 'Electric calm, fully settled.',
    detail: 'An insulated electric platform, reclined passenger space, and a controlled visual field keep the journey deliberately quiet.',
    featured: false,
  },
];

const I7_SIGNALS = ['Fully electric', 'Executive lounge', 'Rear theatre display', 'Private focus'];

const ease = [0.16, 1, 0.3, 1] as const;

export default function BmwI7Presentation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="bmw-i7"
      ref={ref}
      aria-labelledby="bmw-i7-heading"
      style={{
        position: 'relative',
        backgroundColor: '#080808',
        borderTop: '1px solid rgba(214,199,176,0.1)',
        padding: 'clamp(90px,11vw,170px) clamp(20px,6vw,100px)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 78% 18%, rgba(201,168,76,0.12), transparent 28%), linear-gradient(180deg, rgba(10,10,10,0), rgba(14,31,22,0.34) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Desktop: two-column shell (copy + card grid) */}
      <div
        className="i7-shell"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0,0.72fr) minmax(0,1.28fr)',
          gap: 'clamp(40px,6vw,90px)',
          alignItems: 'start',
          maxWidth: '1480px',
          margin: '0 auto',
        }}
      >
        {/* Left: copy */}
        <motion.div
          className="i7-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
          style={{ position: 'sticky', top: '88px' }}
        >
          <p
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
            BMW i7 xDrive60
          </p>

          <h2
            id="bmw-i7-heading"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(48px,6vw,96px)',
              lineHeight: 0.9,
              color: '#EDE8E0',
              marginBottom: '30px',
            }}
          >
            Silence,
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)', paddingLeft: '10%' }}>
              with command.
            </em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '13px',
              lineHeight: 1.9,
              color: 'var(--text-muted)',
              maxWidth: '430px',
              marginBottom: '34px',
            }}
          >
            The BMW i7 is the executive chamber of the collection: electric, insulated, and composed for the moments between boardroom, residence, runway, and evening arrival.
          </p>

          <div
            role="list"
            aria-label="BMW i7 cabin signals"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              borderTop: '1px solid rgba(214,199,176,0.13)',
            }}
          >
            {I7_SIGNALS.map((signal) => (
              <div
                key={signal}
                role="listitem"
                style={{
                  minHeight: '70px',
                  padding: '16px 16px 16px 0',
                  borderBottom: '1px solid rgba(214,199,176,0.13)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(237,232,224,0.38)',
                    marginBottom: '8px',
                  }}
                >
                  i7
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '20px',
                    lineHeight: 1.2,
                    color: 'rgba(237,232,224,0.76)',
                  }}
                >
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: card grid (desktop only) */}
        <div
          className="i7-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '12px',
          }}
        >
          {I7_SLIDES.map((slide, i) => (
            <motion.figure
              key={slide.src}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.14 + i * 0.11 }}
              style={{
                position: 'relative',
                width: '100%',
                minWidth: 0,
                height: slide.featured
                  ? 'clamp(480px,48vw,720px)'
                  : 'calc((clamp(480px,48vw,720px) - 24px) / 3)',
                gridRow: slide.featured ? 'span 3' : 'span 1',
                overflow: 'hidden',
                backgroundColor: '#050505',
                border: '1px solid rgba(201,168,76,0.14)',
                margin: 0,
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={
                  slide.featured
                    ? '(max-width: 900px) 100vw, 48vw'
                    : '(max-width: 900px) 100vw, 28vw'
                }
                className="object-cover"
                style={{ filter: 'saturate(0.9) contrast(1.05)' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(8,8,8,0.82), rgba(8,8,8,0.1) 48%, transparent)',
                }}
              />
              <figcaption
                style={{
                  position: 'absolute',
                  left: 'clamp(16px,2vw,26px)',
                  right: 'clamp(16px,2vw,26px)',
                  bottom: 'clamp(16px,2vw,26px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '12px',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '9px',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: slide.featured ? '10px' : '0',
                    }}
                  >
                    {slide.label}
                  </span>
                  {slide.featured && (
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: 'clamp(28px,3.5vw,52px)',
                        lineHeight: 0.95,
                        color: '#EDE8E0',
                      }}
                    >
                      {slide.title}
                    </strong>
                  )}
                </div>
                {!slide.featured && (
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '10px',
                      lineHeight: 1.5,
                      color: 'rgba(237,232,224,0.52)',
                      maxWidth: '140px',
                      textAlign: 'right',
                    }}
                  >
                    {slide.detail}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: horizontal snap-scroll carousel */}
      <div
        className="i7-carousel-wrapper"
        style={{ display: 'none', marginTop: '32px', position: 'relative', zIndex: 1 }}
      >
        <div className="i7-carousel-track" role="list" aria-label="BMW i7 cabin views">
          {I7_SLIDES.map((slide, i) => (
            <figure
              key={slide.src}
              role="listitem"
              style={{
                flex: '0 0 82vw',
                scrollSnapAlign: 'start',
                position: 'relative',
                height: 'min(64vw, 380px)',
                overflow: 'hidden',
                backgroundColor: '#050505',
                border: '1px solid rgba(201,168,76,0.14)',
                margin: 0,
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="82vw"
                className="object-cover"
                style={{ filter: 'saturate(0.9) contrast(1.05)' }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(8,8,8,0.86), rgba(8,8,8,0.1) 52%, transparent)',
                }}
              />
              <figcaption
                style={{
                  position: 'absolute',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '9px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '8px',
                  }}
                >
                  0{i + 1} / {slide.label}
                </span>
                <strong
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: '30px',
                    lineHeight: 1,
                    color: '#EDE8E0',
                    marginBottom: '8px',
                  }}
                >
                  {slide.title}
                </strong>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 300,
                    fontSize: '11px',
                    lineHeight: 1.7,
                    color: 'rgba(237,232,224,0.66)',
                    margin: 0,
                  }}
                >
                  {slide.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Progress indicators */}
        <div
          aria-hidden="true"
          style={{ display: 'flex', gap: '8px', marginTop: '14px' }}
        >
          {I7_SLIDES.map((slide) => (
            <span
              key={slide.label}
              style={{
                flex: 1,
                height: '1px',
                backgroundColor: 'rgba(237,232,224,0.16)',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .i7-carousel-track {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .i7-carousel-track::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 900px) {
          .i7-shell {
            grid-template-columns: 1fr !important;
          }
          .i7-copy {
            position: relative !important;
            top: auto !important;
          }
          .i7-grid {
            display: none !important;
          }
          .i7-carousel-wrapper {
            display: block !important;
            margin-left: calc(-1 * clamp(20px, 6vw, 100px));
            margin-right: calc(-1 * clamp(20px, 6vw, 100px));
          }
          .i7-carousel-track {
            padding-left: clamp(20px, 6vw, 100px);
            padding-right: clamp(20px, 6vw, 100px);
          }
        }

        @media (min-width: 901px) {
          .i7-carousel-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
