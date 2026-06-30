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
    body: 'Your journey begins directly — by WhatsApp, phone, or email. No platform layer. No anonymous dispatch. Just a clear request, handled with discretion.',
    preview: 'Begin a private enquiry',
    image: '/images/chauffeur-arrival.png',
    imageAlt: 'Chauffeur awaiting arrival at dusk',
  },
  {
    num: '02',
    label: 'The Standard',
    eyebrow: '02 — The Standard',
    heading: 'A limited',
    italic: 'fleet.',
    body: 'The fleet is deliberately limited: a BMW i7 xDrive60 and a Mercedes-Benz V-Class. Fewer vehicles means tighter control, better preparation, and a consistent standard every time.',
    preview: 'View the fleet',
    image: '/images/bmw-i7-studio.png',
    imageAlt: 'BMW i7 in a dark studio setting',
  },
  {
    num: '03',
    label: 'The Silence',
    eyebrow: '03 — The Silence',
    heading: 'Silence',
    italic: 'as a luxury.',
    body: 'The BMW i7 xDrive60 is fully electric. No engine noise. No vibration. Just the road, the cabin, and the meeting you are preparing for.',
    preview: 'Experience the i7',
    image: '/images/bmw-i7-cockpit-night.png',
    imageAlt: 'BMW i7 cockpit at night with ambient lighting',
  },
  {
    num: '04',
    label: 'The Cabin',
    eyebrow: '04 — The Cabin',
    heading: 'Prepared',
    italic: 'before you enter.',
    body: 'Lighting, seating, route timing, luggage handling, and privacy expectations are treated as part of the service — not details left to chance.',
    preview: 'Step inside',
    image: '/images/mercedes-v-class-cabin-rear.png',
    imageAlt: 'Mercedes-Benz V-Class rear cabin executive seating',
  },
  {
    num: '05',
    label: 'The Route',
    eyebrow: '05 — The Route',
    heading: 'Zürich to',
    italic: 'wherever.',
    body: 'Airport transfers, Davos, St. Moritz, Geneva, Basel, Milan, Munich, WEF, Art Basel, and private long-distance journeys across Switzerland and Europe.',
    preview: 'See the routes',
    image: '/images/bmw-i7-zurich.png',
    imageAlt: 'BMW i7 in Zurich city landscape at night',
  },
  {
    num: '06',
    label: 'The Arrival',
    eyebrow: '06 — The Arrival',
    heading: 'Arrive',
    italic: 'without noise.',
    body: 'The best arrival is not dramatic. It is punctual, calm, discreet, and already prepared before the door opens.',
    preview: 'Plan the arrival',
    image: '/images/bmw-i7-black-studio.png',
    imageAlt: 'BMW i7 in a black studio environment',
  },
  {
    num: '07',
    label: 'The Relationship',
    eyebrow: '07 — The Relationship',
    heading: 'Preferences',
    italic: 'remembered.',
    body: 'For returning clients, the service becomes quieter over time. Routes, timing, cabin setup, and communication preferences are understood before they need to be repeated.',
    preview: 'A direct relationship',
    image: '/images/bmw-i7-private-office.png',
    imageAlt: 'BMW i7 rear cabin prepared for executive arrival',
  },
  {
    num: '08',
    label: 'The Booking',
    eyebrow: '08 — The Booking',
    heading: 'Ready when',
    italic: 'you are.',
    body: 'Send a route, date, passenger count, and preferred vehicle. You will receive a direct response without intermediary handling.',
    preview: 'Arrange a journey',
    image: '/images/bmw-i7-dashboard-light.png',
    imageAlt: 'BMW i7 crystal dashboard with ambient lighting',
  },
];

const AUTOPLAY_MS = 5600;               // slow, deliberate card change
const DRAG_THRESHOLD = 44;

