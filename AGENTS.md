# ALAIR NOIR - Codex Project Instructions

## Project Objective

Build ALAIR NOIR as an immersive cinematic luxury website, not a normal chauffeur website.

The experience must feel like:
- Apple product launch
- Porsche configurator
- Rolls-Royce private client experience
- Swiss watchmaker editorial system
- Private aviation booking ritual
- Awwwards-level motion and atmosphere

Never produce a generic chauffeur, taxi, Uber, Blacklane, SaaS, startup, template, or limousine website.

## Brand

Company: ALAIR NOIR GmbH
Slogan: Where Luxury Moves Quietly.
Positioning: Swiss private mobility, discreet chauffeur service, quiet luxury, precision, old-money elegance.

## Fleet Rules

The collection contains exactly two vehicles:
1. Black BMW i7 xDrive60 / BMW i7 2026
2. Black Mercedes-Benz V-Class

Do not add Rolls-Royce, Bentley, Audi, Range Rover, extra fleet vehicles, generic cars, taxis, limousines, or placeholder vehicles.

Use the term "The Collection" or "Our Collection", not "fleet" as the main luxury label.

## Visual Identity

Use:
- Black: `#0A0A0A`
- Dark Forest Green: `#0E1F16`
- Cream: `#D6C7B0`
- Ivory: `#F6F2E9`
- Stone: `#A89E8B`
- Gold: `#D4AF37`, accent only

Avoid:
- Mint green
- Bright colors
- Blue
- Red
- Gradients that feel tech/SaaS
- Glassmorphism
- Neon glow
- Rounded SaaS cards
- Emoji icons
- Generic stock layout
- Template hero sections

Typography:
- Editorial serif for headings: Cormorant Garamond or similar
- Neutral sans for UI: Inter or similar
- Large type, huge negative space, Swiss grid, hairline dividers

## Motion Language

Motion must be cinematic, slow, disciplined, and intentional.

Use:
- Framer Motion for section reveals, text reveals, page transitions
- GSAP ScrollTrigger for scroll-driven sequences
- Lenis for smooth scrolling
- React Three Fiber / Drei / Three.js only where it adds atmosphere
- Subtle parallax, pinned sections, camera movement, route line animation, reveal masks

Avoid:
- Bouncy animation
- Cartoon movement
- Fast flashy transitions
- Overloaded particle effects
- Random 3D objects
- Generic "fade up everything" design

## Required User Journey

Build the page as a scroll adventure with chapters:

01 - The Request
A hidden, quiet private mobility request. Dark intro. Logo/wordmark appears with restraint.

02 - The Standard
Two vehicles. One standard. Introduce the BMW i7 and Mercedes-Benz V-Class as curated service objects, not a big fleet.

03 - The Silence
BMW i7 electric luxury. No engine noise, no vibration, private cabin, preparation before arrival.

04 - The Space
Mercedes-Benz V-Class. Executive space, airport arrivals, family/VIP groups, luggage, private comfort.

05 - The Route
Cinematic Swiss / European route layer: Zurich, Geneva, Davos, St. Moritz, Milan, Munich.

06 - The Protocol
Discretion, punctuality, privacy, controlled handover, no unnecessary visibility.

07 - The Arrival
Luxury hotel / private aviation / executive entrance mood.

08 - The Booking Ritual
Premium booking flow, not a normal contact form.

## Technical Direction

This must be a real Next.js component-based website.

Do not keep the homepage as an iframe preview.
Replace `app/page.tsx` with real React/Next.js components.

Preferred structure:
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/experience/CinematicHome.tsx`
- `components/experience/HeroSequence.tsx`
- `components/experience/ScrollChapters.tsx`
- `components/experience/FleetCollection.tsx`
- `components/experience/RouteMap.tsx`
- `components/experience/BookingRitual.tsx`
- `components/experience/MotionProvider.tsx`
- `components/experience/ReducedMotionFallback.tsx`
- `lib/brand.ts`
- `lib/chapters.ts`
- `lib/motion.ts`

## Accessibility And Performance

Respect `prefers-reduced-motion`.
No motion should block content.
Use semantic sections.
Use real text, not image-only text.
Keep mobile experience premium and readable.
Do not make WebGL mandatory; provide graceful fallback.

## Validation Commands

After changes, run:

```bash
npm run typecheck
npm run lint
npm run build
```

The task is not complete until build passes.

## Acceptance Criteria

- `app/page.tsx` no longer renders an iframe preview.
- The page is composed from real React components.
- The first screen feels cinematic and luxury.
- Scroll chapters exist.
- The two-car collection is clear.
- Motion is implemented, not only described.
- Typography and color system match the brand.
- No mint green remains in the main design system.
- No generic SaaS cards.
- No extra vehicles.
- At least 6 scroll chapters exist.
- At least 3 motion systems exist: smooth scroll, reveal animation, scroll/progress animation.
- Reduced-motion fallback exists.
- `npm run build` passes.
