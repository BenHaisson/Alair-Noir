'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

type Card = {
  title: string;
  body: string;
  meta?: string;
};

type ImageSlide = {
  src: string;
  alt: string;
  caption: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

const pillars: Card[] = [
  {
    meta: '01',
    title: 'Timing',
    body: 'Pickup rhythm, route planning, waiting time, and handover are considered before the journey begins.',
  },
  {
    meta: '02',
    title: 'Privacy',
    body: 'Passenger details, routes, schedules, and instructions are handled with discretion by default.',
  },
  {
    meta: '03',
    title: 'Presence',
    body: 'The vehicle, cabin, communication, and arrival posture are prepared to represent the client properly.',
  },
  {
    meta: '04',
    title: 'Composure',
    body: 'The cabin becomes a private interval between obligations, quiet enough to think, call, read, rest, or reset.',
  },
  {
    meta: '05',
    title: 'Precision',
    body: 'Details are confirmed clearly, executed quietly, and adjusted when the schedule changes.',
  },
];

const audiences: Card[] = [
  {
    title: 'CEOs & Founders',
    body: 'For those moving between decisions, meetings, investors, hotels, airports, and private obligations where the day cannot feel improvised.',
  },
  {
    title: 'Executives',
    body: 'For board meetings, client visits, roadshows, airport arrivals, corporate dinners, and schedules where timing matters.',
  },
  {
    title: 'Private Clients',
    body: 'For residence transfers, hotels, restaurants, appointments, shopping, private events, and long-distance travel handled without exposure.',
  },
  {
    title: 'Family Offices',
    body: 'For principals, relatives, guests, luggage-heavy airport arrivals, recurring schedules, and cross-border journeys.',
  },
  {
    title: 'Executive Assistants',
    body: 'For clear confirmations, reliable communication, vehicle recommendation, route details, and professional handling on behalf of someone else.',
  },
  {
    title: 'Corporate Guests',
    body: 'For visiting clients, senior leadership, investors, delegations, and event guests who should be received with control.',
  },
];

const airportCards: Card[] = [
  {
    title: 'For Arrivals',
    body: 'Prepared around landing time, passenger flow, luggage, meeting point, and onward route.',
  },
  {
    title: 'For Departures',
    body: 'Pickup timing is planned around distance, terminal rhythm, check-in requirements, and comfort.',
  },
  {
    title: 'For Guests',
    body: 'Principals, executives, family members, corporate visitors, and private guests are received with quiet professionalism.',
  },
  {
    title: 'For Onward Routes',
    body: 'Zurich Airport to Davos, St. Moritz, Basel, Lucerne, Geneva, Gstaad, Milan, Munich, and selected European destinations.',
  },
];

const cabinSlides: ImageSlide[] = [
  { src: '/images/bmw-i7-executive-lounge.png', alt: 'BMW i7 executive rear cabin', caption: 'Executive lounge' },
  { src: '/images/bmw-i7-cockpit-night.png', alt: 'BMW i7 ambient night cockpit', caption: 'Ambient privacy' },
  { src: '/images/bmw-i7-rear-theatre.png', alt: 'BMW i7 rear cabin theatre display', caption: 'Rear cabin focus' },
  { src: '/images/bmw-i7-private-office.png', alt: 'BMW i7 private office cabin', caption: 'Business preparation' },
  { src: '/images/mercedes-v-class-cabin-seats.png', alt: 'Mercedes-Benz V-Class rear seating', caption: 'Passenger silence' },
];

const executiveDay: Card[] = [
  { title: 'Board Meetings', body: 'Prepared arrival for executives, leadership teams, and private guests.' },
  { title: 'Roadshows', body: 'Multi-stop movement across Zurich, Switzerland, and selected European routes.' },
  { title: 'Client Dinners', body: 'Discreet evening transport for hosts, guests, principals, and corporate visitors.' },
  { title: 'Private Appointments', body: 'Controlled movement between residence, hotel, office, clinic, retail, restaurant, or event.' },
  { title: 'Event Entrances', body: 'Calm arrival and departure timing for high-demand dates and private occasions.' },
];

const officeCards: Card[] = [
  { title: 'For Executive Assistants', body: 'Clear communication, confirmed details, and professional coordination without unnecessary back-and-forth.' },
  { title: 'For Family Offices', body: 'Discreet movement for principals, relatives, guests, private schedules, and recurring travel.' },
  { title: 'For Corporate Bookers', body: 'Professional handling for executives, visiting clients, investors, board members, and event guests.' },
  { title: 'For Concierge Teams', body: 'Private mobility for hotel guests requiring composed airport, city, and long-distance travel.' },
];

const routes: Card[] = [
  { title: 'Zurich', body: 'Airport arrivals, hotel transfers, private appointments, corporate movement, and city schedules.' },
  { title: 'Zug', body: 'Executive travel, private offices, residences, and corporate transfers.' },
  { title: 'Lucerne', body: 'Hotel arrivals, private stays, leisure routes, and guest reception.' },
  { title: 'Basel', body: 'Business travel, events, airport connections, and cross-city movement.' },
  { title: 'Geneva', body: 'Long-distance executive routes, private travel, diplomatic schedules, and hotel arrivals.' },
  { title: 'Davos', body: 'Event-week mobility, WEF schedules, private guests, and mountain transfers.' },
  { title: 'St. Moritz', body: 'Private long-distance travel, winter stays, hotel arrivals, and luggage-heavy journeys.' },
  { title: 'Gstaad', body: 'Private alpine routes, residences, hotels, and seasonal movement.' },
  { title: 'Milan', body: 'Cross-border private travel, business trips, fashion, events, and onward European journeys.' },
  { title: 'Munich', body: 'Executive routes, airport connections, events, and selected cross-border schedules.' },
];

const occasions: Card[] = [
  { title: 'Zurich Airport Arrival', body: 'For landings, departures, guest pickup, luggage consideration, and hotel or residence transfers.' },
  { title: 'CEO & Executive Schedule', body: 'For meetings, board appointments, investor days, client dinners, roadshows, and confidential business movement.' },
  { title: 'Private Client Movement', body: 'For residences, hotels, dinners, appointments, shopping, private events, and quiet city travel.' },
  { title: 'Event Week Mobility', body: 'For WEF Davos, Art Basel, Zurich Film Festival, private events, brand activations, and high-demand dates.' },
  { title: 'Long-Distance Route', body: 'For Davos, St. Moritz, Geneva, Basel, Lucerne, Milan, Munich, and selected European journeys.' },
  { title: 'Guest & Delegation Reception', body: 'For principals, families, corporate guests, private offices, assistants, and group movement requiring space and discretion.' },
];

const proof: Card[] = [
  { title: 'Swiss Company Identity', body: 'Registered Swiss business presence and professional accountability.' },
  { title: 'Zurich Operating Base', body: 'Prepared for Zurich city, Zurich Airport, corporate schedules, hotel arrivals, and onward Swiss routes.' },
  { title: 'UID', body: 'CHE-411.952.415' },
  { title: 'Limousine Permit', body: 'Kanton Zurich' },
  { title: 'Certified Tachograph', body: 'Prepared for professional chauffeur operation.' },
  { title: 'Direct Communication', body: 'Requests are handled through email, phone, and WhatsApp.' },
  { title: 'Clear Rate Confirmation', body: 'Rates are confirmed according to route, waiting time, vehicle, passenger count, luggage, schedule requirements, and event demand.' },
  { title: 'Privacy-First Handling', body: 'Routes, passenger details, pickup timing, and private instructions are treated with discretion.' },
];

const testimonials = [
  {
    quote: 'Punctual, immaculate, and discreet. The kind of service I want when I land in Zurich and need the rest of the day to work.',
    source: 'Private Client, Zurich / London',
  },
  {
    quote: 'The value is not only the vehicle. It is the calm communication, the confirmed details, and the feeling that the movement is already handled.',
    source: 'Executive Assistant, Private Office',
  },
  {
    quote: 'During event weeks, timing and discretion matter more than anything. ALAIR NOIR understands the pressure around guest movement.',
    source: 'Corporate Guest Coordinator, Event Week',
  },
];

const faqs: Card[] = [
  { title: 'Do you offer Zurich Airport transfers?', body: 'Yes. ALAIR NOIR arranges private transfers to and from Zurich Airport with flight-aware timing, direct communication, luggage consideration, and onward movement to hotels, residences, offices, events, or long-distance destinations.' },
  { title: 'Can I book for a CEO, principal, executive, guest, or client?', body: 'Yes. Many requests are made by executive assistants, family offices, corporate bookers, concierge teams, and private offices arranging travel on behalf of someone else.' },
  { title: 'Which vehicles are available?', body: 'ALAIR NOIR offers the BMW i7 xDrive60 and Mercedes-Benz V-Class. Vehicle recommendation depends on passenger count, luggage, journey type, and preferred cabin experience.' },
  { title: 'Can I request a specific vehicle?', body: 'Yes. A preferred vehicle can be requested when booking. Availability is confirmed directly.' },
  { title: 'Do you operate outside Zurich?', body: 'Yes. ALAIR NOIR arranges journeys across Switzerland and selected European routes by request, including Davos, St. Moritz, Basel, Geneva, Lucerne, Gstaad, Milan, and Munich.' },
  { title: 'Can I book long-distance travel?', body: 'Yes. Long-distance private chauffeur journeys are available across Switzerland and selected cross-border routes.' },
  { title: 'Can I reserve by the hour?', body: 'Yes. Hourly arrangements are available for multi-stop executive schedules, business days, events, private appointments, shopping, dinners, and flexible city movement.' },
  { title: 'Do you support event weeks?', body: 'Yes. ALAIR NOIR can arrange private mobility for high-demand periods such as WEF Davos, Art Basel, Zurich Film Festival, corporate events, private dinners, and guest schedules.' },
  { title: 'Are rates fixed?', body: 'Rates are provided on request according to route, waiting time, vehicle, passenger count, luggage, schedule requirements, and event demand.' },
  { title: 'How do I book?', body: 'Send the date, time, route, passenger count, luggage requirements, preferred vehicle, and any private instructions by email or WhatsApp. Availability and rate are confirmed directly.' },
];

function reveal(shouldReduceMotion: boolean | null, delay = 0) {
  if (shouldReduceMotion) return {};
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 0.9, delay, ease },
  };
}

function LuxuryButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return (
    <a className={`luxury-button luxury-button--${variant}`} href={href}>
      {children}
    </a>
  );
}

function SectionFrame({ id, eyebrow, title, children, className = '' }: { id?: string; eyebrow?: string; title?: string; children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className={`lux-section ${className}`}>
      <div className="lux-container">
        {(eyebrow || title) && (
          <motion.div className="section-heading" {...reveal(shouldReduceMotion)}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function CinematicCard({ item, index }: { item: Card; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article className="cinematic-card" {...reveal(shouldReduceMotion, index * 0.04)}>
      {item.meta && <span className="card-meta">{item.meta}</span>}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </motion.article>
  );
}

function BrandOpening() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="brand-opening" aria-label="ALAIR NOIR introduction">
      <div className="grain" aria-hidden="true" />
      <motion.div className="opening-inner" {...reveal(shouldReduceMotion)}>
        <p className="opening-location">Zurich · Switzerland</p>
        <p className="opening-logo">ALAIR NOIR</p>
        <div className="opening-line" />
        <p className="opening-slogan">
          <span>NOT FOR EVERYONE</span>
          <span>FOR YOU</span>
        </p>
        <p className="opening-copy">Private mobility for people whose arrival carries weight.</p>
      </motion.div>
    </section>
  );
}

function HeroArrival() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-arrival" id="arrival">
      <motion.div
        className="hero-image"
        initial={shouldReduceMotion ? undefined : { scale: 1.06, opacity: 0.68 }}
        animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <Image src="/images/hero-bmw-i7.jpg" alt="Black BMW i7 prepared for private arrival" fill priority sizes="100vw" />
      </motion.div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="lux-container hero-content">
        <motion.p className="eyebrow" {...reveal(shouldReduceMotion, 0.1)}>Private chauffeur service · Zurich</motion.p>
        <motion.h1 {...reveal(shouldReduceMotion, 0.18)}>
          Private chauffeur service in Zurich for those who move with intention.
        </motion.h1>
        <motion.div className="hero-copy" {...reveal(shouldReduceMotion, 0.28)}>
          <p>
            ALAIR NOIR arranges discreet private mobility for CEOs, founders, executives, private clients, family offices,
            corporate guests, and high-level airport arrivals across Switzerland and selected European routes.
          </p>
          <p>
            This is not transport as a transaction. It is timing, privacy, cabin atmosphere, and arrival control, prepared
            before you step outside.
          </p>
        </motion.div>
        <motion.div className="hero-actions" {...reveal(shouldReduceMotion, 0.36)}>
          <LuxuryButton href="#request">Request Private Mobility</LuxuryButton>
          <LuxuryButton href="https://wa.me/41772870956" variant="secondary">WhatsApp Direct</LuxuryButton>
        </motion.div>
        <motion.div className="quick-facts" {...reveal(shouldReduceMotion, 0.44)}>
          <span>BMW i7 xDrive60</span>
          <span>Mercedes-Benz V-Class</span>
          <span>Zurich-based. Switzerland-ready.</span>
        </motion.div>
      </div>
    </section>
  );
}

