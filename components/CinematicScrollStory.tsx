'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

interface FanCard {
  num: string;
  label: string;
  eyebrow: string;
  heading: string;
  italic: string;
  body: string;
  preview: string;
  image: string;
  imageAlt: string;
}

const CARDS: FanCard[] = [
  {
    num: '01',
    label: 'The Request',
    eyebrow: '01 — The Request',
    heading: 'A private',
    italic: 'request.',
    body: 'A journey begins quietly: one message, one route, one standard of discretion before anything becomes visible.',
    preview: 'Begin a private enquiry',
    image: '/images/chauffeur-arrival.png',
    imageAlt: 'Chauffeur awaiting arrival at dusk',
  },
  {
    num: '02',
    label: 'The Standard',
    eyebrow: '02 — The Standard',
    heading: 'Two vehicles.',
    italic: 'One standard.',
    body: 'The collection is intentionally small: a black BMW i7 and a black Mercedes-Benz V-Class, each maintained for private Swiss mobility.',
    preview: 'View the collection',
    image: '/images/bmw-i7-studio.png',
    imageAlt: 'BMW i7 in a dark studio setting',
  },
  {
    num: '03',
    label: 'The Silence',
    eyebrow: '03 — The Silence',
    heading: 'Silence',
    italic: 'as a luxury.',
    body: 'The BMW i7 xDrive60 is fully electric. No engine noise. No vibration. Just the road and the minutes before arrival.',
    preview: 'Experience the i7',
    image: '/images/bmw-i7-cockpit-night.png',
    imageAlt: 'BMW i7 cockpit at night with ambient lighting',
  },
  {
    num: '04',
    label: 'The Space',
    eyebrow: '04 — The Space',
    heading: 'Executive',
    italic: 'space.',
    body: 'The Mercedes-Benz V-Class creates room for delegations, families, luggage, and airport arrivals without losing privacy.',
    preview: 'Explore the V-Class',
    image: '/images/mercedes-v-class-cabin-rear.png',
    imageAlt: 'Mercedes-Benz V-Class rear cabin executive seating',
  },
  {
    num: '05',
    label: 'The Route',
    eyebrow: '05 — The Route',
    heading: 'Zurich to',
    italic: 'wherever.',
    body: 'Zurich, Geneva, Davos, St. Moritz, Milan, and Munich: routes are handled as private passages, not transfers.',
    preview: 'See the routes',
    image: '/images/bmw-i7-zurich.png',
    imageAlt: 'BMW i7 in Zurich city landscape at night',
  },
  {
    num: '06',
    label: 'The Protocol',
    eyebrow: '06 — The Protocol',
    heading: 'Discretion',
    italic: 'by design.',
    body: 'Punctuality, privacy, controlled handover, and no unnecessary visibility. The service stays precise and nearly invisible.',
    preview: 'Read the protocol',
    image: '/images/bmw-i7-black-studio.png',
    imageAlt: 'BMW i7 in a black studio environment',
  },
  {
    num: '07',
    label: 'The Arrival',
    eyebrow: '07 — The Arrival',
    heading: 'Arrival',
    italic: 'without noise.',
    body: 'Hotel entrance, private aviation terminal, board dinner, or residence: the final moment is calm, direct, and unannounced.',
    preview: 'Plan the arrival',
    image: '/images/bmw-i7-private-office.png',
    imageAlt: 'BMW i7 rear cabin prepared for executive arrival',
  },
  {
    num: '08',
    label: 'The Booking',
    eyebrow: '08 — The Booking',
    heading: 'Reserved',
    italic: 'quietly.',
    body: 'A premium request flow: direct contact, route details, timing, passengers, luggage, and any preference that should be remembered.',
    preview: 'Reserve your passage',
    image: '/images/bmw-i7-dashboard-light.png',
    imageAlt: 'BMW i7 crystal dashboard with ambient lighting',
  },
];

