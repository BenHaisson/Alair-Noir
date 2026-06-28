'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cinematicChapters } from '@/lib/chapters';
import { scrollChapterEnd } from '@/lib/motion';

export default function CinematicScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (shouldReduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const chapters = chapterRefs.current.filter((chapter): chapter is HTMLDivElement => Boolean(chapter));
      const routePath = routePathRef.current;
      const pathLength = routePath?.getTotalLength() ?? 0;

      gsap.set(chapters, { opacity: 0, y: 46, filter: 'blur(12px)' });
      gsap.set(chapters[0], { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

      if (routePath) {
        gsap.set(routePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: scrollChapterEnd(cinematicChapters.length),
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 1.35,
          anticipatePin: 1,
        },
      });

      const step = 1.45;
      const total = cinematicChapters.length * step;

      tl.to(progressRef.current, { scaleX: 1, ease: 'none', duration: total }, 0);

      chapters.forEach((chapter, index) => {
        if (index === 0) return;
        const at = index * step;
        tl.to(chapters[index - 1], { opacity: 0, y: -42, filter: 'blur(12px)', duration: 0.72 }, at - 0.5)
          .to(chapter, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.94 }, at);
      });

      if (routePath) {
        tl.to(routePath, { opacity: 0.78, duration: 0.4 }, step * 4 - 0.4)
          .to(routePath, { strokeDashoffset: 0, duration: 1.5, ease: 'none' }, step * 4 - 0.2)
          .to(routePath, { opacity: 0.18, duration: 0.8 }, step * 5.6);
      }

      tl.to(chapters[chapters.length - 1], { opacity: 0.28, y: -16, filter: 'blur(3px)', duration: 0.75 }, total - 0.25);
    }, wrapRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section ref={wrapRef} aria-label="Cinematic journey chapters" style={{ backgroundColor: 'var(--bg)' }}>
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
          background:
            'radial-gradient(circle at 74% 48%, rgba(14,31,22,0.72), transparent 34%), linear-gradient(110deg, var(--bg) 0%, #0A0A0A 48%, var(--forest) 100%)',
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
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.08), transparent)',
          }}
        />

        {!shouldReduceMotion && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '12% clamp(20px, 4vw, 60px)',
                border: '1px solid rgba(212,175,55,0.06)',
                pointerEvents: 'none',
              }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 720 420"
              preserveAspectRatio="xMidYMid meet"
              style={{
                position: 'absolute',
                right: 'clamp(20px,7vw,120px)',
                top: '50%',
                width: 'min(44vw, 560px)',
                transform: 'translateY(-50%)',
                opacity: 0.55,
              }}
            >
              <path
                ref={routePathRef}
                d="M86 274 C156 206 196 192 258 218 C318 244 348 182 414 168 C484 152 512 108 616 132"
                fill="none"
                stroke="rgba(212,175,55,0.82)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {[
                ['Zurich', 86, 274],
                ['Davos', 258, 218],
                ['St. Moritz', 414, 168],
                ['Milan', 616, 132],
              ].map(([city, x, y]) => (
                <g key={city} transform={`translate(${x} ${y})`}>
                  <circle r="3" fill="rgba(212,175,55,0.78)" />
                  <text x="10" y="-8" fill="rgba(246,242,233,0.32)" fontSize="12" letterSpacing="2">
                    {city}
                  </text>
                </g>
              ))}
            </svg>
          </>
        )}

        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', padding: '0 clamp(28px, 8vw, 100px)', zIndex: 1 }}>
          {cinematicChapters.map((ch, i) => (
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
                  color: 'var(--text)',
                }}
              >
                {ch.heading}
                <br />
                <em style={{ fontStyle: 'italic', color: 'rgba(246,242,233,0.6)', paddingLeft: '5%' }}>
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
                  maxWidth: '500px',
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
            backgroundColor: 'rgba(246,242,233,0.08)',
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
                'linear-gradient(90deg, rgba(212,175,55,0.12), rgba(212,175,55,0.9), rgba(246,242,233,0.56))',
              boxShadow: '0 0 18px rgba(212,175,55,0.2)',
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
          Scroll Chapters 01-08
        </div>
      </div>
    </section>
  );
}
