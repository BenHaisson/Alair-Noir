'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion, AnimatePresence, useInView, useReducedMotion,
  useScroll, useTransform, useMotionValueEvent, type MotionValue,
} from 'framer-motion';

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

const N = CARDS.length;
const AUTOPLAY_MS = 5600;
const DRAG_THRESHOLD = 44;

/* ════════════════════════════════════════════════════════════
   Entry — picks the mobile pinned story or the desktop fan
   ════════════════════════════════════════════════════════════ */
export default function CinematicScrollStory() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    setMounted(true);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  if (mounted && isMobile) return <MobileStory />;
  return <DesktopFan />;
}

/* ════════════════════════════════════════════════════════════
   Shared heading
   ════════════════════════════════════════════════════════════ */
function Heading({ inView, compact = false }: { inView: boolean; compact?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: 'center', padding: '0 clamp(24px,5vw,60px)', position: 'relative', zIndex: 2, flexShrink: 0 }}
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
        fontSize: compact ? 'clamp(30px,8vw,40px)' : 'clamp(37.1px,4.2vw,74.2px)',
        lineHeight: 0.92, color: '#EDE8E0',
      }}>
        A journey, held to
        <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}> one standard.</em>
      </h2>
      {!compact && (
        <p style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: 'clamp(12.8px,0.9vw,15.1px)', lineHeight: 1.7,
          color: 'var(--text-muted)', maxWidth: '560px', margin: '16px auto 0',
        }}>
          Every Alair Noir journey follows the same rhythm — from first request to final arrival. Not a platform. Not a rotating fleet. A private mobility service built around continuity, discretion, and precision.
        </p>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   Progress dots
   ════════════════════════════════════════════════════════════ */
