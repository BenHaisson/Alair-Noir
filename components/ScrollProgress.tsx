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
          'linear-gradient(90deg, rgba(214, 199, 176,0), rgba(214, 199, 176,0.95) 18%, rgba(246, 242, 233,0.65) 54%, rgba(214, 199, 176,0.72) 82%, rgba(214, 199, 176,0))',
        boxShadow: '0 0 18px rgba(214, 199, 176,0.26)',
      }}
    />
  );
}
