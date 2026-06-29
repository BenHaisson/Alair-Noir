'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface FanCard {
  num: string;
  label: string;
  eyebrow: string;
  heading: string;
  italic: string;
  body: string;
  icon: React.ReactNode;
}

const CARDS: FanCard[] = [
  {
    num: '01',
    label: 'The Request',
    eyebrow: '01 — The Request',
    heading: 'A private',
    italic: 'request.',
    body: 'A journey begins quietly: one message, one route, one standard of discretion before anything becomes visible.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="4.5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <path d="M1.5 7l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'The Standard',
    eyebrow: '02 — The Standard',
    heading: 'Two vehicles.',
    italic: 'One standard.',
    body: 'The collection is intentionally small: a black BMW i7 and a black Mercedes-Benz V-Class, each maintained for private Swiss mobility.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L16 7L9 16L2 7Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'The Silence',
    eyebrow: '03 — The Silence',
    heading: 'Silence',
    italic: 'as a luxury.',
    body: 'The BMW i7 xDrive60 is fully electric. No engine noise. No vibration. Just the road and the minutes before arrival.',
    icon: (
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
        <path d="M0 6 Q2.5 0 5 6 Q7.5 12 10 6 Q12.5 0 15 6 Q17.5 12 20 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'The Space',
    eyebrow: '04 — The Space',
    heading: 'Executive',
    italic: 'space.',
    body: 'The Mercedes-Benz V-Class creates room for delegations, families, luggage, and airport arrivals without losing privacy.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="3.5" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <path d="M1 10.5h16M5 10.5v4M13 10.5v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '05',
    label: 'The Route',
    eyebrow: '05 — The Route',
    heading: 'Zurich to',
    italic: 'wherever.',
    body: 'Zurich, Geneva, Davos, St. Moritz, Milan, and Munich: routes are handled as private passages, not transfers.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1" />
        <circle cx="9" cy="7" r="1.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: '06',
    label: 'The Protocol',
    eyebrow: '06 — The Protocol',
    heading: 'Discretion',
    italic: 'by design.',
    body: 'Punctuality, privacy, controlled handover, and no unnecessary visibility. The service stays precise and nearly invisible.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l6 2.5V9c0 3.5-2.5 6.2-6 7-3.5-.8-6-3.5-6-7V4.5L9 2z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: '07',
    label: 'The Arrival',
    eyebrow: '07 — The Arrival',
    heading: 'Arrival',
    italic: 'without noise.',
    body: 'Hotel entrance, private aviation terminal, board dinner, or residence: the final moment is calm, direct, and unannounced.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 14h12M9 3v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M5 8l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '08',
    label: 'The Booking',
    eyebrow: '08 — The Booking Ritual',
    heading: 'Reserved',
    italic: 'quietly.',
    body: 'A premium request flow: direct contact, route details, timing, passengers, luggage, and any preference that should be remembered.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <path d="M2 8h14M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function CinematicScrollStory() {
  const [active, setActive] = useState(4);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || paused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % CARDS.length);
    }, 4200);
    return () => clearInterval(id);
  }, [shouldReduceMotion, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActive((p) => Math.max(0, p - 1));
      if (e.key === 'ArrowRight') setActive((p) => Math.min(CARDS.length - 1, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Alair Noir experience chapters"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'clamp(80px,11vw,160px) 0 clamp(80px,10vw,140px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 60%, rgba(14,31,22,0.5), transparent 52%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.04), transparent 30%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section heading */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(44px,6vw,72px)',
          padding: '0 clamp(24px,5vw,60px)',
          position: 'relative',
          zIndex: 1,
        }}
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
          The Journey
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(44px,6vw,88px)',
            lineHeight: 0.9,
            color: '#EDE8E0',
          }}
        >
          Eight moments,
          <br />
          <em
            style={{
              fontStyle: 'italic',
              color: 'rgba(237,232,224,0.6)',
              paddingLeft: '5%',
            }}
          >
            one passage.
          </em>
        </h2>
      </motion.div>

      {/* Card fan */}
      <motion.div
        className="fan-outer"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.88, delay: 0.18, ease }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          perspective: '1400px',
          perspectiveOrigin: '50% 45%',
          padding: '0 clamp(20px,4vw,60px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          role="tablist"
          aria-label="Experience chapters"
          style={{
            display: 'flex',
            gap: 'clamp(6px,0.55vw,9px)',
            alignItems: 'stretch',
          }}
        >
          {CARDS.map((card, i) => {
            const isActive = i === active;
            const dist = i - active;
            const sign = dist < 0 ? 1 : -1;
            const tilt = isActive
              ? 0
              : sign * Math.min(32, Math.abs(dist) * 13 + 10);

            return (
              <button
                key={card.eyebrow}
                type="button"
                role="tab"
                id={`fan-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`fan-panel-${i}`}
                onClick={() => setActive(i)}
                className={`fan-card${isActive ? ' fan-card--active' : ''}`}
                style={{
                  width: isActive
                    ? 'clamp(280px,26vw,340px)'
                    : 'clamp(44px,4.5vw,58px)',
                  height: 'clamp(320px,36vw,420px)',
                  transform: `rotateY(${shouldReduceMotion ? 0 : tilt}deg)`,
                  transition: shouldReduceMotion
                    ? 'none'
                    : 'width 0.52s cubic-bezier(0.16,1,0.3,1), transform 0.52s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, border-color 0.3s ease',
                  position: 'relative',
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? 'rgba(212,175,55,0.26)' : 'rgba(255,255,255,0.07)'}`,
                  background: isActive
                    ? 'rgba(255,255,255,0.055)'
                    : 'rgba(255,255,255,0.025)',
                  cursor: 'pointer',
                  outline: 'none',
                  textAlign: 'left',
                  padding: 0,
                }}
              >
                {/* Gloss gradient overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 36%, rgba(0,0,0,0.22) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Gold left accent on active card */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '16%',
                      bottom: '16%',
                      width: '1px',
                      background:
                        'linear-gradient(to bottom, transparent, rgba(212,175,55,0.72), transparent)',
                    }}
                  />
                )}

                {/* Collapsed state: rotated label */}
                <div
                  aria-hidden={isActive}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isActive ? 0 : 1,
                    transition: shouldReduceMotion ? 'none' : 'opacity 0.2s ease',
                    pointerEvents: isActive ? 'none' : 'auto',
                  }}
                >
                  <span
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '8px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(246,242,233,0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.num}&nbsp;&nbsp;{card.label}
                  </span>
                </div>

                {/* Expanded state: full content */}
                <div
                  id={`fan-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`fan-tab-${i}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 'clamp(20px,2.4vw,30px)',
                    opacity: isActive ? 1 : 0,
                    transition: shouldReduceMotion
                      ? 'none'
                      : 'opacity 0.28s ease 0.18s',
                    pointerEvents: isActive ? 'auto' : 'none',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 300,
                        fontSize: '8px',
                        letterSpacing: '0.24em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '16px',
                      }}
                    >
                      {card.eyebrow}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: 'clamp(26px,2.8vw,38px)',
                        lineHeight: 0.92,
                        color: '#EDE8E0',
                      }}
                    >
                      {card.heading}
                      <br />
                      <em
                        style={{
                          fontStyle: 'italic',
                          color: 'rgba(237,232,224,0.6)',
                        }}
                      >
                        {card.italic}
                      </em>
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 300,
                      fontSize: '12px',
                      lineHeight: 1.82,
                      color: 'rgba(246,242,233,0.5)',
                    }}
                  >
                    {card.body}
                  </p>

                  <div style={{ color: 'rgba(212,175,55,0.56)', lineHeight: 1 }}>
                    {card.icon}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Progress dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: 'clamp(28px,4vw,44px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {CARDS.map((card, i) => (
          <button
            key={card.num}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Chapter ${card.num}: ${card.label}`}
            style={{
              width: i === active ? '20px' : '5px',
              height: '2px',
              background:
                i === active ? 'var(--gold)' : 'rgba(255,255,255,0.14)',
              border: 'none',
              cursor: 'pointer',
              transition: shouldReduceMotion
                ? 'none'
                : 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
              borderRadius: '1px',
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        .fan-card:not(.fan-card--active):hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .fan-card:focus-visible {
          outline: 1px solid var(--gold);
          outline-offset: 2px;
        }

        @media (max-width: 700px) {
          .fan-outer {
            perspective: none !important;
          }
          .fan-card {
            display: none !important;
          }
          .fan-card--active {
            display: flex !important;
            width: calc(100vw - clamp(40px, 8vw, 80px)) !important;
            height: clamp(320px, 80vw, 460px) !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
