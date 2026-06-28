'use client';

import { useEffect, useRef } from 'react';
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
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hide chapters 2 and 3 initially
      gsap.set(chapterRefs.current.slice(1), { opacity: 0, y: 40 });

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

      // Chapter 0 → Chapter 1
      tl.from(chapterRefs.current[0], { opacity: 0, y: 36, duration: 1 })
        .to(chapterRefs.current[0], { opacity: 0, y: -36, duration: 1 }, '+=0.6')
        .to(chapterRefs.current[1], { opacity: 1, y: 0, duration: 1 })
        // Chapter 1 → Chapter 2
        .to(chapterRefs.current[1], { opacity: 0, y: -36, duration: 1 }, '+=0.6')
        .to(chapterRefs.current[2], { opacity: 1, y: 0, duration: 1 })
        .to(chapterRefs.current[2], { opacity: 0, y: -36, duration: 1 }, '+=0.6');
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ backgroundColor: '#080808' }}>
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#080808',
        }}
      >
        {/* Subtle horizontal rule */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.08), transparent)',
          }}
        />

        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', padding: '0 clamp(28px, 8vw, 100px)' }}>
          {CHAPTERS.map((ch, i) => (
            <div
              key={i}
              ref={el => { chapterRefs.current[i] = el; }}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: i === 0 ? 'auto' : 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase',
                color: 'var(--gold)',
              }}>
                {ch.eyebrow}
              </p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: 'clamp(54px, 8vw, 114px)',
                lineHeight: 0.9,
                color: '#EDE8E0',
              }}>
                {ch.heading}
                <br />
                <em style={{ fontStyle: 'italic', color: 'rgba(237,232,224,0.6)', paddingLeft: '5%' }}>
                  {ch.italic}
                </em>
              </h2>

              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '14px', lineHeight: 1.8,
                color: 'var(--text-muted)',
                maxWidth: '480px',
              }}>
                {ch.body}
              </p>
            </div>
          ))}
        </div>

        {/* Chapter counter */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', right: 'clamp(20px, 4vw, 60px)', bottom: '40px',
            fontFamily: 'var(--font-inter)', fontSize: '9px', letterSpacing: '0.2em',
            color: 'var(--text-subtle)', textTransform: 'uppercase',
          }}
        >
          Private Mobility. Perfectly Delivered.
        </div>
      </div>
    </div>
  );
}
