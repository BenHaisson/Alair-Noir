'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { cinematicEase } from '@/lib/motion';

/* ── Editorial content ──────────────────────────────────────────── */

type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
  date: string;
};

const FEATURED: Article = {
  id: 'art-of-arriving',
  category: 'Philosophy',
  title: 'The Art of Arriving Unhurried',
  excerpt:
    'A journey is not measured in kilometres but in composure. We consider the minutes before a meeting as carefully as the route itself — because how one arrives is rarely forgotten.',
  image: '/images/bmw-i7-zurich.png',
  readingTime: '6 min',
  date: 'June 2026',
};

const ARTICLES: Article[] = [
  {
    id: 'silence-as-service',
    category: 'Standard',
    title: 'Silence as a Service',
    excerpt:
      'The most considered detail in the cabin is the one you never notice. On discretion, restraint, and the quiet that lets the day continue.',
    image: '/images/bmw-i7-cockpit-night.png',
    readingTime: '4 min',
    date: 'June 2026',
  },
  {
    id: 'davos-in-winter',
    category: 'Routes',
    title: 'Davos, in Winter',
    excerpt:
      'The climb from Zürich to the Landwasser valley is two hours of changing light. A route worth slowing down for — and how we prepare for it.',
    image: '/images/bmw-i7-executive-lounge.png',
    readingTime: '5 min',
    date: 'May 2026',
  },
  {
    id: 'why-the-i7',
    category: 'Fleet',
    title: 'Why We Chose the i7',
    excerpt:
      'An electric flagship asks different questions of a chauffeur. On rear-cabin stillness, range as reassurance, and the case for silence at speed.',
    image: '/images/bmw-i7-black-studio.png',
    readingTime: '7 min',
    date: 'May 2026',
  },
  {
    id: 'rear-cabin',
    category: 'Interiors',
    title: 'Designing the Rear Cabin',
    excerpt:
      'Temperature, scent, light, and reach — the small geometry of comfort. The decisions made before a single guest sits down.',
    image: '/images/bmw-i7-rear-theatre.png',
    readingTime: '5 min',
    date: 'April 2026',
  },
  {
    id: 'zurich-after-midnight',
    category: 'City',
    title: 'Zürich After Midnight',
    excerpt:
      'The city keeps a second, quieter timetable. A chauffeur’s notes on late departures, last flights, and the streets when they finally empty.',
    image: '/images/chauffeur-arrival.png',
    readingTime: '4 min',
    date: 'April 2026',
  },
  {
    id: 'travelling-as-a-delegation',
    category: 'Corporate',
    title: 'Travelling as a Delegation',
    excerpt:
      'Moving several principals as one requires choreography, not luck. On convoys, timing, and the V-Class as a discreet second room.',
    image: '/images/mercedes-v-class-cabin-rear.png',
    readingTime: '6 min',
    date: 'March 2026',
  },
];

/* ── Shared eyebrow label ───────────────────────────────────────── */

function Eyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-inter)',
        fontWeight: 300,
        fontSize: '10.4px',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ── Masthead ───────────────────────────────────────────────────── */

function Masthead() {
  return (
    <header
      style={{
        position: 'relative',
        padding: 'clamp(140px,16vw,220px) 0 clamp(48px,6vw,80px)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: '#0A0A0A',
      }}
    >
      <div style={{ padding: '0 clamp(20px,5vw,80px)', maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: cinematicEase }}
        >
          <Eyebrow>The Journal</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: cinematicEase }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(54px,8vw,132px)',
            lineHeight: 0.94,
            color: '#F6F2E9',
            marginTop: '22px',
            maxWidth: '14ch',
          }}
        >
          Notes from the{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.6)' }}>quiet hours</em>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
            fontSize: '16.2px',
            lineHeight: 1.8,
            color: 'var(--text-muted)',
            maxWidth: '560px',
            marginTop: '28px',
          }}
        >
          Reflections on movement, discretion, and the road — written between
          journeys across Zürich, the Alps, and Europe.
        </motion.p>
      </div>
    </header>
  );
}

/* ── Featured article ───────────────────────────────────────────── */

