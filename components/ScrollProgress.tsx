'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.28,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: '1px',
        pointerEvents: 'none',
        transformOrigin: '0% 50%',
        scaleX,
        background:
          'linear-gradient(90deg, rgba(201,168,76,0), rgba(201,168,76,0.95) 18%, rgba(237,232,224,0.65) 54%, rgba(201,168,76,0.72) 82%, rgba(201,168,76,0))',
        boxShadow: '0 0 18px rgba(201,168,76,0.26)',
      }}
    />
  );
}
