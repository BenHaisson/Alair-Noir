'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cinematicEase } from '@/lib/motion';

interface ImageRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  margin?: string;
  /** Total reveal duration in seconds. Apple-style: 1.2–1.6s. */
  duration?: number;
}

/**
 * Apple-style image reveal — clip-path mask wipes open while the
 * image settles from a slow scale + raised black. Wrap a fill
 * Image (or any media) with position:absolute, inset:0.
 *
 * The viewport observer sits on an unclipped outer wrapper — the
 * animated element itself starts fully clip-path'd to zero visible
 * area, so an observer attached to it would never report an
 * intersection (nothing to reveal what would let it see itself).
 */
export default function ImageReveal({
  children,
  delay = 0,
  margin = '-10%',
  duration = 1.4,
  style,
  ...rest
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: margin as never });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div style={{ position: 'absolute', inset: 0, ...(style as React.CSSProperties) }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ position: 'absolute', inset: 0 }}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.06, opacity: 0.72 }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)', scale: 1, opacity: 1 } : {}}
        transition={{ duration, ease: cinematicEase, delay }}
        style={{ position: 'absolute', inset: 0, ...style }}
        {...rest}
      >
        {children}
      </motion.div>
    </div>
  );
}
