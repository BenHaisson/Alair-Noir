'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';

const chapters = [
  {
    id: 'route',
    number: '01',
    label: 'The Route',
    heading: 'Every Kilometre,\nConsidered',
    body: 'From Zurich Airport to the city, from Geneva to St. Moritz — we know every road, every shortcut, every scenic alternative. Your driver arrives prepared.',
    image: '/images/service-airport-transfer-zurich.jpg',
    tags: ['ZRH Airport', 'GVA Airport', 'Basel SBB', 'St. Moritz', 'Davos', 'Zug'],
    right: false,
  },
  {
    id: 'discretion',
    number: '02',
    label: 'Discretion',
    heading: 'Quiet Confidence,\nEverywhere',
    body: 'No logos on the vehicle. No uniform that announces itself. Our drivers understand that the best service is the kind that goes unnoticed — until it matters.',
    image: '/images/about-chauffeur-alps-jet.jpg',
    tags: ['NDA Available', 'Private Routes', 'Secure Comms'],
    right: true,
  },
  {
    id: 'fleet',
    number: '03',
    label: 'The Fleet',
    heading: 'Crafted for\nthe Journey',
    body: 'Mercedes S-Class, BMW 7 Series, and the Rolls-Royce Ghost — a curated selection maintained to showroom standard. Your comfort is the specification.',
    image: '/images/service-corporate-chauffeur-zurich.jpg',
    tags: ['Mercedes S-Class', 'BMW 7 Series', 'Rolls-Royce Ghost', 'Sprinter VIP'],
    right: false,
  },
];

function ChapterTags({ tags }: { tags: string[] }) {
  return (
    <div className="chapter-tags">
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </div>
  );
}

export function ScrollJourney() {
  return (
    <section className="story-shell" id="about">
      {chapters.map((ch, idx) => (
        <article
          key={ch.id}
          className={`story-chapter${ch.right ? ' story-chapter--right' : ''}`}
        >
          <Reveal delay={0} className="chapter-copy">
            <p className="eyebrow">{ch.label}</p>
            <span className="chapter-count">{ch.number}</span>

            <SplitText
              text={ch.heading.replace('\n', ' ')}
              as="h2"
              delay={0.1}
              staggerDelay={0.04}
            />

            <Reveal delay={0.25}>
              <p>{ch.body}</p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="chapter-photo chapter-photo--route">
                <Image
                  src={ch.image}
                  alt={ch.heading}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.82, filter: 'saturate(0.78) contrast(1.05)' }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            <ChapterTags tags={ch.tags} />
          </Reveal>
        </article>
      ))}
    </section>
  );
}