const PER_CARD_VH = 75;                 // scroll distance allotted per card transition
const TOTAL_VH = 100 + (CARDS.length - 1) * PER_CARD_VH;
const AUTOPLAY_MS = 4200;

export default function CinematicScrollStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);

  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { margin: '-20% 0px -20% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const rafRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);
  const autoScrollingRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  /* ── window size ────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => { setWindowWidth(window.innerWidth); setWindowHeight(window.innerHeight); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* ── scroll → active card (drives both mobile & desktop) ── */
  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.round(p * (CARDS.length - 1));
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── detect user interaction (pauses autoplay) ──────────── */
  useEffect(() => {
    const mark = () => {
      if (autoScrollingRef.current) return;
      userInteractingRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => { userInteractingRef.current = false; }, 2600);
    };
    window.addEventListener('wheel', mark, { passive: true });
    window.addEventListener('touchstart', mark, { passive: true });
    window.addEventListener('keydown', mark);
    return () => {
      window.removeEventListener('wheel', mark);
      window.removeEventListener('touchstart', mark);
      window.removeEventListener('keydown', mark);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  /* ── scroll the page so a given card becomes active ─────── */
  const scrollToCard = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const sectionTopAbs = window.scrollY + el.getBoundingClientRect().top;
    const target = sectionTopAbs + (i / (CARDS.length - 1)) * total;
    autoScrollingRef.current = true;
    window.scrollTo({ top: target, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    setTimeout(() => { autoScrollingRef.current = false; }, 800);
  };

  /* ── autoplay (auto-scrolls through cards while pinned) ─── */
  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      if (userInteractingRef.current) return;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return; // only while pinned
      if (activeIndex >= CARDS.length - 1) return;                       // release after last card
      scrollToCard(activeIndex + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [activeIndex, shouldReduceMotion]);

  /* ── keyboard ───────────────────────────────────────────── */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') scrollToCard(Math.max(0, activeIndex - 1));
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') scrollToCard(Math.min(CARDS.length - 1, activeIndex + 1));
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [activeIndex, inView]);

  const handleCardClick = (i: number) => scrollToCard(i);

  /* ── responsive sizing ──────────────────────────────────── */
  const maxNeighbors = isMobile ? 2 : isTablet ? 2 : 3;

  const deskH   = Math.round(Math.max(380, Math.min(isTablet ? 460 : 540, windowHeight * 0.58)));
  const activeW = isMobile ? Math.min(380, windowWidth - 32) : isTablet ? 380 : 460;
  const collW   = isMobile ? Math.min(380, windowWidth - 32) : isTablet ? 58 : 68;
  const activeH = isMobile ? Math.round(Math.max(300, Math.min(360, windowHeight * 0.46))) : deskH;
  const collH   = isMobile ? 50  : deskH;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <section
      ref={outerRef}
      aria-label="Alair Noir experience chapters"
      style={{
        position: 'relative',
        height: `${TOTAL_VH}vh`,
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: 'clamp(18px,3vh,40px)',
        }}
      >
      {/* Ambient background */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle at 50% 54%, rgba(14,31,22,0.5), transparent 52%), ' +
          'radial-gradient(circle at 80% 16%, rgba(212,175,55,0.05), transparent 28%)',
      }} />

      {/* Heading */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          padding: '0 clamp(24px,5vw,60px)', position: 'relative', zIndex: 1, flexShrink: 0,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: '9px', letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px',
        }}>
          The Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontWeight: 300,
          fontSize: 'clamp(34px,4.4vw,68px)', lineHeight: 0.9, color: '#EDE8E0',
        }}>
          Eight moments,
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}> one passage.</em>
        </h2>
      </motion.div>

      {/* 3D fan / accordion */}
      <div
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '0 clamp(16px,4vw,48px)',
          perspective: '1400px', perspectiveOrigin: '50% 48%',
          position: 'relative', zIndex: 1, flexShrink: 0,
        }}
      >
        <div
          role="tablist"
          aria-label="Experience chapters"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center',
            gap: isMobile ? '10px' : 'clamp(5px,0.4vw,9px)',
            width: isMobile ? '100%' : 'auto',
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            const d = Math.abs(index - activeIndex);
            const isVisible = d <= maxNeighbors;

            let rotateY = 0, rotateX = 0, z = 0, y = 0, opacity = 1;
            if (index < activeIndex) {
              if (isMobile) { rotateX = 18 - (d - 1) * 3; z = -20 * d; y = 12 * d; }
              else { rotateY = isVisible ? 10 + (d - 1) * 10 : 45; z = isVisible ? -20 * d : -160; }
              opacity = isVisible ? Math.max(1 - d * 0.15, 0.4) : 0;
            } else if (index > activeIndex) {
              if (isMobile) { rotateX = -(18 - (d - 1) * 3); z = -20 * d; y = -12 * d; }
              else { rotateY = isVisible ? -(10 + (d - 1) * 10) : -45; z = isVisible ? -20 * d : -160; }
              opacity = isVisible ? Math.max(1 - d * 0.15, 0.4) : 0;
            } else {
              z = 44;
            }

            return (
              <motion.div
                key={card.eyebrow}
                role="tab"
                aria-selected={isActive}
                tabIndex={isVisible ? 0 : -1}
                aria-label={`Chapter ${card.num}: ${card.label}`}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(index); }
                }}
                animate={{
                  width:   isVisible ? (isActive ? activeW : collW) : (isMobile ? activeW : 0),
                  height:  isVisible ? (isActive ? activeH : collH) : 0,
                  rotateY: isMobile ? 0 : rotateY,
                  rotateX: isMobile ? rotateX : 0,
                  z, y: isMobile ? y : 0,
                  opacity: isVisible ? opacity : 0,
                }}
                transition={shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 200, damping: 24, mass: 0.85 }}
                className="fan-card"
                style={{
                  position: 'relative', flexShrink: 0, overflow: 'hidden',
                  borderRadius: '12px',
                  border: isActive
                    ? '1.5px solid rgba(212,175,55,0.55)'
                    : '1px solid rgba(255,255,255,0.14)',
                  background: '#0c0c0c',
                  cursor: 'pointer', transformStyle: 'preserve-3d', outline: 'none',
                  boxShadow: isActive
                    ? '0 44px 88px -22px rgba(0,0,0,0.95), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : '0 10px 30px -6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
                <AnimatePresence mode="wait">
                  {/* COLLAPSED */}
                  {!isActive && isVisible && (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                        display: 'flex',
                        flexDirection: isMobile ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isMobile ? '0 18px' : '20px 0 18px',
                      }}
                    >
                      {/* Dim image backdrop (desktop narrow card) */}
                      {!isMobile && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                          <Image src={card.image} alt="" fill sizes="80px"
                            className="object-cover" style={{ filter: 'saturate(0.5) brightness(0.3)' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,12,12,0.4)' }} />
                        </div>
                      )}

                      {isMobile ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{
                              fontFamily: 'var(--font-inter)', fontSize: '9px',
                              letterSpacing: '0.14em', color: 'rgba(246,242,233,0.4)',
                            }}>{card.num}</span>
                            <span style={{
                              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '12px',
                              letterSpacing: '0.16em', textTransform: 'uppercase',
                              color: 'rgba(246,242,233,0.78)',
                            }}>{card.label}</span>
                          </div>
                          <div style={{
                            width: '5px', height: '5px', borderRadius: '50%',
                            background: 'rgba(212,175,55,0.5)',
                          }} />
                        </>
                      ) : (
                        <>
                          <span style={{
                            position: 'relative', zIndex: 1,
                            fontFamily: 'var(--font-inter)', fontSize: '7px',
                            letterSpacing: '0.14em', color: 'rgba(246,242,233,0.4)',
                          }}>{card.num}</span>
                          <span style={{
                            position: 'relative', zIndex: 1,
                            writingMode: 'vertical-rl', textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                            fontFamily: 'var(--font-inter)', fontSize: '8px',
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'rgba(246,242,233,0.5)', whiteSpace: 'nowrap',
                          }}>{card.label}</span>
                          <div style={{
                            position: 'relative', zIndex: 1,
                            width: '4px', height: '4px', borderRadius: '50%',
                            background: 'rgba(212,175,55,0.5)',
                          }} />
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* EXPANDED */}
                  {isActive && (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                    >
                      <CardFace card={card} activeW={activeW} compact={isMobile} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${CARDS[activeIndex].eyebrow}: ${CARDS[activeIndex].body}`}
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '6px',
        position: 'relative', zIndex: 1, flexShrink: 0,
      }}>
        {CARDS.map((card, i) => (
          <button
            key={card.num}
            type="button"
            onClick={() => handleCardClick(i)}
            aria-label={`Chapter ${card.num}: ${card.label}`}
            style={{
              width: i === activeIndex ? '24px' : '6px',
              height: '3px',
              background: i === activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.18)',
              border: 'none', cursor: 'pointer', borderRadius: '2px', padding: 0, flexShrink: 0,
              transition: shouldReduceMotion ? 'none'
                : 'width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Scroll hint (fades out near the end) */}
      <motion.p
        initial={{ opacity: 0.34 }}
        animate={{ opacity: activeIndex >= CARDS.length - 1 ? 0 : 0.34 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-inter)', fontSize: '8px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(246,242,233,0.26)', pointerEvents: 'none',
          position: 'relative', zIndex: 1, flexShrink: 0,
        }}
      >
        Scroll to explore
      </motion.p>

      </div>

      <style>{`
        .fan-card:not([aria-selected="true"]):hover {
          border-color: rgba(255,255,255,0.24) !important;
        }
        .fan-card:focus-visible {
          outline: 1px solid var(--gold) !important;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}

/* ── Expanded card face: image + content (compact = mobile) ── */
function CardFace({ card, activeW, compact }: { card: FanCard; activeW: number; compact: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      borderRadius: '12px', background: '#0c0c0c',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', flex: compact ? '0 0 44%' : '0 0 52%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={card.image} alt={card.imageAlt} fill
            sizes={`${activeW}px`} className="object-cover"
            style={{ filter: 'saturate(0.85) contrast(1.08)' }} />
        </motion.div>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 35%, rgba(12,12,12,0.72) 74%, #0c0c0c 100%)',
        }} />
        <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '8px',
            letterSpacing: '0.16em', color: 'rgba(246,242,233,0.6)',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px', padding: '4px 11px',
          }}>{card.num}&ensp;/&ensp;08</span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: '1 1 auto', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: compact ? '16px 18px 14px' : '20px 22px 18px',
        background: '#0c0c0c', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-6px', bottom: '-18px',
          fontFamily: 'var(--font-cormorant)', fontSize: compact ? '104px' : '128px',
          fontWeight: 300, lineHeight: 1, color: 'rgba(212,175,55,0.06)',
          userSelect: 'none', pointerEvents: 'none',
        }}>{card.num}</div>

        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.8), transparent)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '8px', letterSpacing: '0.26em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px',
          }}>{card.eyebrow}</p>
          <h3 style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: compact ? '30px' : 'clamp(26px,2.6vw,40px)', lineHeight: 0.9,
            color: '#EDE8E0', marginBottom: '10px',
          }}>
            {card.heading}
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.58)' }}>{card.italic}</em>
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: compact ? '11px' : '11.5px', lineHeight: 1.8, color: 'rgba(246,242,233,0.5)',
          }}>{card.body}</p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Preview line */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
          }}>
            <span style={{
              width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: 'var(--gold)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
            }}>✓</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '10.5px',
              color: 'rgba(246,242,233,0.62)', whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{card.preview}</span>
          </div>
          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '7px',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(246,242,233,0.2)',
            }}>Alair Noir</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '7px',
              letterSpacing: '0.12em', color: 'rgba(212,175,55,0.42)',
            }}>{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
