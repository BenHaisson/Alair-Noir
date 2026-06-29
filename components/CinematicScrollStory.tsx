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
    image: '/images/bmw-i7-dashboard-light.png',
    imageAlt: 'BMW i7 crystal dashboard with ambient lighting',
  },
];

const TOTAL_MS = 5000;
const STEP_MS = 40;
const MAX_NEIGHBORS = 3;
const DRAG_THRESHOLD = 48;

export default function CinematicScrollStory() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelThrottleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProg = useRef(false);

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
      if (e.key === 'ArrowLeft') { setPrev(active); setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); }
      if (e.key === 'ArrowRight') { setPrev(active); setActive((p) => (p + 1) % CARDS.length); setProgress(0); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [active]);

  /* ── autoplay (desktop only, pauses on hover) ───────────── */
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    if (!isMobile && !isHovered && !shouldReduceMotion && inView) {
      let elapsed = 0;
      progressRef.current = setInterval(() => {
        elapsed += STEP_MS;
        setProgress(Math.min((elapsed / TOTAL_MS) * 100, 100));
      }, STEP_MS);
      timerRef.current = setInterval(() => {
        setPrev(active);
        setActive((p) => (p + 1) % CARDS.length);
        setProgress(0);
        elapsed = 0;
      }, TOTAL_MS);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isMobile, isHovered, active, shouldReduceMotion, inView]);

  /* ── mobile: scroll carousel to active card ─────────────── */
  useEffect(() => {
    if (!isMobile || !carouselRef.current || isScrollingProg.current) return;
    const el = carouselRef.current;
    const cardW = el.clientWidth * 0.84 + 12;
    isScrollingProg.current = true;
    el.scrollTo({ left: active * cardW, behavior: 'smooth' });
    setTimeout(() => { isScrollingProg.current = false; }, 600);
  }, [active, isMobile]);

  /* ── mobile: detect active card from scroll ─────────────── */
  const handleCarouselScroll = () => {
    if (isScrollingProg.current || !carouselRef.current) return;
    const el = carouselRef.current;
    const cardW = el.clientWidth * 0.84 + 12;
    const idx = Math.round(el.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(CARDS.length - 1, idx)));
  };

  /* ── navigate helpers ───────────────────────────────────── */
  const handleCardClick = (i: number) => {
    if (!isDragging) { setPrev(active); setActive(i); setProgress(0); }
  };
  const handleNext = () => { setPrev(active); setActive((p) => (p + 1) % CARDS.length); setProgress(0); };
  const handlePrev = () => { setPrev(active); setActive((p) => (p - 1 + CARDS.length) % CARDS.length); setProgress(0); };

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
    if (Math.abs(delta) > DRAG_THRESHOLD) { delta < 0 ? handleNext() : handlePrev(); }
    setDragStartX(null);
    setIsDragging(false);
  };

  /* ── wheel / trackpad (desktop) ─────────────────────────── */
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelThrottleRef.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 30) return;
    delta > 0 ? handleNext() : handlePrev();
    wheelThrottleRef.current = setTimeout(() => { wheelThrottleRef.current = null; }, 700);
  };

  /* ── sizing ─────────────────────────────────────────────── */
  const activeW = isTablet ? 310 : 360;
  const collW   = isTablet ? 52  : 60;
  const cardH   = isTablet ? 420 : 480;

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
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle at 50% 58%, rgba(14,31,22,0.5), transparent 52%), ' +
          'radial-gradient(circle at 80% 16%, rgba(212,175,55,0.04), transparent 28%)',
      }} />

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
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: '9px', letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '18px',
        }}>
          The Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontWeight: 300,
          fontSize: 'clamp(42px,5.6vw,84px)', lineHeight: 0.9, color: '#EDE8E0',
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
            perspective: '1400px',
            perspectiveOrigin: '50% 46%',
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
              gap: 'clamp(5px,0.4vw,9px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {CARDS.map((card, i) => {
              const isActive = i === active;
              const diff = Math.abs(i - active);
              const isVisible = diff <= MAX_NEIGHBORS;

              let rotateY = 0, z = 0, opacity = 1;
              if (i < active) {
                const d = active - i;
                rotateY = isVisible ? 9 + (d - 1) * 9  : 45;
                z       = isVisible ? -18 * d           : -160;
                opacity = isVisible ? Math.max(1 - d * 0.16, 0.36) : 0;
              } else if (i > active) {
                const d = i - active;
                rotateY = isVisible ? -(9 + (d - 1) * 9) : -45;
                z       = isVisible ? -18 * d              : -160;
                opacity = isVisible ? Math.max(1 - d * 0.16, 0.36) : 0;
              } else {
                z = 44;
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
                      : { type: 'spring', stiffness: 120, damping: 20, mass: 1.0 }
                  }
                  className="fan-card"
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: '10px',
                    border: isActive
                      ? '1px solid rgba(212,175,55,0.28)'
                      : '1px solid rgba(255,255,255,0.05)',
                    background: '#0c0c0c',
                    cursor: 'inherit',
                    transformStyle: 'preserve-3d',
                    outline: 'none',
                    boxShadow: isActive
                      ? '0 40px 80px -20px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.04)'
                      : '0 8px 24px -4px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* ── Collapsed card ─────────────────────────── */}
                  <AnimatePresence mode="wait">
                    {!isActive && isVisible && (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.14 }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'space-between',
                          padding: '20px 0 18px',
                          pointerEvents: 'none',
                          zIndex: 2,
                        }}
                      >
                        {/* Image fills collapsed card */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                            style={{ filter: 'saturate(0.5) brightness(0.28)' }}
                          />
                        </div>

                        {/* Number */}
                        <span style={{
                          position: 'relative', zIndex: 1,
                          fontFamily: 'var(--font-inter)', fontSize: '7px',
                          letterSpacing: '0.14em', color: 'rgba(246,242,233,0.22)',
                        }}>
                          {card.num}
                        </span>

                        {/* Vertical label */}
                        <span style={{
                          position: 'relative', zIndex: 1,
                          writingMode: 'vertical-rl', textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          fontFamily: 'var(--font-inter)', fontSize: '7.5px',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(246,242,233,0.26)', whiteSpace: 'nowrap', userSelect: 'none',
                        }}>
                          {card.label}
                        </span>

                        {/* Gold dot */}
                        <div style={{
                          position: 'relative', zIndex: 1,
                          width: '3px', height: '3px', borderRadius: '50%',
                          background: 'rgba(212,175,55,0.4)',
                        }} />
                      </motion.div>
                    )}

                    {/* ── Expanded / active card ──────────────── */}
                    {isActive && (
                      <motion.div
                        key="expanded"
                        role="tabpanel"
                        id={`fan-panel-${i}`}
                        aria-labelledby={`fan-tab-${i}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', flexDirection: 'column',
                          zIndex: 10, outline: 'none', overflow: 'hidden',
                        }}
                      >
                        {/* Image — top 52% with Ken Burns animation */}
                        <div style={{
                          position: 'relative', flex: '0 0 52%', overflow: 'hidden',
                        }}>
                          <motion.div
                            key={`img-${i}`}
                            initial={{ scale: 1.06, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{ position: 'absolute', inset: 0 }}
                          >
                            <Image
                              src={card.image}
                              alt={card.imageAlt}
                              fill
                              sizes={`${activeW}px`}
                              className="object-cover"
                              style={{ filter: 'saturate(0.82) contrast(1.08)' }}
                              priority={i === 0}
                            />
                          </motion.div>
                          {/* Gradient fade from image to card body */}
                          <div aria-hidden="true" style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to bottom, transparent 35%, rgba(12,12,12,0.7) 72%, #0c0c0c 100%)',
                          }} />
                          {/* Counter badge over image */}
                          <div style={{
                            position: 'absolute', top: '14px', left: '16px', zIndex: 2,
                          }}>
                            <span style={{
                              fontFamily: 'var(--font-inter)', fontSize: '7.5px',
                              letterSpacing: '0.16em', color: 'rgba(246,242,233,0.5)',
                              background: 'rgba(0,0,0,0.38)',
                              backdropFilter: 'blur(6px)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '999px', padding: '3px 10px',
                            }}>
                              {card.num}&ensp;/&ensp;08
                            </span>
                          </div>
                        </div>

                        {/* Content — bottom 48% */}
                        <div style={{
                          flex: '1 1 auto', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between', padding: '18px 20px 16px',
                          background: '#0c0c0c', position: 'relative', overflow: 'hidden',
                        }}>
                          {/* Watermark number */}
                          <div aria-hidden="true" style={{
                            position: 'absolute', right: '-4px', bottom: '-16px',
                            fontFamily: 'var(--font-cormorant)', fontSize: '120px',
                            fontWeight: 300, lineHeight: 1,
                            color: 'rgba(212,175,55,0.055)',
                            userSelect: 'none', pointerEvents: 'none',
                          }}>
                            {card.num}
                          </div>

                          {/* Gold left accent */}
                          <div aria-hidden="true" style={{
                            position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '1px',
                            background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.7), transparent)',
                          }} />

                          <div style={{ position: 'relative', zIndex: 1 }}>
                            {/* Gold eyebrow */}
                            <p style={{
                              fontFamily: 'var(--font-inter)', fontWeight: 300,
                              fontSize: '7.5px', letterSpacing: '0.26em',
                              textTransform: 'uppercase', color: 'var(--gold)',
                              marginBottom: '9px',
                            }}>
                              {card.eyebrow}
                            </p>

                            {/* Heading */}
                            <h3 style={{
                              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                              fontSize: 'clamp(24px,2.6vw,36px)', lineHeight: 0.9,
                              color: '#EDE8E0', marginBottom: '10px',
                            }}>
                              {card.heading}
                              <br />
                              <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.55)' }}>
                                {card.italic}
                              </em>
                            </h3>

                            {/* Body */}
                            <p style={{
                              fontFamily: 'var(--font-inter)', fontWeight: 300,
                              fontSize: '10.5px', lineHeight: 1.8,
                              color: 'rgba(246,242,233,0.42)',
                            }}>
                              {card.body}
                            </p>
                          </div>

                          {/* Footer + autoplay progress bar */}
                          <div style={{ position: 'relative', zIndex: 1 }}>
                            {/* Progress bar */}
                            {!isHovered && !isMobile && (
                              <div style={{
                                height: '1px', width: '100%', marginBottom: '10px',
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '1px', overflow: 'hidden',
                              }}>
                                <motion.div
                                  style={{
                                    height: '100%',
                                    background: 'rgba(212,175,55,0.55)',
                                    borderRadius: '1px',
                                  }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ duration: 0 }}
                                />
                              </div>
                            )}
                            <div style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            }}>
                              <span style={{
                                fontFamily: 'var(--font-inter)', fontSize: '7px',
                                letterSpacing: '0.22em', textTransform: 'uppercase',
                                color: 'rgba(246,242,233,0.16)',
                              }}>
                                Alair Noir
                              </span>
                              <span style={{
                                fontFamily: 'var(--font-inter)', fontSize: '7px',
                                letterSpacing: '0.14em', color: 'rgba(212,175,55,0.38)',
                              }}>
                                {card.label}
                              </span>
                            </div>
                          </div>
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
              display: 'flex', overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              gap: '12px',
              paddingLeft: '8vw', paddingRight: '8vw',
            }}
          >
            {CARDS.map((card, i) => {
              const isActive = i === active;
              return (
                <div
                  key={card.eyebrow}
                  onClick={() => handleCardClick(i)}
                  style={{
                    flex: '0 0 84vw', maxWidth: '360px', height: '420px',
                    scrollSnapAlign: 'center', position: 'relative',
                    overflow: 'hidden', borderRadius: '10px',
                    border: isActive ? '1px solid rgba(212,175,55,0.28)' : '1px solid rgba(255,255,255,0.05)',
                    background: '#0c0c0c',
                    boxShadow: isActive ? '0 24px 56px -12px rgba(0,0,0,0.9)' : '0 8px 24px -4px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Image — top 48% */}
                  <div style={{ position: 'relative', flex: '0 0 48%', overflow: 'hidden' }}>
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="84vw"
                      className="object-cover"
                      style={{ filter: 'saturate(0.82) contrast(1.06)' }}
                    />
                    <div aria-hidden="true" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 30%, rgba(12,12,12,0.65) 70%, #0c0c0c 100%)',
                    }} />
                    {/* Counter badge */}
                    <div style={{ position: 'absolute', top: '12px', left: '14px', zIndex: 2 }}>
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: '7.5px',
                        letterSpacing: '0.16em', color: 'rgba(246,242,233,0.48)',
                        background: 'rgba(0,0,0,0.36)', backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '999px', padding: '3px 9px',
                      }}>
                        {card.num}&ensp;/&ensp;08
                      </span>
                    </div>
                  </div>

                  {/* Content — bottom 52% */}
                  <div style={{
                    flex: '1 1 auto', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', padding: '16px 18px 14px',
                    background: '#0c0c0c', position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Watermark */}
                    <div aria-hidden="true" style={{
                      position: 'absolute', right: '-4px', bottom: '-12px',
                      fontFamily: 'var(--font-cormorant)', fontSize: '100px',
                      fontWeight: 300, lineHeight: 1,
                      color: 'rgba(212,175,55,0.055)',
                      userSelect: 'none', pointerEvents: 'none',
                    }}>
                      {card.num}
                    </div>

                    {/* Gold left accent */}
                    {isActive && (
                      <div aria-hidden="true" style={{
                        position: 'absolute', left: 0, top: '8%', bottom: '8%', width: '1px',
                        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.7), transparent)',
                      }} />
                    )}

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{
                        fontFamily: 'var(--font-inter)', fontWeight: 300,
                        fontSize: '7.5px', letterSpacing: '0.24em',
                        textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px',
                      }}>
                        {card.eyebrow}
                      </p>
                      <h3 style={{
                        fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                        fontSize: '30px', lineHeight: 0.9, color: '#EDE8E0', marginBottom: '8px',
                      }}>
                        {card.heading}
                        <br />
                        <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.55)' }}>
                          {card.italic}
                        </em>
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-inter)', fontWeight: 300,
                        fontSize: '10.5px', lineHeight: 1.78, color: 'rgba(246,242,233,0.4)',
                      }}>
                        {card.body}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)',
                      position: 'relative', zIndex: 1,
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: '7px',
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: 'rgba(246,242,233,0.16)',
                      }}>
                        Alair Noir
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: '7px',
                        letterSpacing: '0.12em', color: 'rgba(212,175,55,0.36)',
                      }}>
                        {card.label}
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
        display: 'flex', justifyContent: 'center', gap: '6px',
        marginTop: 'clamp(24px,3.5vw,40px)', position: 'relative', zIndex: 1,
      }}>
        {CARDS.map((card, i) => (
          <button
            key={card.num}
            type="button"
            onClick={() => handleCardClick(i)}
            aria-label={`Chapter ${card.num}: ${card.label}`}
            style={{
              width: i === active ? '22px' : '5px',
              height: '2px',
              background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
              border: 'none', cursor: 'pointer', borderRadius: '1px', padding: 0, flexShrink: 0,
              transition: shouldReduceMotion
                ? 'none'
                : 'width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Drag hint ───────────────────────────────────────── */}
      {!isMobile && (
        <motion.p
          initial={{ opacity: 0.32 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: 4 }}
          aria-hidden="true"
          style={{
            textAlign: 'center', marginTop: '18px',
            fontFamily: 'var(--font-inter)', fontSize: '8px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(246,242,233,0.2)', pointerEvents: 'none',
            position: 'relative', zIndex: 1,
          }}
        >
          Drag or scroll to explore
        </motion.p>
      )}

      <style>{`
        .fan-card:not([aria-selected="true"]):hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.1) !important;
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