function BrandPromise() {
  const shouldReduceMotion = useReducedMotion();
  const lines = [
    'Not for passengers seeking the loudest arrival.',
    'Not for those who measure service only by distance.',
    'Not for movement treated as an afterthought.',
  ];

  return (
    <SectionFrame id="promise" eyebrow="Brand promise" title="Not for everyone. For you." className="manifesto-section">
      <div className="manifesto-grid">
        <motion.div className="manifesto-lines" {...reveal(shouldReduceMotion)}>
          {lines.map((line) => <p key={line}>{line}</p>)}
        </motion.div>
        <motion.div className="manifesto-copy" {...reveal(shouldReduceMotion, 0.12)}>
          <p>
            ALAIR NOIR is for the traveller who values silence over spectacle, precision over excess, and privacy over
            attention.
          </p>
          <p>
            For the CEO before a boardroom. For the founder between meetings. For the principal arriving without exposure.
            For the private guest who should never need to ask twice.
          </p>
          <p>Every journey is arranged to feel calm, exact, and already understood.</p>
        </motion.div>
      </div>
    </SectionFrame>
  );
}

function ArrivalRisk() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionFrame eyebrow="The arrival" title="The first impression begins before the door opens.">
      <div className="split-editorial">
        <motion.div className="risk-lines" {...reveal(shouldReduceMotion)}>
          {['A vehicle arriving late is visible.', 'A confused pickup is visible.', 'A public wait is visible.', 'A passenger left uncertain is visible.'].map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>
        <motion.div className="image-panel" {...reveal(shouldReduceMotion, 0.1)}>
          <Image src="/images/chauffeur-arrival.png" alt="Discreet chauffeur arrival detail" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </motion.div>
      </div>
      <motion.p className="wide-statement" {...reveal(shouldReduceMotion, 0.16)}>
        The purpose of ALAIR NOIR is to remove that uncertainty. From airport to hotel, residence to meeting, meeting to
        dinner, and Zurich to wherever the schedule requires.
      </motion.p>
    </SectionFrame>
  );
}