export default function CinematicScrollStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [windowHeight, setWindowHeight] = useState(800);

  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { margin: '-15% 0px -15% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const dragStartRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const inViewRef = useRef(false);
  const lockRef = useRef(false);
  const touchYRef = useRef<number | null>(null);
  const activeRef = useRef(0);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  /* ── window size ────────────────────────────────────────── */
  useEffect(() => {
    const fn = () => { setWindowWidth(window.innerWidth); setWindowHeight(window.innerHeight); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* ── navigation (endless wrap-around loop) ──────────────── */
  const goTo = (i: number) => setActiveIndex(((i % CARDS.length) + CARDS.length) % CARDS.length);
  const next = () => setActiveIndex((p) => (p + 1) % CARDS.length);
  const prev = () => setActiveIndex((p) => (p - 1 + CARDS.length) % CARDS.length);
  const handleCardClick = (i: number) => { if (!movedRef.current) goTo(i); };

  /* ── keep refs fresh for the imperative scroll handlers ──── */
  useEffect(() => { inViewRef.current = inView; }, [inView]);
  useEffect(() => { activeRef.current = activeIndex; }, [activeIndex]);

  /* ── autoplay: slow, endless, repeats; pauses on hover (desktop only) ── */
  useEffect(() => {
    if (isMobile || shouldReduceMotion || isHovered || isDragging || !inView) return;
    const id = setInterval(() => next(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isMobile, shouldReduceMotion, isHovered, isDragging, inView]);

  /* ── mobile: scroll/swipe changes one card, page stays put ── */
  useEffect(() => {
    if (!isMobile) return;
    const last = CARDS.length - 1;
    const atStart = () => activeRef.current <= 0;
    const atEnd = () => activeRef.current >= last;
    // returns true if the gesture was consumed (page must not scroll)
    const step = (dir: number) => {
      if ((dir < 0 && atStart()) || (dir > 0 && atEnd())) return false; // release to page
      if (lockRef.current) return true; // mid-cooldown: swallow but don't advance
      setActiveIndex((i) => Math.max(0, Math.min(last, i + dir)));
      lockRef.current = true;
      setTimeout(() => { lockRef.current = false; }, 620);
      return true;
    };
    const onWheel = (e: WheelEvent) => {
      if (!inViewRef.current || Math.abs(e.deltaY) < 6) return;
      if (step(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => { touchYRef.current = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (!inViewRef.current || touchYRef.current === null) return;
      const dy = touchYRef.current - e.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;
      if ((dir < 0 && atStart()) || (dir > 0 && atEnd())) return; // let page scroll out
      e.preventDefault(); // hold the page
      if (Math.abs(dy) > 34) { step(dir); touchYRef.current = e.touches[0].clientY; }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isMobile]);

  /* ── keyboard ───────────────────────────────────────────── */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [inView]);

  /* ── mouse drag (desktop only; no page scroll involved) ──── */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    dragStartRef.current = e.clientX;
    movedRef.current = false;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    if (Math.abs(e.clientX - dragStartRef.current) > 8) { movedRef.current = true; setIsDragging(true); }
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    const delta = e.clientX - dragStartRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) (delta < 0 ? next() : prev());
    dragStartRef.current = null;
    setIsDragging(false);
    // allow the trailing click to be suppressed, then reset
    setTimeout(() => { movedRef.current = false; }, 0);
  };

  /* ── responsive sizing (fit to screen) ─────────────────── */
  // Show every card behind the active one.
  const maxNeighbors = CARDS.length - 1;

  // Card height driven by viewport height; width follows a landscape proportion.
  const deskH   = Math.round(Math.max(320, Math.min(isTablet ? 420 : 500, windowHeight * 0.6)));
  const collW   = isTablet ? 44 : 46;
  // Ensure the whole fan (active + visible neighbours + gaps) fits the viewport width.
  const sideRoom = 2 * (isTablet ? 4 : maxNeighbors) * (collW + 5) + 80;
  // Mobile: a tall stacked deck (big active card, all others peeking behind).
  const mobileH = Math.round(Math.max(360, Math.min(560, windowHeight * 0.6)));
  const activeW = isMobile
    ? Math.min(400, windowWidth - 28)
    : Math.max(360, Math.min(Math.round(deskH * 1.5), windowWidth - sideRoom));
  const activeH = isMobile ? mobileH : deskH;
  const collH   = isMobile ? mobileH : deskH;

  // Dynamic perspective origin so the active card stays visually centered for every chapter.
  const gapPx = isMobile ? 10 : 5;
  const leftCards  = isMobile ? 0 : Math.min(activeIndex, maxNeighbors);
  const rightCards = isMobile ? 0 : Math.min(CARDS.length - 1 - activeIndex, maxNeighbors);
  const totalContentW = leftCards * (collW + gapPx) + activeW + rightCards * (collW + gapPx);
  const activeCenterFromContentLeft = leftCards * (collW + gapPx) + activeW / 2;
  const perspContainerW = windowWidth;
  const perspOriginX = Math.round(
    ((perspContainerW / 2 - totalContentW / 2 + activeCenterFromContentLeft) / perspContainerW) * 100
  );

  /* ── render ─────────────────────────────────────────────── */
  return (
    <section
      id="story"
      aria-label="Alair Noir experience chapters"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
        minHeight: isMobile ? '100svh' : undefined,
        display: isMobile ? 'flex' : undefined,
        alignItems: isMobile ? 'center' : undefined,
        padding: isMobile ? 'clamp(40px,9vw,72px) 0' : 'clamp(64px,9vw,128px) 0',
      }}
    >
      <div
        ref={innerRef}
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: 'clamp(18px,3vh,40px)', width: '100%',
        }}
      >
      {/* Ambient background (neutral) */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle at 50% 46%, rgba(38,38,38,0.55), transparent 60%), ' +
          'radial-gradient(circle at 82% 14%, rgba(212,175,55,0.06), transparent 30%)',
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
          fontSize: '10.4px', letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px',
        }}>
          The Journey
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontWeight: 300,
          fontSize: 'clamp(37.1px,4.2vw,74.2px)', lineHeight: 0.92, color: '#EDE8E0',
        }}>
          A journey, held to
          <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}> one standard.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: 'clamp(12.8px,0.9vw,15.1px)', lineHeight: 1.7,
          color: 'var(--text-muted)', maxWidth: '560px',
          margin: '16px auto 0',
        }}>
          Every Alair Noir journey follows the same rhythm — from first request to final arrival. Not a platform. Not a rotating fleet. A private mobility service built around continuity, discretion, and precision.
        </p>
      </motion.div>

      {/* 3D fan / accordion */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '0 clamp(16px,4vw,48px)',
          perspective: '1100px', perspectiveOrigin: `${perspOriginX}% 46%`,
          position: 'relative', zIndex: 1, flexShrink: 0,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        <div
          role="tablist"
          aria-label="Experience chapters"
          style={{
            display: isMobile ? 'block' : 'flex',
            position: isMobile ? 'relative' : 'static',
            width: isMobile ? activeW : 'auto',
            height: isMobile ? mobileH + 130 : 'auto',
            flexDirection: 'row',
            flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center',
            gap: isMobile ? '0' : '5px',
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            const d = Math.abs(index - activeIndex);
            const isVisible = d <= maxNeighbors;

            // ── Desktop: horizontal 3D fan ──
            let rotateY = 0, z = 0, opacity = 1;
            if (!isMobile) {
              if (index < activeIndex) {
                rotateY = isVisible ? Math.min(22 + (d - 1) * 4, 48) : 52; z = isVisible ? -34 * d : -300;
                opacity = isVisible ? Math.max(1 - d * 0.08, 0.6) : 0;
              } else if (index > activeIndex) {
                rotateY = isVisible ? -Math.min(22 + (d - 1) * 4, 48) : -52; z = isVisible ? -34 * d : -300;
                opacity = isVisible ? Math.max(1 - d * 0.08, 0.6) : 0;
              } else { z = 80; }
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
                animate={isMobile
                  ? {
                      y: isActive ? 0 : -(70 + (Math.min(d, 6) - 1) * 16),
                      scale: isActive ? 1 : 1 - Math.min(d, 6) * 0.05,
                      opacity: isActive ? 1 : Math.max(1 - Math.min(d, 6) * 0.14, 0.32),
                    }
                  : {
                      width:   isVisible ? (isActive ? activeW : collW) : 0,
                      height:  isVisible ? (isActive ? activeH : collH) : 0,
                      rotateY,
                      z,
                      opacity: isVisible ? opacity : 0,
                    }}
                transition={shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 200, damping: 24, mass: 0.85 }}
                className="fan-card"
                style={{
                  ...(isMobile
                    ? {
                        position: 'absolute', left: 0, right: 0, marginInline: 'auto',
                        top: '50%', marginTop: -(mobileH / 2),
                        width: activeW, height: mobileH, zIndex: 100 - d,
                      }
                    : { position: 'relative', flexShrink: 0 }),
                  overflow: 'hidden',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#242424' : '#1a1a1a',
                  cursor: 'pointer', transformStyle: 'preserve-3d', outline: 'none',
                  boxShadow: 'none',
                }}
              >
                <AnimatePresence>
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
                        alignItems: isMobile ? 'flex-start' : 'center',
                        justifyContent: 'space-between',
                        padding: isMobile ? '16px 20px 0' : '20px 0 18px',
                      }}
                    >
                      {/* Image backdrop — makes collapsed cards read as cards in the back */}
                      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                        <Image src={card.image} alt="" fill sizes={isMobile ? '100vw' : '80px'}
                          className="object-cover" style={{ filter: 'brightness(1.05) contrast(1.02)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: isMobile
                          ? 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 30%, transparent 60%)'
                          : 'linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.28))' }} />
                      </div>

                      {isMobile ? (
                        <>
                          <span style={{
                            position: 'relative', zIndex: 1,
                            fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '13.9px',
                            letterSpacing: '0.16em', textTransform: 'uppercase',
                            color: 'rgba(246,242,233,0.9)',
                          }}>{card.label}</span>
                          <div style={{
                            position: 'relative', zIndex: 1,
                            width: '5px', height: '5px', borderRadius: '50%',
                            background: 'rgba(212,175,55,0.6)',
                          }} />
                        </>
                      ) : (
                        <>
                          <span style={{
                            position: 'relative', zIndex: 1,
                            fontFamily: 'var(--font-inter)', fontSize: '8.1px',
                            letterSpacing: '0.14em', color: 'rgba(246,242,233,0.4)',
                          }}>{card.num}</span>
                          <span style={{
                            position: 'relative', zIndex: 1,
                            writingMode: 'vertical-rl', textOrientation: 'mixed',
                            transform: 'rotate(180deg)',
                            fontFamily: 'var(--font-inter)', fontSize: '9.3px',
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

      {/* Hint */}
      <p
        aria-hidden="true"
        style={{
          textAlign: 'center', opacity: 0.3,
          fontFamily: 'var(--font-inter)', fontSize: '9.3px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(246,242,233,0.26)', pointerEvents: 'none',
          position: 'relative', zIndex: 1, flexShrink: 0,
        }}
      >
        Drag or tap to explore
      </p>

      {/* Mid-section CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <a
          href="#contact"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: '42px', padding: '0 28px',
            border: '1px solid rgba(212,175,55,0.45)', color: 'var(--gold)',
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '11.6px', letterSpacing: '0.22em', textTransform: 'uppercase',
            transition: 'background 0.25s, color 0.25s',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'var(--gold)'; el.style.color = '#080808'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'transparent'; el.style.color = 'var(--gold)'; }}
        >
          Arrange a Journey
        </a>
      </div>

      </div>

      <style>{`
        .fan-card:not([aria-selected="true"]):hover {
          filter: brightness(1.18);
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
      borderRadius: '12px', background: '#242424',
    }}>
      {/* Soft top light (no shadow) */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none', borderRadius: '12px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent 22%)',
      }} />
      {/* Image */}
      <div style={{ position: 'relative', flex: compact ? '0 0 54%' : '0 0 65%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={card.image} alt={card.imageAlt} fill
            sizes={`${activeW}px`} className="object-cover"
            style={{ filter: 'brightness(1.12) contrast(1.03) saturate(1.05)' }} />
        </motion.div>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 82%, rgba(36,36,36,0.85) 100%)',
        }} />
        <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '9.3px',
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
        background: '#242424', position: 'relative', overflow: 'hidden',
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
            fontSize: '9.3px', letterSpacing: '0.26em',
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
            fontSize: compact ? '11px' : '11.5px', lineHeight: 1.8, color: 'rgba(246,242,233,0.66)',
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
              fontSize: '10.4px', color: 'var(--gold)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
            }}>✓</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '12.2px',
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
              fontFamily: 'var(--font-inter)', fontSize: '8.1px',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(246,242,233,0.2)',
            }}>Alair Noir</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8.1px',
              letterSpacing: '0.12em', color: 'rgba(212,175,55,0.42)',
            }}>{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
