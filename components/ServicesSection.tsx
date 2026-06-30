'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  { n: '01', title: 'Airport Transfer',      body: 'Zürich Airport transfers with flight tracking, direct communication, luggage handling, and calm curbside timing.', bestFor: 'ZRH arrivals · Departures · Guest pickup · Executive travel' },
  { n: '02', title: 'Corporate & Executive', body: 'Discreet transport for executives, board members, clients, and leadership teams.', bestFor: 'Meetings · Roadshows · Client visits · Confidential schedules' },
  { n: '03', title: 'Long Distance',         body: 'Door-to-door private travel across Switzerland and selected European routes.', bestFor: 'Davos · St. Moritz · Geneva · Basel · Milan · Munich' },
  { n: '04', title: 'Hourly Disposition',    body: 'Vehicle retained by the hour for multi-stop business days and flexible private schedules.', bestFor: 'Meetings · Shopping · Events · City-to-city schedules' },
  { n: '05', title: 'WEF / Davos / Events',  body: 'Prepared transport for international events, high-demand dates, and VIP movements.', bestFor: 'WEF Davos · Art Basel · Zürich Film Festival · Private events' },
  { n: '06', title: 'Private Client',        body: 'A direct chauffeur relationship for returning clients whose preferences should not need repeating.', bestFor: 'Family offices · HNW clients · Regular travellers · Private guests' },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      style={{ backgroundColor: '#0A0A0A', padding: 'clamp(80px,10vw,160px) 0' }}
    >
      {/* Header */}
      <div style={{ padding: '0 clamp(28px,8vw,140px)', marginBottom: '60px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '10.4px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '16px',
          }}
        >
          Services
        </motion.p>
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-cormorant)', fontWeight: 300,
            fontSize: 'clamp(48.7px,5.5vw,92.8px)',
            lineHeight: 0.92, color: '#F6F2E9',
          }}
        >
          Private mobility,
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(246, 242, 233,0.62)', paddingLeft: '5%' }}>
            arranged around the moment.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '16.2px', lineHeight: 1.8, color: 'var(--text-muted)',
            maxWidth: '560px', marginTop: '24px',
          }}
        >
          From airport arrivals to multi-day executive schedules, each journey is handled directly and discreetly.
        </motion.p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.n}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            style={{
              position: 'relative',
              backgroundColor: '#0A0A0A',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              padding: 'clamp(28px,3.5vw,48px)',
              display: 'flex', flexDirection: 'column', gap: '20px',
              cursor: 'default',
              overflow: 'hidden',
              transition: 'background 0.35s',
            }}
            whileHover={{ backgroundColor: '#141414' } as Parameters<typeof motion.article>[0]['whileHover']}
          >
            {/* Gold top accent line on hover */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '1px', backgroundColor: 'var(--gold)',
                transformOrigin: 'left',
              }}
            />

            <span style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '10.4px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              {s.n}
            </span>

            <h3 style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 300,
              fontSize: 'clamp(25.5px,2.2vw,37.1px)', lineHeight: 1.05,
              color: '#F6F2E9',
            }}>
              {s.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '15.1px', lineHeight: 1.75,
              color: 'var(--text-muted)',
            }}>
              {s.body}
            </p>

            <div style={{ marginTop: 'auto' }}>
              <p style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '9.3px', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--text-subtle)', marginBottom: '6px',
              }}>
                Best for
              </p>
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: '17.4px', lineHeight: 1.4, color: 'var(--text-muted)',
              }}>
                {s.bestFor}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: 'clamp(40px,5vw,64px) clamp(28px,8vw,140px) 0', display: 'flex', justifyContent: 'center' }}>
        <a href="#contact" className="an-button an-button-secondary">
          Request Availability
        </a>
      </div>

      {/* Mobile: override to 1 col */}
      <style>{`
        @media (max-width: 768px) {
          #services > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          #services > div:last-of-type {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