function AlairStandard() {
  return (
    <SectionFrame id="standard" eyebrow="The standard" title="Quiet control.">
      <p className="section-lede">The ALAIR NOIR standard is not decoration. It is the discipline behind the journey.</p>
      <div className="cards-grid pillars-grid">
        {pillars.map((item, index) => <CinematicCard key={item.title} item={item} index={index} />)}
      </div>
    </SectionFrame>
  );
}

function ClientAudience() {
  return (
    <SectionFrame eyebrow="For whom" title="Built for people whose movement represents more than movement.">
      <div className="cards-grid audience-grid">
        {audiences.map((item, index) => <CinematicCard key={item.title} item={{ ...item, meta: String(index + 1).padStart(2, '0') }} index={index} />)}
      </div>
    </SectionFrame>
  );
}

function AirportMoment() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionFrame id="airport" eyebrow="Zurich Airport" title="Zurich Airport, without uncertainty." className="airport-section">
      <div className="airport-layout">
        <motion.div className="airport-copy" {...reveal(shouldReduceMotion)}>
          <p>
            An airport transfer is not a simple pickup. It is the first controlled moment after landing, the transition
            between public travel and private movement.
          </p>
          <p>
            ALAIR NOIR arranges Zurich Airport arrivals and departures with flight-aware timing, luggage consideration,
            direct communication, and composed onward travel.
          </p>
          <LuxuryButton href="#request">Request Zurich Airport Transfer</LuxuryButton>
        </motion.div>
        <motion.div className="route-visual" {...reveal(shouldReduceMotion, 0.1)} aria-label="Abstract route map from Zurich Airport">
          <span className="origin">ZRH</span>
          {['Davos', 'St. Moritz', 'Basel', 'Lucerne', 'Geneva', 'Gstaad', 'Milan', 'Munich'].map((city, index) => (
            <span key={city} className={`route-label route-label-${index + 1}`}>{city}</span>
          ))}
        </motion.div>
      </div>
      <div className="cards-grid compact-grid">
        {airportCards.map((item, index) => <CinematicCard key={item.title} item={item} index={index} />)}
      </div>
    </SectionFrame>
  );
}

