'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion, useReducedMotion, useInView,
  useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue,
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

/* ════════════════════════════════════════════════════════════
   Entry — mobile = vertical pinned story · desktop = horizontal carousel
   ════════════════════════════════════════════════════════════ */
export default function CinematicScrollStory() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile ? <MobileStory /> : <DesktopCarousel />;
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
   MOBILE — vertical pinned 3D scroll-story deck (unchanged)
   ════════════════════════════════════════════════════════════ */
function MobileStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [vh, setVh] = useState(800);
  const [vw, setVw] = useState(390);

  useEffect(() => {
    const fn = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

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
        paddingTop: 'clamp(48px,9vh,84px)', paddingBottom: 'clamp(20px,4vh,40px)',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 42%, rgba(40,40,40,0.5), transparent 60%), ' +
            'radial-gradient(circle at 80% 12%, rgba(212,175,55,0.06), transparent 32%)',
        }} />

        <Heading inView compact />

        <div style={{ position: 'relative', flex: 1, width: '100%', zIndex: 1, marginTop: 'clamp(16px,3vh,28px)' }}>
          {CARDS.map((card, i) => (
            <MobileCard key={card.num} card={card} index={i} isActive={i === active} progress={scrollYProgress} cardW={cardW} cardH={cardH} vh={vh} />
          ))}
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`${CARDS[active].eyebrow}: ${CARDS[active].body}`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.5vh,22px)', marginTop: 'clamp(12px,2vh,20px)' }}>
          <Dots active={active} onSelect={scrollToCard} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '44px', padding: '0 30px',
              border: '1px solid rgba(212,175,55,0.45)', color: 'var(--gold)',
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11.6px', letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
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
      ? '0 40px 90px -30px rgba(0,0,0,0.92), inset 0 1px 0 rgba(255,255,255,0.08)'
      : '0 0 28px rgba(212,175,55,0.14), 0 20px 44px -24px rgba(0,0,0,0.72)',
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
        borderRadius: '16px', overflow: 'hidden', background: '#1a1a1a', willChange: 'transform',
      }}
    >
      {isActive ? (
        <CardFace card={card} activeW={cardW} large={false} />
      ) : (
        <>
          <Image src={card.image} alt="" fill sizes={`${cardW}px`} className="object-cover" style={{ filter: 'brightness(0.92)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.18) 34%, transparent 64%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '16px', boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.16), inset 0 1px 0 rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', top: '18px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '13.9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F6F2E9' }}>{card.label}</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(212,175,55,0.85)' }}>{card.num}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   DESKTOP — horizontal pinned cinematic carousel
   ════════════════════════════════════════════════════════════ */
function DesktopCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);

  const inView = useInView(sceneRef, { margin: '-20% 0px -20% 0px' });
  const hoverRef = useRef(false);
  const interactRef = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoRef = useRef(false);

  useEffect(() => {
    const fn = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // Smooth, heavy, deliberate motion — cards follow a springed progress, not raw scroll.
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 1 });

  // Active index updates once per segment (not every tick), from raw scroll for crisp dots.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.max(0, Math.min(N - 1, Math.round(v * (N - 1))));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const cardW = Math.min(1120, Math.round(vw * 0.78));
  const cardH = Math.min(660, Math.round(vh * 0.68));
  const spacing = Math.round(cardW * 0.52);

  const scrollToCard = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top + (i / (N - 1)) * total;
    autoRef.current = true;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => { autoRef.current = false; }, 900);
  };

  // Flag genuine user scroll so autoplay yields.
  useEffect(() => {
    const mark = () => {
      if (autoRef.current) return;
      interactRef.current = true;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => { interactRef.current = false; }, 2600);
    };
    window.addEventListener('wheel', mark, { passive: true });
    window.addEventListener('touchmove', mark, { passive: true });
    return () => {
      window.removeEventListener('wheel', mark);
      window.removeEventListener('touchmove', mark);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Autoplay — advance while pinned, in view, not hovered, not interacting.
  useEffect(() => {
    const id = setInterval(() => {
      if (!inView || hoverRef.current || interactRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return; // only while pinned
      scrollToCard(active >= N - 1 ? 0 : active + 1);
    }, 5500);
    return () => clearInterval(id);
  }, [active, inView]);

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="Alair Noir experience chapters"
      style={{ position: 'relative', height: `calc(100svh * ${N})`, backgroundColor: 'var(--bg)' }}
    >
      <div
        ref={sceneRef}
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
        style={{
          position: 'sticky', top: 0, height: '100svh', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          paddingTop: 'clamp(36px,5vh,64px)', paddingBottom: 'clamp(20px,4vh,40px)',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 44%, rgba(42,42,42,0.5), transparent 60%), ' +
            'radial-gradient(circle at 82% 12%, rgba(212,175,55,0.06), transparent 32%)',
        }} />

        <Heading inView={inView} compact />

        {/* Horizontal stage */}
        <div style={{
          position: 'relative', flex: 1, width: '100%', zIndex: 1,
          perspective: '1800px', perspectiveOrigin: '50% 50%',
        }}>
          {CARDS.map((card, i) => (
            <DesktopCard
              key={card.num}
              card={card}
              index={i}
              isActive={i === active}
              progress={smooth}
              cardW={cardW}
              cardH={cardH}
              spacing={spacing}
            />
          ))}
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`${CARDS[active].eyebrow}: ${CARDS[active].body}`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2.5vh,22px)', marginTop: 'clamp(12px,2vh,20px)' }}>
          <Dots active={active} onSelect={scrollToCard} />
        </div>
      </div>
    </section>
  );
}

