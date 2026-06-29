'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="20" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <path d="M2 8h14M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TOTAL_MS = 4200;
const STEP_MS = 40;
const MAX_NEIGHBORS = 3;
const DRAG_THRESHOLD = 48;

export default function CinematicScrollStory() {
  const [active, setActive] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelThrottleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProg = useRef(false); // prevent feedback loop on mobile

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  /* ── window resize ──────────────────────────────────────── */
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const fn = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* ── keyboard ───────────────────────────────────────────── */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); }
      if (e.key === 'ArrowRight') { setActive((p) => (p + 1) % CARDS.length); setProgress(0); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  /* ── autoplay (desktop only, pauses on hover) ───────────── */
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    if (!isMobile && !isHovered && !shouldReduceMotion) {
      let elapsed = 0;
      progressRef.current = setInterval(() => {
        elapsed += STEP_MS;
        setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100));
      }, STEP_MS);
      timerRef.current = setInterval(() => {
        setActive((p) => (p + 1) % CARDS.length);
        setProgress(0);
        elapsed = 0;
      }, TOTAL_MS);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isMobile, isHovered, active, shouldReduceMotion]);

  /* ── mobile: scroll carousel to active card ─────────────── */
  useEffect(() => {
    if (!isMobile || !carouselRef.current || isScrollingProg.current) return;
    const el = carouselRef.current;
    const cardW = el.clientWidth * 0.84 + 12;
    isScrollingProg.current = true;
    el.scrollTo({ left: active * cardW, behavior: 'smooth' });
    setTimeout(() => { isScrollingProg.current = false; }, 600);
  }, [active, isMobile]);

  /* ── mobile: detect active card from scroll position ────── */
  const handleCarouselScroll = () => {
    if (isScrollingProg.current || !carouselRef.current) return;
    const el = carouselRef.current;
    const cardW = el.clientWidth * 0.84 + 12;
    const idx = Math.round(el.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(CARDS.length - 1, idx)));
  };

  /* ── navigate helpers ───────────────────────────────────── */
  const handleCardClick = (i: number) => { if (!isDragging) { setActive(i); setProgress(0); } };
  const handleNext = () => { setActive((p) => (p + 1) % CARDS.length); setProgress(0); };
  const handlePrev = () => { setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); };

  /* ── mouse drag (desktop) ───────────────────────────────── */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setDragStartX(e.clientX);
    setIsDragging(false);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null || e.pointerType === 'touch') return;
    if (Math.abs(e.clientX - dragStartX) > 8) setIsDragging(true);
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null || e.pointerType === 'touch') return;
    const delta = e.clientX - dragStartX;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      delta < 0 ? handleNext() : handlePrev();
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  /* ── wheel / trackpad scroll (desktop) ─────────────────── */
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelThrottleRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 30) return;
    delta > 0 ? handleNext() : handlePrev();
    wheelThrottleRef.current = setTimeout(() => { wheelThrottleRef.current = null; }, 700);
  };

  /* ── sizing ─────────────────────────────────────────────── */
  const activeW = isTablet ? 300 : 340;
  const collW   = isTablet ? 50  : 58;
  const cardH   = isTablet ? 360 : 400;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      aria-label="Alair Noir experience chapters"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--bg)',
        padding: 'clamp(64px,9vw,128px) 0 clamp(72px,10vw,140px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 58%, rgba(14,31,22,0.58), transparent 55%), ' +
            'radial-gradient(circle at 80% 16%, rgba(212,175,55,0.05), transparent 28%)',
        }}
      />

      {/* ── Section heading ─────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(36px,5vw,64px)',
          padding: '0 clamp(24px,5vw,60px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 300,
          fontSize: '9px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '18px',
        }}>
          The Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(42px,5.6vw,84px)',
          lineHeight: 0.9,
          color: '#EDE8E0',
        }}>
          Eight moments,
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)', paddingLeft: '5%' }}>
            one passage.
          </em>
        </h2>
      </motion.div>

      {/* ── DESKTOP 3D fan ──────────────────────────────────── */}
      {!isMobile && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 clamp(16px,3vw,48px)',
            perspective: '1200px',
            position: 'relative',
            zIndex: 1,
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        >
          <div
            role="tablist"
            aria-label="Experience chapters"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(6px,0.5vw,10px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {CARDS.map((card, i) => {
              const isActive = i === active;
              const isVisible = Math.abs(i - active) <= MAX_NEIGHBORS;
              const diff_l = active - i; // positive when i is to the LEFT
              const diff_r = i - active; // positive when i is to the RIGHT

              let rotateY = 0, z = 0, opacity = 1;

              if (i < active) {
                rotateY = isVisible ? 10 + (diff_l - 1) * 10 : 45;
                z       = isVisible ? -20 * diff_l          : -150;
                opacity = isVisible ? Math.max(1 - diff_l * 0.15, 0.38) : 0;
              } else if (i > active) {
                rotateY = isVisible ? -(10 + (diff_r - 1) * 10) : -45;
                z       = isVisible ? -20 * diff_r               : -150;
                opacity = isVisible ? Math.max(1 - diff_r * 0.15, 0.38) : 0;
              } else {
                z = 40;
              }

              return (
                <motion.div
                  key={card.eyebrow}
                  role="tab"
                  id={`fan-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`fan-panel-${i}`}
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`Chapter ${card.num}: ${card.label}`}
                  onClick={() => handleCardClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(i); }
                  }}
                  animate={{
                    width:   isVisible ? (isActive ? activeW : collW) : 0,
                    height:  isVisible ? cardH : 0,
                    rotateY: rotateY,
                    z:       z,
                    opacity: isVisible ? opacity : 0,
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 140, damping: 18, mass: 0.9 }
                  }
                  className="fan-card"
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: isActive
                      ? '1px solid rgba(212,175,55,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                    background: isActive
                      ? 'rgba(255,255,255,0.058)'
                      : 'rgba(255,255,255,0.022)',
                    backgroundImage: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
                    cursor: 'inherit',
                    transformStyle: 'preserve-3d',
                    outline: 'none',
                    boxShadow: isActive
                      ? '0 32px 72px -16px rgba(0,0,0,0.9), 0 0 0 0 transparent'
                      : '0 8px 24px -4px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Gold left accent — active only */}
                  {isActive && (
                    <div aria-hidden="true" style={{
                      position: 'absolute', left: 0, top: '12%', bottom: '12%', width: '1px',
                      background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.8), transparent)',
                      zIndex: 2,
                    }} />
                  )}

                  {/* Gloss gradient */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(170deg, rgba(255,255,255,0.07) 0%, transparent 42%, rgba(0,0,0,0.18) 100%)',
                  }} />

                  <AnimatePresence mode="wait">
                    {/* COLLAPSED */}
                    {!isActive && isVisible && (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'space-between',
                          padding: '22px 0 20px',
                          pointerEvents: 'none',
                        }}
                      >
                        {/* Number */}
                        <span style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '8px',
                          letterSpacing: '0.16em',
                          color: 'rgba(246,242,233,0.24)',
                        }}>
                          {card.num}
                        </span>

                        {/* Vertical label */}
                        <span style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          fontFamily: 'var(--font-inter)',
                          fontSize: '8px',
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: 'rgba(246,242,233,0.28)',
                          whiteSpace: 'nowrap',
                          userSelect: 'none',
                        }}>
                          {card.label}
                        </span>

                        {/* Gold dot */}
                        <div style={{
                          width: '4px', height: '4px',
                          borderRadius: '50%',
                          background: 'rgba(212,175,55,0.36)',
                        }} />
                      </motion.div>
                    )}

                    {/* EXPANDED */}
                    {isActive && (
                      <motion.div
                        key="expanded"
                        role="tabpanel"
                        id={`fan-panel-${i}`}
                        aria-labelledby={`fan-tab-${i}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.3, delay: 0.07, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '26px 24px 22px',
                          zIndex: 10, outline: 'none',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Large watermark number */}
                        <div aria-hidden="true" style={{
                          position: 'absolute',
                          right: '-6px', top: '-14px',
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: '148px',
                          fontWeight: 300,
                          lineHeight: 1,
                          color: 'rgba(212,175,55,0.07)',
                          userSelect: 'none',
                          pointerEvents: 'none',
                          zIndex: 0,
                        }}>
                          {card.num}
                        </div>

                        {/* Top section */}
                        <div style={{ position: 'relative', zIndex: 1 }}>
                          {/* Counter badge */}
                          <div style={{ marginBottom: '16px' }}>
                            <span style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '8px',
                              letterSpacing: '0.18em',
                              color: 'rgba(246,242,233,0.28)',
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '999px',
                              padding: '3px 10px',
                            }}>
                              {card.num}&ensp;/&ensp;08
                            </span>
                          </div>

                          {/* Gold eyebrow */}
                          <p style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 300,
                            fontSize: '8px',
                            letterSpacing: '0.26em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            marginBottom: '12px',
                          }}>
                            {card.eyebrow}
                          </p>

                          {/* Heading */}
                          <h3 style={{
                            fontFamily: 'var(--font-cormorant)',
                            fontWeight: 300,
                            fontSize: 'clamp(26px,2.8vw,38px)',
                            lineHeight: 0.9,
                            color: '#EDE8E0',
                          }}>
                            {card.heading}
                            <br />
                            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.58)' }}>
                              {card.italic}
                            </em>
                          </h3>
                        </div>

                        {/* Body */}
                        <p style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 300,
                          fontSize: '11.5px',
                          lineHeight: 1.84,
                          color: 'rgba(246,242,233,0.46)',
                          position: 'relative',
                          zIndex: 1,
                        }}>
                          {card.body}
                        </p>

                        {/* Footer */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '14px',
                          borderTop: '1px solid rgba(255,255,255,0.07)',
                          position: 'relative',
                          zIndex: 1,
                        }}>
                          <div style={{ color: 'rgba(212,175,55,0.62)' }}>{card.icon}</div>
                          <span style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '7px',
                            letterSpacing: '0.24em',
                            textTransform: 'uppercase',
                            color: 'rgba(246,242,233,0.18)',
                          }}>
                            Alair Noir
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── MOBILE horizontal snap carousel ─────────────────── */}
      {isMobile && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="mobile-carousel"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              gap: '12px',
              paddingLeft: 'calc(8vw)',
              paddingRight: 'calc(8vw)',
            }}
          >
            {CARDS.map((card, i) => {
              const isActive = i === active;
              return (
                <div
                  key={card.eyebrow}
                  onClick={() => handleCardClick(i)}
                  style={{
                    flex: '0 0 84vw',
                    maxWidth: '360px',
                    height: '380px',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: isActive
                      ? '1px solid rgba(212,175,55,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                    background: isActive
                      ? 'rgba(255,255,255,0.058)'
                      : 'rgba(255,255,255,0.022)',
                    backgroundImage: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
                    transition: 'border-color 0.4s ease, background 0.4s ease',
                    cursor: 'pointer',
                  }}
                >
                  {/* Gold left accent — active */}
                  {isActive && (
                    <div aria-hidden="true" style={{
                      position: 'absolute', left: 0, top: '12%', bottom: '12%', width: '1px',
                      background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.8), transparent)',
                    }} />
                  )}

                  {/* Gloss */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(170deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.16) 100%)',
                  }} />

                  {/* Watermark number */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', right: '-4px', top: '-10px',
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '130px', fontWeight: 300, lineHeight: 1,
                    color: 'rgba(212,175,55,0.07)',
                    userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {card.num}
                  </div>

                  {/* Card content */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '22px 20px 18px',
                    zIndex: 1,
                  }}>
                    <div>
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '8px', letterSpacing: '0.18em',
                          color: 'rgba(246,242,233,0.28)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '999px', padding: '3px 10px',
                        }}>
                          {card.num}&ensp;/&ensp;08
                        </span>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-inter)', fontWeight: 300,
                        fontSize: '8px', letterSpacing: '0.26em',
                        textTransform: 'uppercase', color: 'var(--gold)',
                        marginBottom: '10px',
                      }}>
                        {card.eyebrow}
                      </p>
                      <h3 style={{
                        fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                        fontSize: '32px', lineHeight: 0.9, color: '#EDE8E0',
                      }}>
                        {card.heading}
                        <br />
                        <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.58)' }}>
                          {card.italic}
                        </em>
                      </h3>
                    </div>

                    <p style={{
                      fontFamily: 'var(--font-inter)', fontWeight: 300,
                      fontSize: '11px', lineHeight: 1.82,
                      color: 'rgba(246,242,233,0.44)',
                    }}>
                      {card.body}
                    </p>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <div style={{ color: 'rgba(212,175,55,0.6)' }}>{card.icon}</div>
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: '7px',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'rgba(246,242,233,0.18)',
                      }}>
                        Alair Noir
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── Screen reader live region ────────────────────────── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${CARDS[active].eyebrow}: ${CARDS[active].body}`}
      </div>

      {/* ── Progress dots ───────────────────────────────────── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginTop: 'clamp(24px,3.5vw,40px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {CARDS.map((card, i) => (
          <button
            key={card.num}
            type="button"
            onClick={() => handleCardClick(i)}
            aria-label={`Chapter ${card.num}: ${card.label}`}
            style={{
              width: i === active ? '20px' : '5px',
              height: '2px',
              background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.13)',
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

      {/* ── Drag hint (desktop, first few seconds) ──────────── */}
      {!isMobile && (
        <motion.p
          initial={{ opacity: 0.36 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 3.5 }}
          aria-hidden="true"
          style={{
            textAlign: 'center',
            marginTop: '18px',
            fontFamily: 'var(--font-inter)',
            fontSize: '8px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(246,242,233,0.22)',
            pointerEvents: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Drag or scroll to explore
        </motion.p>
      )}

      <style>{`
        .fan-card:not([aria-selected="true"]):hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .fan-card:focus-visible {
          outline: 1px solid var(--gold) !important;
          outline-offset: 2px;
        }
        .mobile-carousel::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