function DiaporamaSlider({ slides }: { slides: ImageSlide[] }) {
  return (
    <div className="diaporama" aria-label="Cinematic cabin images">
      <div className="diaporama-track">
        {slides.map((slide, index) => (
          <article className="slide" key={slide.src}>
            <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 82vw, 42vw" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{slide.caption}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CabinExperience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionFrame id="cabins" eyebrow="The cabin" title="A private room between obligations." className="cabin-section">
      <motion.div className="cabin-copy" {...reveal(shouldReduceMotion)}>
        <p>The cabin is where the day changes pace.</p>
        <p>
          A place to prepare before the meeting. A place to take a call without being overheard. A place to cross the city
          without losing composure.
        </p>
        <p>Silence is not emptiness. It is space to think.</p>
      </motion.div>
      <DiaporamaSlider slides={cabinSlides} />
    </SectionFrame>
  );
}

function VehicleCollection() {
  return (
    <SectionFrame eyebrow="Vehicle collection" title="Cabins arranged for the moment.">
      <div className="vehicle-stack">
        <VehiclePanel
          id="bmw-i7"
          label="BMW i7 xDrive60"
          title="Silence before the meeting."
          image="/images/bmw-i7-black-studio.png"
          body="The BMW i7 xDrive60 is arranged for executive airport arrivals, private city travel, board meetings, hotel transfers, and long-distance journeys where the passenger needs quiet, privacy, and focus."
          specs={['Fully electric', 'Executive rear cabin', 'Private focus', 'Composed long-distance travel']}
          cta="Request the BMW i7"
        />
        <VehiclePanel
          id="v-class"
          label="Mercedes-Benz V-Class"
          title="Space for guests, luggage, and schedules."
          image="/images/mercedes-v-class-cabin-side.png"
          body="The Mercedes-Benz V-Class is arranged for private groups, families, delegations, corporate teams, assistants booking for others, and airport arrivals where space must remain calm and discreet."
          specs={['Executive group seating', 'Generous luggage capacity', 'Comfort for longer routes', 'Prepared for events and guest movement']}
          cta="Request the V-Class"
          reverse
        />
      </div>
    </SectionFrame>
  );
}

function VehiclePanel({ id, label, title, image, body, specs, cta, reverse = false }: { id: string; label: string; title: string; image: string; body: string; specs: string[]; cta: string; reverse?: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article id={id} className={`vehicle-panel ${reverse ? 'vehicle-panel--reverse' : ''}`} {...reveal(shouldReduceMotion)}>
      <div className="vehicle-media">
        <Image src={image} alt={`${label} cinematic presentation`} fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className="vehicle-copy">
        <p className="eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="spec-grid">
          {specs.map((spec) => <span key={spec}>{spec}</span>)}
        </div>
        <LuxuryButton href="#request" variant="secondary">{cta}</LuxuryButton>
      </div>
    </motion.article>
  );
}

function ExecutiveDay() {
  return (
    <SectionFrame eyebrow="The executive day" title="Some days are not transfers. They are sequences.">
      <p className="section-lede">
        ALAIR NOIR is arranged around the rhythm of the full day, not only the distance between two points.
      </p>
      <div className="timeline">
        {executiveDay.map((item, index) => <CinematicCard key={item.title} item={{ ...item, meta: `${index + 8}:00` }} index={index} />)}
      </div>
      <div className="section-actions"><LuxuryButton href="#request">Arrange an Executive Schedule</LuxuryButton></div>
    </SectionFrame>
  );
}

function PrivateOffice() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionFrame id="private-office" eyebrow="Private office" title="For those arranging movement on behalf of someone important.">
      <div className="office-layout">
        <motion.div className="office-request" {...reveal(shouldReduceMotion)}>
          <p>The passenger may not be the person making the request.</p>
          <p>
            Share the date, time, route, passenger count, luggage requirements, preferred vehicle, and any private
            instructions. Availability, recommendation, and rate are confirmed directly and clearly.
          </p>
          <div className="request-preview">
            {['Date & time', 'Route', 'Passengers', 'Luggage', 'Vehicle preference', 'Private instructions'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>
        <div className="cards-grid compact-grid">
          {officeCards.map((item, index) => <CinematicCard key={item.title} item={item} index={index} />)}
        </div>
      </div>
      <div className="section-actions"><LuxuryButton href="#request">Book for a Client</LuxuryButton></div>
    </SectionFrame>
  );
}

function RouteMap() {
  return (
    <SectionFrame id="routes" eyebrow="Routes" title="Zurich to the places where timing matters.">
      <p className="section-lede">ALAIR NOIR is based in Zurich and arranges private chauffeur journeys across Switzerland and selected European routes by request.</p>
      <div className="routes-layout">
        <div className="route-visual route-visual--wide" aria-hidden="true">
          <span className="origin">Zurich</span>
          {routes.slice(1).map((route, index) => <span key={route.title} className={`route-label route-label-${index + 1}`}>{route.title}</span>)}
        </div>
        <div className="route-list">
          {routes.map((item, index) => <CinematicCard key={item.title} item={item} index={index} />)}
        </div>
      </div>
      <div className="section-actions"><LuxuryButton href="#request">Arrange a Route</LuxuryButton></div>
    </SectionFrame>
  );
}

function OccasionCards() {
  return (
    <SectionFrame eyebrow="Occasions" title="Private mobility, arranged around the moment.">
      <div className="cards-grid audience-grid">
        {occasions.map((item, index) => <CinematicCard key={item.title} item={{ ...item, meta: String(index + 1).padStart(2, '0') }} index={index} />)}
      </div>
      <div className="section-actions"><LuxuryButton href="#request">Request Availability</LuxuryButton></div>
    </SectionFrame>
  );
}

function ProofSection() {
  return (
    <SectionFrame eyebrow="Proof" title="Verified where it matters.">
      <p className="section-lede">
        Private mobility requires trust before the vehicle arrives. ALAIR NOIR operates with clear company identity,
        Zurich-based availability, professional preparation, direct communication, and discreet handling of passenger details.
      </p>
      <div className="cards-grid proof-grid">
        {proof.map((item, index) => <CinematicCard key={item.title} item={item} index={index} />)}
      </div>
    </SectionFrame>
  );
}

function Testimonials() {
  return (
    <SectionFrame eyebrow="In their words" title="Calm is remembered.">
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <CinematicCard key={item.source} index={index} item={{ title: item.quote, body: item.source, meta: 'Quote' }} />
        ))}
      </div>
    </SectionFrame>
  );
}

