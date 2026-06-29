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
        <path d="M0 6 Q2.5 0 5 6 Q7.5 12 10 6 Q12.5 0 15 6 Q17.5 12 20 6"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
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
        <path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z"
          stroke="currentColor" strokeWidth="1" />
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
        <path d="M9 2l6 2.5V9c0 3.5-2.5 6.2-6 7-3.5-.8-6-3.5-6-7V4.5L9 2z"
          stroke="currentColor" strokeWidth="1" />
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

/* ── SVG controls ─────────────────────────────────────────── */
const IconPrev = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconNext = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPlay = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
    <polygon points="1,1 11,7 1,13" fill="currentColor" />
  </svg>
);
const IconPause = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="4" height="12" rx="1" fill="currentColor" />
    <rect x="7" y="1" width="4" height="12" rx="1" fill="currentColor" />
  </svg>
);

const sectionEase = [0.16, 1, 0.3, 1] as const;
const TOTAL_MS = 4000;
const STEP_MS = 40;
const MAX_NEIGHBORS = 3;

export default function CinematicScrollStory() {
  const [active, setActive] = useState(4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  /* window resize */
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); }
      if (e.key === 'ArrowRight') { setActive((p) => (p + 1) % CARDS.length); setProgress(0); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* autoplay + progress */
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    if (isPlaying && !isHovered && !shouldReduceMotion) {
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
  }, [isPlaying, isHovered, active, shouldReduceMotion]);

  const handleCardClick = (i: number) => { setActive(i); setProgress(0); };
  const handleNext = () => { setActive((p) => (p + 1) % CARDS.length); setProgress(0); };
  const handlePrev = () => { setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (isMobile && touchStartY.current !== null) {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        dy > 0 ? handleNext() : handlePrev();
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
    }
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const activeW = isMobile ? Math.min(320, windowWidth - 32) : isTablet ? 300 : 320;
  const collW = isMobile ? Math.min(320, windowWidth - 32) : isTablet ? 50 : 62;
  const activeH = isMobile ? 260 : 360;
  const collH = isMobile ? 50 : 360;

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
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 55%, rgba(14,31,22,0.55), transparent 54%), radial-gradient(circle at 82% 18%, rgba(212,175,55,0.04), transparent 28%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section heading */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: sectionEase }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(32px,4vw,52px)',
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
            fontSize: 'clamp(42px,5.6vw,84px)',
            lineHeight: 0.9,
            color: '#EDE8E0',
          }}
        >
          Eight moments,
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)', paddingLeft: '5%' }}>
            one passage.
          </em>
        </h2>
      </motion.div>

      {/* Control pill */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 'clamp(28px,3.5vw,48px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '999px',
            padding: '6px 14px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous chapter"
            style={ctrlBtn}
          >
            <IconPrev />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
            style={{
              ...ctrlBtn,
              color: isPlaying ? 'var(--gold)' : 'rgba(246,242,233,0.4)',
            }}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>

          {/* Progress bar */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Autoplay progress"
            style={{
              width: '56px',
              height: '2px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1px',
              overflow: 'hidden',
              margin: '0 4px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${isPlaying && !isHovered ? progress : isHovered ? progress : 0}%`,
                background: 'linear-gradient(90deg, rgba(212,175,55,0.6), var(--gold))',
                transition: 'width 75ms linear',
                borderRadius: '1px',
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next chapter"
            style={ctrlBtn}
          >
            <IconNext />
          </button>
        </div>
      </motion.div>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`${CARDS[active].eyebrow}: ${CARDS[active].body}`}
      </div>

      {/* 3D Card fan */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.22 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 clamp(16px,3vw,48px)',
          perspective: '1200px',
          position: 'relative',
          zIndex: 1,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          role="tablist"
          aria-label="Experience chapters"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '10px' : 'clamp(6px,0.5vw,10px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((card, i) => {
            const isActive = i === active;
            const isVisible = Math.abs(i - active) <= MAX_NEIGHBORS;

            let rotateY = 0, rotateX = 0, z = 0, y = 0, opacity = 1;

            if (i < active) {
              const diff = active - i;
              if (isMobile) {
                rotateX = 18 - (diff - 1) * 3;
                z = -20 * diff;
                y = 12 * diff;
              } else {
                rotateY = isVisible ? 10 + (diff - 1) * 10 : 45;
                z = isVisible ? -20 * diff : -150;
              }
              opacity = isVisible ? Math.max(1 - diff * 0.15, 0.4) : 0;
            } else if (i > active) {
              const diff = i - active;
              if (isMobile) {
                rotateX = -(18 - (diff - 1) * 3);
                z = -20 * diff;
                y = -12 * diff;
              } else {
                rotateY = isVisible ? -(10 + (diff - 1) * 10) : -45;
                z = isVisible ? -20 * diff : -150;
              }
              opacity = isVisible ? Math.max(1 - diff * 0.15, 0.4) : 0;
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
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(i);
                  }
                }}
                animate={{
                  width: isVisible ? (isActive ? activeW : collW) : 0,
                  height: isVisible ? (isActive ? activeH : collH) : 0,
                  rotateY: isMobile ? 0 : rotateY,
                  rotateX: isMobile ? rotateX : 0,
                  z,
                  y: isMobile ? y : 0,
                  opacity: isVisible ? opacity : 0,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 140, damping: 18, mass: 0.9 }
                }
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '10px',
                  border: isActive
                    ? '1px solid rgba(212,175,55,0.28)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'rgba(255,255,255,0.055)'
                    : 'rgba(255,255,255,0.025)',
                  backgroundImage:
                    'linear-gradient(to bottom, rgba(255,255,255,0.055) 0%, transparent 100%)',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  outline: 'none',
                  boxShadow: isActive
                    ? '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 0 0 transparent'
                    : '0 10px 25px -5px rgba(0,0,0,0.5)',
                }}
                className="fan-card"
              >
                {/* Gold left accent line on active */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '14%',
                      bottom: '14%',
                      width: '1px',
                      background:
                        'linear-gradient(to bottom, transparent, rgba(212,175,55,0.76), transparent)',
                      zIndex: 2,
                    }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {/* COLLAPSED state */}
                  {!isActive && isVisible && (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        ...(isMobile
                          ? {
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0 16px',
                            }
                          : {
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '20px 0',
                            }),
                      }}
                    >
                      {isMobile ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-inter)',
                                fontSize: '9px',
                                letterSpacing: '0.16em',
                                color: 'rgba(246,242,233,0.32)',
                              }}
                            >
                              {card.num}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-inter)',
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'rgba(246,242,233,0.6)',
                              }}
                            >
                              {card.label}
                            </span>
                          </div>
                          <div style={{ color: 'rgba(212,175,55,0.44)' }}>{card.icon}</div>
                        </>
                      ) : (
                        <>
                          {/* Chapter number — top */}
                          <span
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '9px',
                              letterSpacing: '0.18em',
                              color: 'rgba(246,242,233,0.28)',
                            }}
                          >
                            {card.num}
                          </span>

                          {/* Vertical label — center */}
                          <span
                            style={{
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed',
                              transform: 'rotate(180deg)',
                              fontFamily: 'var(--font-inter)',
                              fontSize: '9px',
                              letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: 'rgba(246,242,233,0.32)',
                              whiteSpace: 'nowrap',
                              userSelect: 'none',
                            }}
                          >
                            {card.label}
                          </span>

                          {/* Icon — bottom */}
                          <div style={{ color: 'rgba(212,175,55,0.44)' }}>{card.icon}</div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* EXPANDED state */}
                  {isActive && (
                    <motion.div
                      key="expanded"
                      role="tabpanel"
                      id={`fan-panel-${i}`}
                      aria-labelledby={`fan-tab-${i}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.32, delay: 0.06, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 'clamp(18px,2.2vw,26px)',
                        zIndex: 10,
                        outline: 'none',
                      }}
                    >
                      {/* Top: eyebrow + heading */}
                      <div>
                        {/* Counter badge */}
                        <div style={{ marginBottom: '14px' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '8px',
                              letterSpacing: '0.18em',
                              color: 'rgba(246,242,233,0.3)',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: '999px',
                              padding: '3px 10px',
                            }}
                          >
                            {card.num}&nbsp;/&nbsp;08
                          </span>
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 300,
                            fontSize: '8px',
                            letterSpacing: '0.24em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            marginBottom: '10px',
                          }}
                        >
                          {card.eyebrow}
                        </p>

                        <h3
                          style={{
                            fontFamily: 'var(--font-cormorant)',
                            fontWeight: 300,
                            fontSize: 'clamp(24px,2.6vw,36px)',
                            lineHeight: 0.92,
                            color: '#EDE8E0',
                          }}
                        >
                          {card.heading}
                          <br />
                          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}>
                            {card.italic}
                          </em>
                        </h3>
                      </div>

                      {/* Middle: body */}
                      <p
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontWeight: 300,
                          fontSize: '11.5px',
                          lineHeight: 1.82,
                          color: 'rgba(246,242,233,0.48)',
                          margin: '0',
                        }}
                      >
                        {card.body}
                      </p>

                      {/* Bottom: icon + label */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div style={{ color: 'rgba(212,175,55,0.6)', lineHeight: 1 }}>
                          {card.icon}
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: '8px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(246,242,233,0.22)',
                          }}
                        >
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

      {/* Progress dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: 'clamp(26px,3.5vw,42px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {CARDS.map((card, i) => (
          <button
            key={card.num}
            type="button"
            onClick={() => handleCardClick(i)}
            aria-label={`Chapter ${card.num}: ${card.label}`}
            style={{
              width: i === active ? '20px' : '5px',
              height: '2px',
              background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.14)',
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
        .fan-card:not([aria-selected="true"]):hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.13) !important;
        }
        .fan-card:focus-visible {
          outline: 1px solid var(--gold) !important;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}

/* ── shared button style ─────────────────────────────── */
const ctrlBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  borderRadius: '50%',
  border: 'none',
  background: 'transparent',
  color: 'rgba(246,242,233,0.44)',
  cursor: 'pointer',
  transition: 'color 0.2s ease, background 0.2s ease',
  outline: 'none',
};
