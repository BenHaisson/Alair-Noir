'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const I7_SLIDES = [
  {
    src: '/images/bmw-i7-private-office.png',
    alt: 'BMW i7 rear cabin at night with an executive passenger viewing market data beside a city window',
    label: 'Private Office',
    title: 'Work held in silence.',
    detail: 'A rear cabin prepared for board notes, market screens, calls, and the quiet minutes between hotel, runway, and arrival.',
  },
  {
    src: '/images/bmw-i7-dashboard-light.png',
    alt: 'BMW i7 crystalline dashboard and passenger door lighting with purple ambient illumination',
    label: 'Ambient Command',
    title: 'Light without spectacle.',
    detail: 'Crystal surfaces, precise controls, and a low night glow create a cabin that feels composed before the route begins.',
  },
  {
    src: '/images/bmw-i7-rear-theatre.png',
    alt: 'BMW i7 rear passenger cabin with theatre display and violet ambient lighting',
    label: 'Rear Theatre',
    title: 'The cabin becomes a suite.',
    detail: 'The rear display and executive seating turn distance into privacy: watch, prepare, review, or simply disappear from the city.',
  },
  {
    src: '/images/bmw-i7-executive-lounge.png',
    alt: 'BMW i7 rear cabin viewed from the back seats with illuminated roof and executive lounge seating',
    label: 'Executive Lounge',
    title: 'Electric calm, fully settled.',
    detail: 'An insulated electric platform, reclined passenger space, and a controlled visual field keep the journey deliberately quiet.',
  },
];

const I7_SIGNALS = ['Fully electric', 'Executive lounge', 'Rear theatre display', 'Private focus'];

const ease = [0.16, 1, 0.3, 1] as const;