function BeforeRequestFAQ() {
  return (
    <SectionFrame eyebrow="Before you request" title="Details confirmed before movement begins.">
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details key={item.title} className="faq-item" open={index === 0}>
            <summary>{item.title}</summary>
            <p>{item.body}</p>
          </details>
        ))}
      </div>
    </SectionFrame>
  );
}

function RequestSection() {
  return (
    <section id="request" className="request-section">
      <div className="lux-container request-grid">
        <div>
          <p className="eyebrow">The request</p>
          <h2>Begin with the route.</h2>
          <p>
            Send the date, time, route, passenger count, luggage requirements, preferred vehicle, and any private
            instructions. ALAIR NOIR confirms availability, vehicle recommendation, and rate directly before the journey.
          </p>
          <p className="request-statement">Private mobility should not feel complicated. It should feel prepared.</p>
          <div className="hero-actions">
            <LuxuryButton href="mailto:booking@alairnoir.ch?subject=Private%20mobility%20request">Request Private Mobility</LuxuryButton>
            <LuxuryButton href="https://wa.me/41772870956" variant="secondary">WhatsApp Direct</LuxuryButton>
          </div>
        </div>
        <form className="request-card" action="mailto:booking@alairnoir.ch" method="post" encType="text/plain">
          <label>Route<input name="route" placeholder="Zurich Airport to Baur au Lac" /></label>
          <div className="form-row">
            <label>Date<input name="date" type="date" /></label>
            <label>Time<input name="time" type="time" /></label>
          </div>
          <div className="form-row">
            <label>Passengers<input name="passengers" placeholder="2" /></label>
            <label>Vehicle<input name="vehicle" placeholder="BMW i7 / V-Class" /></label>
          </div>
          <label>Contact<input name="contact" placeholder="Email or phone" /></label>
          <label>Notes<textarea name="notes" placeholder="Luggage, private instructions, waiting time" /></label>
          <button className="luxury-button luxury-button--primary" type="submit">Prepare Request</button>
        </form>
      </div>
    </section>
  );
}

