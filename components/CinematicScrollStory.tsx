'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CHAPTERS = [
  {
    eyebrow: '01 — The Standard',
    heading: 'Two vehicles.',
    italic: 'One standard.',
    body: 'Not a fleet. Not a platform. Two vehicles, maintained to the highest specification and operated by one driver who knows your preferences.',
  },
  {
    eyebrow: '02 — The Silence',
    heading: 'Silence',
    italic: 'as a luxury.',
    body: 'The BMW i7 xDrive60 is fully electric. No engine noise. No vibration. Only the road, the mountains, and the meeting you are preparing for.',
  },
  {
    eyebrow: '03 — The Journey',
    heading: 'Zürich to',
    italic: 'wherever.',
    body: 'Airport transfers, WEF in Davos, Art Basel in Basel, a board dinner in Milan. Door to door across Switzerland and Europe.',
  },
];

export default function CinematicScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (shouldReduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const chapters = chapterRefs.current.filter(Boolean);

      gsap.set(chapters, { opacity: 0, y: 44, filter: 'blur(10px)' });
      gsap.set(chapters[0], { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=280%',
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      tl.to(progressRef.current, { scaleX: 1, ease: 'none', duration: 6 }, 0)
        .to(chapters[0], { opacity: 0, y: -42, filter: 'blur(10px)', duration: 0.9 }, 1.1)
        .to(chapters[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 1.65)
        .to(chapters[1], { opacity: 0, y: -42, filter: 'blur(10px)', duration: 0.9 }, 3.05)
        .to(chapters[2], { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }, 3.6)
        .to(chapters[2], { opacity: 0.22, y: -18, filter: 'blur(3px)', duration: 0.75 }, 5.25);
    }, wrapRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div ref={wrapRef} style={{ backgroundColor: '#080808' }}>
      <div
        ref={stickyRef}
        style={{
          minHeight: shouldReduceMotion ? 'auto' : '100vh',
          height: shouldReduceMotion ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#080808',
          padding: shouldReduceMotion ? 'clamp(84px, 12vw, 150px) 0' : 0,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.08), transparent)',
          }}
        />

        {!shouldReduceMotion && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '12% clamp(20px, 4vw, 60px)',
              border: '1px solid rgba(201,168,76,0.06)',
              pointerEvents: 'none',
            }}
          />
        )}

        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', padding: '0 clamp(28px, 8vw, 100px)' }}>
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.eyebrow}
              ref={(el) => { chapterRefs.current[i] = el; }}
              style={{
                position: shouldReduceMotion || i === 0 ? 'relative' : 'absolute',
                inset: shouldReduceMotion || i === 0 ? 'auto' : 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginTop: shouldReduceMotion && i > 0 ? '56px' : 0,
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
                }}
              >
                {ch.eyebrow}
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(54px, 8vw, 114px)',
                  lineHeight: 0.9,
                  color: '#EDE8E0',
                }}
              >
                {ch.heading}
                <br />
                <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)', paddingLeft: '5%' }}>
                  {ch.italic}
                </em>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  maxWidth: '480px',
                }}
              >
                {ch.body}
              </p>
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 'clamp(20px, 4vw, 60px)',
            right: 'clamp(20px, 4vw, 60px)',
            bottom: '84px',
            height: '1px',
            backgroundColor: 'rgba(237,232,224,0.08)',
            overflow: 'hidden',
            display: shouldReduceMotion ? 'none' : 'block',
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: '100%',
              height: '100%',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              background:
                'linear-gradient(90deg, rgba(201,168,76,0.12), rgba(201,168,76,0.9), rgba(237,232,224,0.56))',
              boxShadow: '0 0 18px rgba(201,168,76,0.24)',
            }}
          />
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(20px, 4vw, 60px)',
            bottom: '40px',
            fontFamily: 'var(--font-inter)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'var(--text-subtle)',
            textTransform: 'uppercase',
          }}
        >
          Private Mobility. Perfectly Delivered.
        </div>
      </div>
    </div>
  );
}