export default function BmwI7Presentation() {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lastSlideRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (shouldReduceMotion || !window.matchMedia('(min-width: 901px)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: '+=320%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1.15,
        anticipatePin: 1,
        onUpdate: (self) => {
          const nextSlide = Math.min(I7_SLIDES.length - 1, Math.floor(self.progress * I7_SLIDES.length));

          if (nextSlide !== lastSlideRef.current) {
            lastSlideRef.current = nextSlide;
            setActiveSlide(nextSlide);
          }

          gsap.set(progressRef.current, { scaleX: self.progress });
        },
      });

      scrollTriggerRef.current = trigger;
    }, ref);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  const current = I7_SLIDES[activeSlide];

  const selectSlide = (index: number) => {
    setActiveSlide(index);
    lastSlideRef.current = index;

    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const progress = index / Math.max(1, I7_SLIDES.length - 1);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="bmw-i7"
      ref={ref}
      aria-labelledby="bmw-i7-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
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

      <div
        ref={pinRef}
        className="i7-pin"
        style={{
          minHeight: shouldReduceMotion ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="i7-shell"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'minmax(300px,0.78fr) minmax(0,1.22fr)',
            gap: 'clamp(44px,6vw,88px)',
            alignItems: 'start',
            maxWidth: '1480px',
            margin: '0 auto',
          }}
        >
          <motion.div
            className="i7-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease }}
            style={{ position: 'sticky', top: '118px' }}
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
                marginBottom: '36px',
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

            <div role="tablist" aria-label="BMW i7 presentation chapters" className="i7-tabs">
              {I7_SLIDES.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === index}
                  aria-controls="bmw-i7-panel"
                  onClick={() => selectSlide(index)}
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '34px 1fr',
                    alignItems: 'center',
                    gap: '14px',
                    textAlign: 'left',
                    padding: '14px 0',
                    border: 0,
                    borderTop: index === 0 ? '1px solid rgba(214,199,176,0.13)' : 0,
                    borderBottom: '1px solid rgba(214,199,176,0.13)',
                    backgroundColor: 'transparent',
                    color: activeSlide === index ? '#EDE8E0' : 'rgba(237,232,224,0.46)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      color: activeSlide === index ? 'var(--gold)' : 'rgba(237,232,224,0.3)',
                    }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {slide.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="i7-desktop-stage"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            style={{ minWidth: 0 }}
          >
            <div
              id="bmw-i7-panel"
              role="tabpanel"
              aria-live="polite"
              style={{
                position: 'relative',
                minHeight: 'clamp(520px,57vw,760px)',
                overflow: 'hidden',
                backgroundColor: '#050505',
                border: '1px solid rgba(201,168,76,0.14)',
              }}
            >
              <motion.figure
                key={current.src}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.72, ease }}
                style={{ position: 'absolute', inset: 0, margin: 0 }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  priority={activeSlide === 0}
                  sizes="(max-width: 900px) 100vw, 62vw"
                  className="object-cover"
                  style={{ filter: 'saturate(0.9) contrast(1.05)' }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(8,8,8,0.62), rgba(8,8,8,0.08) 42%, rgba(8,8,8,0.44)), linear-gradient(to top, rgba(8,8,8,0.82), transparent 48%)',
                  }}
                />
                <figcaption
                  className="i7-caption"
                  style={{
                    position: 'absolute',
                    left: 'clamp(20px,3vw,42px)',
                    right: 'clamp(20px,3vw,42px)',
                    bottom: 'clamp(22px,3vw,42px)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,0.62fr) minmax(220px,0.38fr)',
                    gap: 'clamp(18px,4vw,54px)',
                    alignItems: 'end',
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
                        marginBottom: '12px',
                      }}
                    >
                      {current.label}
                    </span>
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: 'clamp(32px,4vw,62px)',
                        lineHeight: 0.95,
                        color: '#EDE8E0',
                      }}
                    >
                      {current.title}
                    </strong>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '12px',
                      lineHeight: 1.8,
                      color: 'rgba(237,232,224,0.66)',
                      margin: 0,
                    }}
                  >
                    {current.detail}
                  </p>
                </figcaption>
              </motion.figure>
            </div>

            <div
              aria-hidden="true"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${I7_SLIDES.length}, 1fr)`,
                gap: '10px',
                marginTop: '14px',
              }}
            >
              {I7_SLIDES.map((slide, index) => (
                <span
                  key={slide.label}
                  style={{
                    height: '2px',
                    backgroundColor: activeSlide === index ? 'var(--gold)' : 'rgba(237,232,224,0.16)',
                    transition: shouldReduceMotion ? 'none' : 'background-color 0.5s ease',
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="i7-mobile-stack" aria-label="BMW i7 mobile presentation chapters">
            {I7_SLIDES.map((slide, index) => (
              <figure
                key={slide.src}
                style={{
                  margin: 0,
                  overflow: 'hidden',
                  border: '1px solid rgba(201,168,76,0.14)',
                  backgroundColor: '#050505',
                }}
              >
                <div style={{ position: 'relative', minHeight: '320px' }}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ filter: 'saturate(0.9) contrast(1.05)' }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(8,8,8,0.86), rgba(8,8,8,0.08) 58%)',
                    }}
                  />
                  <figcaption
                    style={{
                      position: 'absolute',
                      left: '22px',
                      right: '22px',
                      bottom: '24px',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 300,
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '10px',
                      }}
                    >
                      0{index + 1} / {slide.label}
                    </span>
                    <strong
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: '34px',
                        lineHeight: 1,
                        color: '#EDE8E0',
                        marginBottom: '12px',
                      }}
                    >
                      {slide.title}
                    </strong>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 300,
                        fontSize: '12px',
                        lineHeight: 1.7,
                        color: 'rgba(237,232,224,0.66)',
                        margin: 0,
                      }}
                    >
                      {slide.detail}
                    </p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <span
          ref={progressRef}
          aria-hidden="true"
          className="i7-scroll-progress"
          style={{
            position: 'absolute',
            left: 'clamp(20px,6vw,100px)',
            right: 'clamp(20px,6vw,100px)',
            bottom: 'clamp(28px,4vw,52px)',
            height: '1px',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
            background: 'linear-gradient(90deg, rgba(212,175,55,0.16), rgba(212,175,55,0.92), rgba(246,242,233,0.44))',
          }}
        />
      </div>

      <style>{`
        .i7-tabs button:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 4px;
        }

        @media (max-width: 900px) {
          .i7-pin {
            min-height: auto !important;
            display: block !important;
          }

          .i7-shell {
            grid-template-columns: 1fr !important;
          }

          .i7-copy {
            position: relative !important;
            top: auto !important;
          }

          .i7-tabs,
          .i7-desktop-stage,
          .i7-scroll-progress {
            display: none !important;
          }

          .i7-mobile-stack {
            display: grid !important;
            gap: 14px;
          }

          #bmw-i7-panel {
            min-height: 420px !important;
          }

          .i7-caption {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          #bmw-i7-panel {
            min-height: 360px !important;
          }
        }

        @media (min-width: 901px) {
          .i7-mobile-stack {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