const DESK_SPRING = { type: 'spring' as const, stiffness: 90, damping: 22, mass: 1.1 };

function DesktopCard({
  card, index, isActive, progress, cardW, cardH, spacing,
}: {
  card: FanCard; index: number; isActive: boolean;
  progress: MotionValue<number>; cardW: number; cardH: number; spacing: number;
}) {
  // r = floating active position - index. 0 = centered/active. r>0 = passed (left), r<0 = upcoming (right).
  const r = useTransform(progress, (v) => v * (N - 1) - index);

  const x = useTransform(
    r,
    [-3, -2, -1, 0, 1, 2, 3],
    [spacing * 2.2, spacing * 1.7, spacing, 0, -spacing, -spacing * 1.7, -spacing * 2.2],
  );
  const scale = useTransform(r, [-2, -1, 0, 1, 2], [0.8, 0.86, 1, 0.86, 0.8]);
  const rotateY = useTransform(r, [-2, -1, 0, 1, 2], [-34, -18, 0, 18, 34]);
  const opacity = useTransform(r, [-2.6, -2, -1, 0, 1, 2, 2.6], [0, 0.4, 0.78, 1, 0.78, 0.4, 0]);
  const zIndex = useTransform(r, (v) => Math.round(100 - Math.abs(v) * 10));
  const boxShadow = useTransform(r, (v) =>
    Math.abs(v) < 0.5
      ? '0 0 0 1px rgba(246,242,233,0.07), 0 0 60px -24px rgba(212,175,55,0.22)'
      : '0 0 34px -8px rgba(212,175,55,0.12)',
  );

  return (
    <motion.div
      role="group"
      aria-label={`Chapter ${card.num}: ${card.label}`}
      aria-hidden={!isActive}
      transition={DESK_SPRING}
      style={{
        position: 'absolute', left: 0, right: 0, marginInline: 'auto',
        top: '50%', marginTop: -(cardH / 2),
        width: cardW, height: cardH,
        x, scale, rotateY, opacity, zIndex, boxShadow,
        transformStyle: 'preserve-3d', borderRadius: '18px', overflow: 'hidden',
        background: '#1a1a1a', willChange: 'transform',
      }}
    >
      {isActive ? (
        <CardFace card={card} activeW={cardW} large />
      ) : (
        <>
          <Image src={card.image} alt="" fill sizes={`${cardW}px`} className="object-cover" style={{ filter: 'brightness(0.9)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.12) 36%, transparent 62%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '18px', boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.16), inset 0 1px 0 rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', top: '26px', left: '30px', right: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '16px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F6F2E9' }}>{card.label}</span>
            <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '13px', letterSpacing: '0.14em', color: 'rgba(212,175,55,0.85)' }}>{card.num}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   Expanded card face — cinematic active card
   ════════════════════════════════════════════════════════════ */
function CardFace({ card, activeW, large }: { card: FanCard; activeW: number; large: boolean }) {
  if (large) {
    /* Desktop — full-bleed cinematic image with a smoked-glass content panel */
    return (
      <div style={{ position: 'absolute', inset: 0, borderRadius: '18px', overflow: 'hidden', background: '#1a1a1a' }}>
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={card.image} alt={card.imageAlt} fill sizes={`${activeW}px`}
            className="object-cover" style={{ filter: 'brightness(1.06) contrast(1.03) saturate(1.04)' }} />
        </motion.div>

        {/* very light readability wash — keep the image visible */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 24%, transparent 52%, rgba(0,0,0,0.18) 100%)',
        }} />

        {/* subtle gold edge glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
          boxShadow: 'inset 0 0 0 1px rgba(246,242,233,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
        }} />

        {/* counter badge */}
        <div style={{ position: 'absolute', top: '24px', left: '28px', zIndex: 3 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '11px', letterSpacing: '0.16em',
            color: 'rgba(246,242,233,0.85)', background: 'rgba(12,12,12,0.42)', backdropFilter: 'blur(18px)',
            border: '1px solid rgba(246,242,233,0.12)', borderRadius: '999px', padding: '6px 14px',
          }}>{card.num}&ensp;/&ensp;08</span>
        </div>

        {/* smoked-glass content panel */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2,
          padding: 'clamp(24px,2.4vw,42px) clamp(30px,3vw,60px)',
          background: 'rgba(12,12,12,0.42)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          borderTop: '1px solid rgba(246,242,233,0.08)',
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <div style={{ maxWidth: '760px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '11.5px',
              letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px',
            }}>{card.eyebrow}</p>
            <h3 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(34px,3vw,54px)', lineHeight: 0.94, color: '#F6F2E9', marginBottom: '12px',
            }}>
              {card.heading}{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.66)' }}>{card.italic}</em>
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: 'clamp(14px,1vw,16px)',
              lineHeight: 1.75, color: 'rgba(246,242,233,0.82)', maxWidth: '640px',
            }}>{card.body}</p>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px',
            paddingTop: '16px', marginTop: '4px', borderTop: '1px solid rgba(246,242,233,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '3px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11.5px', color: 'var(--gold)',
                background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.32)',
              }}>✓</span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '14px',
                color: 'rgba(246,242,233,0.82)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{card.preview}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '9px', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', flexShrink: 0,
            }}>{card.label}</span>
          </div>
        </div>
      </div>
    );
  }

  /* Mobile — image-top / content-bottom (unchanged) */
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', borderRadius: '14px', background: '#1c1c1c',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none', borderRadius: '14px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.09), transparent 18%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)',
      }} />
      <div style={{ position: 'relative', flex: '0 0 56%', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image src={card.image} alt={card.imageAlt} fill sizes={`${activeW}px`}
            className="object-cover" style={{ filter: 'brightness(1.08) contrast(1.04) saturate(1.05)' }} />
        </motion.div>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 70%, rgba(28,28,28,0.9) 100%)',
        }} />
        <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 2 }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: '9.3px', letterSpacing: '0.16em',
            color: 'rgba(246,242,233,0.7)', background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: '999px', padding: '4px 11px',
          }}>{card.num}&ensp;/&ensp;08</span>
        </div>
      </div>

      <div style={{
        flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '18px 20px 16px', background: '#1c1c1c', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-6px', bottom: '-18px',
          fontFamily: 'var(--font-cormorant)', fontSize: '112px', fontWeight: 300, lineHeight: 1,
          color: 'rgba(212,175,55,0.07)', userSelect: 'none', pointerEvents: 'none',
        }}>{card.num}</div>
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.85), transparent)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: '9.6px',
            letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '10px',
          }}>{card.eyebrow}</p>
          <h3 style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(30px,8vw,38px)', lineHeight: 0.92, color: '#F6F2E9', marginBottom: '12px',
          }}>
            {card.heading}<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)' }}>{card.italic}</em>
          </h3>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '13px',
            lineHeight: 1.8, color: 'rgba(246,242,233,0.74)',
          }}>{card.body}</p>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{
              width: '16px', height: '16px', borderRadius: '3px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10.4px', color: 'var(--gold)',
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
            }}>✓</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300, fontSize: '12.6px',
              color: 'rgba(246,242,233,0.72)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{card.preview}</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8.1px', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(246,242,233,0.26)',
            }}>Alair Noir</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '8.1px', letterSpacing: '0.12em',
              color: 'rgba(212,175,55,0.5)',
            }}>{card.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