function LuxuryFooter() {
  return (
    <footer className="lux-footer">
      <div className="lux-container footer-grid">
        <div>
          <p className="footer-logo">ALAIR NOIR</p>
          <p className="footer-slogan">NOT FOR EVERYONE<br />FOR YOU</p>
          <p>Private chauffeur service in Zurich for CEOs, executives, private clients, family offices, airport arrivals, events, and long-distance journeys across Switzerland and selected European routes.</p>
        </div>
        <nav aria-label="Footer navigation">
          {['Arrival', 'Standard', 'Cabins', 'Routes', 'Private Office', 'Request'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
          ))}
        </nav>
        <address>
          <a href="mailto:booking@alairnoir.ch">booking@alairnoir.ch</a>
          <a href="tel:+41772870956">+41 77 287 09 56</a>
          <a href="https://wa.me/41772870956">WhatsApp Direct</a>
          <a href="https://www.instagram.com/alairnoir">Instagram @alairnoir</a>
        </address>
      </div>
      <div className="lux-container footer-bottom">
        <a href="/impressum">Impressum</a>
        <a href="/privacy">Privacy Policy</a>
        <span>© 2026 ALAIR NOIR GmbH · Switzerland</span>
      </div>
    </footer>
  );
}

export default function LuxuryHomepage() {
  return (
    <>
      <main id="main-content" className="luxury-page-shell">
        <BrandOpening />
        <HeroArrival />
        <BrandPromise />
        <ArrivalRisk />
        <AlairStandard />
        <ClientAudience />
        <AirportMoment />
        <CabinExperience />
        <VehicleCollection />
        <ExecutiveDay />
        <PrivateOffice />
        <RouteMap />
        <OccasionCards />
        <ProofSection />
        <Testimonials />
        <BeforeRequestFAQ />
        <RequestSection />
      </main>
      <LuxuryFooter />
    </>
  );
}
