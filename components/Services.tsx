'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  { n: '01', title: 'Airport Transfers',          desc: 'Punctual collection from Zurich, Geneva, Basel-Mulhouse, and all major Swiss airports. Flight tracking included.', tag: 'ZRH · GVA · BSL · MXP' },
  { n: '02', title: 'Corporate Chauffeur',         desc: 'Dedicated executive mobility for board members, management teams, and business guests — across the city or across borders.', tag: 'Daily · Monthly · Retainer' },
  { n: '03', title: 'VIP & Delegation Transport',  desc: 'Coordinated multi-vehicle logistics for government officials, diplomatic missions, and high-profile private delegations.', tag: 'Secure · Discreet · Coordinated' },
  { n: '04', title: 'Private Events',              desc: 'Weddings, galas, private dinners, and exclusive events — your guests arrive in silence and style.', tag: 'Weddings · Galas · Premieres' },
  { n: '05', title: 'Secure Document Transfer',    desc: 'Time-critical documents, valuables, and confidential materials delivered with chain-of-custody care.', tag: 'Legal · Financial · Medical' },
  { n: '06', title: 'Long Distance Travel',        desc: 'Zurich to Geneva, Munich, Milan, or beyond — intercity and cross-border routes handled with full discretion.', tag: 'Switzerland · Europe' },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 md:py-36"
      style={{ background: 'var(--platinum)', borderTop: '1px solid var(--border-light)' }}
    >
      <div className="an-container">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-[540px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-inter text-gold text-[9px] tracking-[0.28em] uppercase mb-5 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-gold opacity-60" />
            Services
          </p>
          <h2
            className="font-cormorant font-light tracking-[-0.04em] leading-[0.94]"
            style={{ fontSize: 'clamp(40px, 4.8vw, 72px)', color: 'var(--graphite)' }}
          >
            Every form of
            <br />
            <em className="italic" style={{ color: 'var(--slate)' }}>private mobility.</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: '1px solid var(--border-light)', borderLeft: '1px solid var(--border-light)' }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              className="group relative p-8 md:p-9 overflow-hidden"
              style={{
                borderRight: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                background: 'var(--parchment)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'var(--parchment)'; }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gold bottom line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-gold"
                style={{ width: 0, transition: 'width 0.5s ease' }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.parentElement!;
                  parent.addEventListener('mouseenter', () => { el.style.width = '100%'; });
                  parent.addEventListener('mouseleave', () => { el.style.width = '0'; });
                }}
              />

              <p className="font-inter text-gold text-[9px] tracking-[0.22em] mb-5">{s.n}</p>
              <h3
                className="font-cormorant font-light tracking-[-0.02em] leading-[1.05] mb-4"
                style={{ fontSize: '26px', color: 'var(--graphite)' }}
              >
                {s.title}
              </h3>
              <p
                className="font-inter text-[12px] font-light leading-[1.72] mb-5"
                style={{ color: 'var(--slate)' }}
              >
                {s.desc}
              </p>
              <p
                className="font-inter text-[9px] tracking-[0.14em] uppercase"
                style={{ color: 'var(--stone)' }}
              >
                {s.tag}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