function Featured({ article }: { article: Article }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Featured story"
      style={{ backgroundColor: '#0A0A0A', padding: 'clamp(64px,8vw,120px) 0' }}
    >
      <div
        style={{
          padding: '0 clamp(20px,5vw,80px)',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'center',
        }}
        className="an-featured-grid"
      >
        {/* Image */}
        <motion.a
          href={`#${article.id}`}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: cinematicEase }}
          style={{
            position: 'relative',
            display: 'block',
            overflow: 'hidden',
            aspectRatio: '16 / 11',
            border: '1px solid var(--border)',
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector('img');
            if (img) (img as HTMLElement).style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('img');
            if (img) (img as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(8,8,8,0) 55%, rgba(8,8,8,0.55) 100%)',
            }}
          />
        </motion.a>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: cinematicEase }}
          style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Eyebrow>Featured</Eyebrow>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: '10.4px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
              }}
            >
              {article.category}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(38px,4.4vw,72px)',
              lineHeight: 0.98,
              color: '#F6F2E9',
            }}
          >
            {article.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '16.2px',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              maxWidth: '46ch',
            }}
          >
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '4px' }}>
            <a
              href={`#${article.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '46px',
                padding: '0 32px',
                backgroundColor: 'var(--gold)',
                color: '#0A0A0A',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                fontSize: '11.6px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                transition: 'opacity 0.25s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Read the story
            </a>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
              }}
            >
              {article.date} · {article.readingTime}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Article card ───────────────────────────────────────────────── */

function ArticleCard({ article, index, inView }: { article: Article; index: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.08 + index * 0.07, ease: cinematicEase }}
      style={{
        position: 'relative',
        borderRight: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: '#0A0A0A',
        transition: 'background 0.35s',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ backgroundColor: '#121212' } as Parameters<typeof motion.article>[0]['whileHover']}
    >
      <a
        href={`#${article.id}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) (img as HTMLElement).style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) (img as HTMLElement).style.transform = 'scale(1)';
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3 / 2' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(8,8,8,0) 60%, rgba(8,8,8,0.5) 100%)',
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            padding: 'clamp(24px,2.6vw,36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Eyebrow style={{ fontSize: '9.6px', letterSpacing: '0.22em' }}>{article.category}</Eyebrow>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: '9.6px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
              }}
            >
              {article.readingTime}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(25.5px,2.2vw,34px)',
              lineHeight: 1.04,
              color: '#F6F2E9',
            }}
          >
            {article.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '14.4px',
              lineHeight: 1.75,
              color: 'var(--text-muted)',
            }}
          >
            {article.excerpt}
          </p>

          <span
            style={{
              marginTop: 'auto',
              paddingTop: '8px',
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '10.4px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-subtle)',
              transition: 'color 0.2s',
            }}
          >
            Read · {article.date}
          </span>
        </div>
      </a>

      {/* Gold top accent on hover */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'var(--gold)',
          transformOrigin: 'left',
          pointerEvents: 'none',
        }}
      />
    </motion.article>
  );
}

/* ── Article grid ───────────────────────────────────────────────── */

function ArticleGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      aria-label="Latest writing"
      style={{ backgroundColor: '#08130D', padding: 'clamp(72px,10vw,140px) 0' }}
    >
      <div style={{ padding: '0 clamp(20px,5vw,80px)', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(36px,4vw,56px)' }}>
          <Eyebrow>Latest</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(42px,5vw,104px)',
              lineHeight: 0.94,
              color: '#F6F2E9',
              marginTop: '16px',
            }}
          >
            Written between journeys.
          </h2>
        </div>

        <div
          ref={ref}
          className="an-journal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          {ARTICLES.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pull quote ─────────────────────────────────────────────────── */

function PullQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(96px,12vw,180px) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <motion.blockquote
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: cinematicEase }}
        style={{
          padding: '0 clamp(20px,5vw,80px)',
          maxWidth: '1080px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(30px,4.2vw,60px)',
            lineHeight: 1.18,
            color: '#F6F2E9',
          }}
        >
          “Luxury is rarely loud. It is the absence of friction —
          the sense that everything difficult was handled before you noticed it.”
        </p>
        <footer style={{ marginTop: '28px' }}>
          <Eyebrow>Alair Noir — The Standard</Eyebrow>
        </footer>
      </motion.blockquote>
    </section>
  );
}

/* ── Closing CTA ────────────────────────────────────────────────── */

function ClosingCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#08130D', padding: 'clamp(80px,11vw,160px) 0' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: cinematicEase }}
        style={{
          padding: '0 clamp(20px,5vw,80px)',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '26px',
        }}
      >
        <Eyebrow>Reserve a Journey</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(40px,5vw,92px)',
            lineHeight: 0.96,
            color: '#F6F2E9',
            maxWidth: '18ch',
          }}
        >
          The next chapter is{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.6)' }}>yours to write</em>.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
            fontSize: '16.2px',
            lineHeight: 1.8,
            color: 'var(--text-muted)',
            maxWidth: '52ch',
          }}
        >
          When the reading is done, the road remains. Arrange a private transfer
          across Zürich, the Alps, or Europe — handled directly and discreetly.
        </p>
        <Link
          href="/#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            padding: '0 34px',
            marginTop: '8px',
            backgroundColor: 'var(--gold)',
            color: '#0A0A0A',
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            fontSize: '11.6px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            transition: 'opacity 0.25s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          Request Availability
        </Link>
      </motion.div>
    </section>
  );
}

/* ── Page composition ───────────────────────────────────────────── */

export default function JournalEditorial() {
  return (
    <main id="main-content">
      <Masthead />
      <Featured article={FEATURED} />
      <ArticleGrid />
      <PullQuote />
      <ClosingCta />

      <style>{`
        @media (max-width: 860px) {
          .an-featured-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) and (min-width: 681px) {
          .an-journal-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .an-journal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