function Dots({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
      {CARDS.map((card, i) => (
        <button
          key={card.num}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Chapter ${card.num}: ${card.label}`}
          style={{
            width: i === active ? '24px' : '6px', height: '3px',
            background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.18)',
            border: 'none', cursor: 'pointer', borderRadius: '2px', padding: 0, flexShrink: 0,
            transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MOBILE — premium pinned 3D scroll-story deck
   ════════════════════════════════════════════════════════════ */
function MobileStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [vh, setVh] = useState(720);
  const [vw, setVw] = useState(390);

  useEffect(() => {
    const fn = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Floating active position 0..N-1 across the pinned scroll.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.round(v * (N - 1));
    setActive((prev) => (prev === idx ? prev : Math.max(0, Math.min(N - 1, idx))));
  });

  const cardW = Math.min(420, vw - 28);
  const cardH = Math.round(vh * 0.6);

  const scrollToCard = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="Alair Noir experience chapters"
      style={{ position: 'relative', height: `calc(100svh * ${N})`, backgroundColor: 'var(--bg)' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100svh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        paddingTop: 'clamp(48px,9vh,84px)', paddingBottom: 'clamp(20px,4vh,36px)',
      }}>
        {/* Ambient */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 40%, rgba(40,40,40,0.5), transparent 62%), ' +
            'radial-gradient(circle at 80% 12%, rgba(212,175,55,0.06), transparent 32%)',
        }} />

        <Heading inView compact />

        {/* Deck area */}
        <div style={{ position: 'relative', flex: 1, width: '100%', zIndex: 1, marginTop: 'clamp(16px,3vh,28px)' }}>
          {CARDS.map((card, i) => (
            <MobileCard
              key={card.num}
              card={card}
              index={i}
              isActive={i === active}
              progress={scrollYProgress}
              cardW={cardW}
              cardH={cardH}
              vh={vh}
            />
          ))}
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`${CARDS[active].eyebrow}: ${CARDS[active].body}`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.5vh,22px)', marginTop: 'clamp(12px,2vh,20px)' }}>
          <Dots active={active} onSelect={scrollToCard} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '42px', padding: '0 28px',
                border: '1px solid rgba(212,175,55,0.45)', color: 'var(--gold)',
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '11.6px', letterSpacing: '0.22em', textTransform: 'uppercase',
              }}
            >
              Arrange a Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCard({
  card, index, isActive, progress, cardW, cardH, vh,
}: {
  card: FanCard; index: number; isActive: boolean;
  progress: MotionValue<number>; cardW: number; cardH: number; vh: number;
}) {
  // r = floating active position - this card's index. 0 = centered/active.
  const r = useTransform(progress, (v) => v * (N - 1) - index);

  const y = useTransform(
    r,
    [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    [vh * 0.5, 0, -vh * 0.05, -vh * 0.085, -vh * 0.11, -vh * 0.13, -vh * 0.145, -vh * 0.155, -vh * 0.16],
  );
  const scale = useTransform(r, [-1, 0, 1, 3, 7], [0.9, 1, 0.93, 0.87, 0.82]);
  const opacity = useTransform(r, [-1.3, -0.7, 0, 1, 7], [0, 0.5, 1, 0.92, 0.5]);
  const zIndex = useTransform(r, (v) => Math.round(60 - Math.abs(v) * 5));
  const boxShadow = useTransform(r, (v) =>
    Math.abs(v) < 0.5
      ? '0 30px 64px -22px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 0 22px rgba(212,175,55,0.14), 0 16px 34px -20px rgba(0,0,0,0.7)',
  );

  return (
    <motion.div
      role="group"
      aria-label={`Chapter ${card.num}: ${card.label}`}
      aria-hidden={!isActive}
      style={{
        position: 'absolute', left: 0, right: 0, marginInline: 'auto',
        top: '50%', marginTop: -(cardH / 2),
        width: cardW, height: cardH, y, scale, opacity, zIndex, boxShadow,
        borderRadius: '14px', overflow: 'hidden', background: '#1a1a1a',
        willChange: 'transform',
      }}
    >
      {isActive ? (
        <CardFace card={card} activeW={cardW} compact />
      ) : (
        <>
          {/* Background preview card — clear title, soft dark gradient */}
          <Image src={card.image} alt="" fill sizes={`${cardW}px`}
            className="object-cover" style={{ filter: 'brightness(0.92)' }} />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.18) 34%, transparent 64%)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: '14px',
            boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.16), inset 0 1px 0 rgba(255,255,255,0.06)',
          }} />
          <div style={{ position: 'absolute', top: '18px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '13.9px',
              letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F6F2E9',
            }}>{card.label}</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '11px',
              letterSpacing: '0.14em', color: 'rgba(212,175,55,0.85)',
            }}>{card.num}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   DESKTOP — horizontal 3D fan (unchanged behaviour)
   ════════════════════════════════════════════════════════════ */
function DesktopFan() {
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

  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    const fn = () => { setWindowWidth(window.innerWidth); setWindowHeight(window.innerHeight); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const goTo = (i: number) => setActiveIndex(((i % N) + N) % N);
  const next = () => setActiveIndex((p) => (p + 1) % N);
  const prev = () => setActiveIndex((p) => (p - 1 + N) % N);
  const handleCardClick = (i: number) => { if (!movedRef.current) goTo(i); };

  useEffect(() => {
    if (shouldReduceMotion || isHovered || isDragging || !inView) return;
    const id = setInterval(() => next(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [shouldReduceMotion, isHovered, isDragging, inView]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [inView]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
    setTimeout(() => { movedRef.current = false; }, 0);
  };

  const maxNeighbors = N - 1;
  const deskH = Math.round(Math.max(320, Math.min(isTablet ? 420 : 500, windowHeight * 0.6)));
  const collW = isTablet ? 44 : 46;
  const sideRoom = 2 * (isTablet ? 4 : maxNeighbors) * (collW + 5) + 80;
  const activeW = Math.max(360, Math.min(Math.round(deskH * 1.5), windowWidth - sideRoom));

  const gapPx = 5;
  const leftCards = Math.min(activeIndex, maxNeighbors);
  const rightCards = Math.min(N - 1 - activeIndex, maxNeighbors);
  const totalContentW = leftCards * (collW + gapPx) + activeW + rightCards * (collW + gapPx);
  const activeCenterFromContentLeft = leftCards * (collW + gapPx) + activeW / 2;
  const perspOriginX = Math.round(
    ((windowWidth / 2 - totalContentW / 2 + activeCenterFromContentLeft) / windowWidth) * 100,
  );

  return (
    <section
      id="story"
      aria-label="Alair Noir experience chapters"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', backgroundColor: 'var(--bg)', overflow: 'hidden', padding: 'clamp(64px,9vw,128px) 0' }}
    >
      <div ref={innerRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(18px,3vh,40px)', width: '100%' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 46%, rgba(38,38,38,0.55), transparent 60%), ' +
            'radial-gradient(circle at 82% 14%, rgba(212,175,55,0.06), transparent 30%)',
        }} />

        <Heading inView={inView} />

        {/* 3D fan */}
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
            cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y', userSelect: 'none',
          }}
        >
          <div role="tablist" aria-label="Experience chapters" style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'nowrap',
            alignItems: 'center', justifyContent: 'center', gap: '5px', transformStyle: 'preserve-3d',
          }}>
            {CARDS.map((card, index) => {
              const isActive = index === activeIndex;
              const d = Math.abs(index - activeIndex);
              const isVisible = d <= maxNeighbors;

              let rotateY = 0, z = 0, opacity = 1;
              if (index < activeIndex) {
                rotateY = isVisible ? Math.min(22 + (d - 1) * 4, 48) : 52; z = isVisible ? -34 * d : -300;
                opacity = isVisible ? Math.max(1 - d * 0.08, 0.6) : 0;
              } else if (index > activeIndex) {
                rotateY = isVisible ? -Math.min(22 + (d - 1) * 4, 48) : -52; z = isVisible ? -34 * d : -300;
                opacity = isVisible ? Math.max(1 - d * 0.08, 0.6) : 0;
              } else { z = 80; }

              return (
                <motion.div
                  key={card.eyebrow}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`Chapter ${card.num}: ${card.label}`}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(index); } }}
                  animate={{
                    width: isVisible ? (isActive ? activeW : collW) : 0,
                    height: isVisible ? deskH : 0,
                    rotateY, z, opacity: isVisible ? opacity : 0,
                  }}
                  transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 24, mass: 0.85 }}
                  className="fan-card"
                  style={{
                    position: 'relative', flexShrink: 0, overflow: 'hidden', borderRadius: '12px',
                    border: 'none', background: isActive ? '#242424' : '#1a1a1a',
                    cursor: 'pointer', transformStyle: 'preserve-3d', outline: 'none', boxShadow: 'none',
                  }}
                >
                  <AnimatePresence>
                    {!isActive && isVisible && (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          justifyContent: 'space-between', padding: '20px 0 18px',
                        }}
                      >
                        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                          <Image src={card.image} alt="" fill sizes="80px"
                            className="object-cover" style={{ filter: 'brightness(1.05) contrast(1.02)' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.28))' }} />
                        </div>
                        <span style={{
                          position: 'relative', zIndex: 1,
                          fontFamily: 'var(--font-inter)', fontSize: '8.1px',
                          letterSpacing: '0.14em', color: 'rgba(246,242,233,0.4)',
                        }}>{card.num}</span>
                        <span style={{
                          position: 'relative', zIndex: 1,
                          writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
                          fontFamily: 'var(--font-inter)', fontSize: '9.3px',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(246,242,233,0.5)', whiteSpace: 'nowrap',
                        }}>{card.label}</span>
                        <div style={{
                          position: 'relative', zIndex: 1, width: '4px', height: '4px',
                          borderRadius: '50%', background: 'rgba(212,175,55,0.5)',
                        }} />
                      </motion.div>
                    )}
                    {isActive && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                      >
                        <CardFace card={card} activeW={activeW} compact={false} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`${CARDS[activeIndex].eyebrow}: ${CARDS[activeIndex].body}`}
        </div>

        <Dots active={activeIndex} onSelect={handleCardClick} />

        <p aria-hidden="true" style={{
          textAlign: 'center', opacity: 0.3,
          fontFamily: 'var(--font-inter)', fontSize: '9.3px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(246,242,233,0.26)', pointerEvents: 'none',
          position: 'relative', zIndex: 1, flexShrink: 0,
        }}>
          Drag or tap to explore
        </p>

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
        .fan-card:not([aria-selected="true"]):hover { filter: brightness(1.18); }
        .fan-card:focus-visible { outline: 1px solid var(--gold) !important; outline-offset: 2px; }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   Expanded card face — cinematic active card
   ════════════════════════════════════════════════════════════ */
function CardFace({ card, activeW, compact }: { card: FanCard; activeW: number; compact: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', borderRadius: '14px', background: '#1c1c1c',
    }}>
      {/* Edge highlight + soft top light */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none', borderRadius: '14px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.09), transparent 20%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)',
      }} />

      {/* Image */}
      <div style={{ position: 'relative', flex: compact ? '0 0 56%' : '0 0 65%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={card.image} alt={card.imageAlt} fill
            sizes={`${activeW}px`} className="object-cover"
            style={{ filter: 'brightness(1.08) contrast(1.04) saturate(1.05)' }} />
        </motion.div>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 70%, rgba(28,28,28,0.9) 100%)',
        }} />
        <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '9.3px',
            letterSpacing: '0.16em', color: 'rgba(246,242,233,0.7)',
            background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '4px 11px',
          }}>{card.num}&ensp;/&ensp;08</span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: compact ? '18px 20px 16px' : '20px 22px 18px',
        background: '#1c1c1c', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-6px', bottom: '-18px',
          fontFamily: 'var(--font-cormorant)', fontSize: compact ? '112px' : '128px',
          fontWeight: 300, lineHeight: 1, color: 'rgba(212,175,55,0.07)',
          userSelect: 'none', pointerEvents: 'none',
        }}>{card.num}</div>

        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.85), transparent)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 400,
            fontSize: '9.6px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '10px',
          }}>{card.eyebrow}</p>
          <h3 style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: compact ? 'clamp(30px,8vw,38px)' : 'clamp(26px,2.6vw,40px)', lineHeight: 0.92,
            color: '#F6F2E9', marginBottom: '12px',
          }}>
            {card.heading}
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}>{card.italic}</em>
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: compact ? '13px' : '11.5px', lineHeight: 1.75, color: 'rgba(246,242,233,0.72)',
          }}>{card.body}</p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10.4px', color: 'var(--gold)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
            }}>✓</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '12.6px',
              color: 'rgba(246,242,233,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{card.preview}</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8.1px',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(246,242,233,0.24)',
            }}>Alair Noir</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8.1px',
              letterSpacing: '0.12em', color: 'rgba(212,175,55,0.5)',
            }}>{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
