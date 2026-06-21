# ALAIR NOIR

An original, procedural 3D private-mobility experience for ALAIR NOIR. The site tells a scroll-led story from hidden request to controlled arrival—without using external vehicle models or real car-brand cues.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- React Three Fiber, Three.js, and Drei
- Framer Motion
- Zustand
- React Hook Form + Zod

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run build
```

## Key architecture

```text
app/                 App Router shell and global styling
components/three/    Procedural vehicle, atmosphere, route, camera, and fallbacks
components/story/    Scroll-triggered narrative chapters and progress
components/ui/       Reusable booking, fleet, service, and content UI
components/layout/   Navigation and footer
data/                Story, fleet, service, and route content
lib/                 Zustand experience state
```

The 3D canvas is dynamically imported. It follows `prefers-reduced-motion` and switches to a lightweight visual fallback for reduced-motion visitors.
