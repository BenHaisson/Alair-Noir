'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { luxuryEase } from '@/lib/motion';

const fleet = [
  {
    id: 'sclass',
    name: 'Mercedes S-Class',
    category: 'Executive Sedan',
    desc: 'The benchmark of executive travel. Massaging seats, ambient lighting, and the silence of a whisper-quiet cabin. Perfect for airport transfers and city runs.',
    pax: '3 Passengers',
    luggage: '3 Cases',
    accent: '#21F1A8',
  },
  {
    id: 'bmw7',
    name: 'BMW 7 Series',
    category: 'Premium Sedan',
    desc: "Elegant and athletic. Sky Lounge panoramic roof, executive rear entertainment, and a driver's car that never feels like anything less than first class.",
    pax: '3 Passengers',
    luggage: '3 Cases',
    accent: '#21F1A8',
  },
  {
    id: 'vclass',
    name: 'Mercedes V-Class',
    category: 'Executive Van',
    desc: 'When the party grows. Up to 6 passengers in true luxury — individual captain seats, privacy glass, and full connectivity. Corporate groups and family transfers.',
    pax: '6 Passengers',
    luggage: '6 Cases',
    accent: '#21F1A8',
  },
  {
    id: 'ghost',
    name: 'Rolls-Royce Ghost',
    category: 'Ultra-Luxury',
    desc: 'For moments that demand something extraordinary. The Rolls-Royce Ghost elevates any occasion — weddings, galas, and arrivals that make an impression.',
    pax: '3 Passengers',
    luggage: '2 Cases',
    accent: '#21F1A8',
  },
];

const routeNodes = [
  'ZRH → Zurich City',
  'GVA → Geneva CBD',
  'ZRH → St. Moritz',
  'Basel → Zurich',
  'Zurich → Davos',
  'ZRH → Lugano',
];

export function Fleet() {
  const [selected, setSelected] = useState(0);
  const vehicle = fleet[selected];

  return (
    <section className="fleet-section" id="fleet">
      <div className="section-header">
        <Reveal>
          <p className="eyebrow">The Fleet</p>
        </Reveal>
        <SplitText
          text="Engineered Comfort"
          as="h2"
          delay={0.1}
          staggerDelay={0.05}
        />
      </div>

      <div className="fleet-selector">
        <nav className="fleet-list" aria-label="Vehicle selection">
          {fleet.map((v, i) => (
            <button
              key={v.id}
              className={`fleet-option${selected === i ? ' fleet-option--selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {v.name}
              <i />
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            className="fleet-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.55, ease: luxuryEase }}
          >
            <p className="eyebrow">{vehicle.category}</p>
            <h3>{vehicle.name}</h3>
            <p>{vehicle.desc}</p>
            <span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="7" cy="7" r="6" />
                <path d="M7 4v3l2 2" />
              </svg>
              {vehicle.pax} &nbsp;·&nbsp; {vehicle.luggage}
            </span>

            <div className="route-nodes" style={{ marginTop: 24 }}>
              {routeNodes.map((node, i) => (
                <button key={i} className="route-node">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {node}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <a href="#book" className="button button--gold button--small">Request This Vehicle</a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
