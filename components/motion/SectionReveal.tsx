'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cinematicEase } from '@/lib/motion';

interface SectionRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  /** Stagger delay in seconds before this section begins revealing. */
  delay?: number;
  /** Viewport margin used to trigger the reveal early/late. */
  margin?: string;
}

/**
 * Apple-style section entrance — opacity + upward drift + blur-to-sharp.
 * Triggers once, respects prefers-reduced-motion.
 */
export default function SectionReveal({
  children,
  delay = 0,
  margin = '-12%',
  style,
  ...rest
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as never });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div style={style as React.CSSProperties}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.05, ease: cinematicEase, delay }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
