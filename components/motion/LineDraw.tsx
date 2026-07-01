'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cinematicEase } from '@/lib/motion';

interface LineDrawProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  delay?: number;
  duration?: number;
  margin?: string;
  color?: string;
  thickness?: number;
  /** 'horizontal' draws left-to-right, 'vertical' draws top-to-bottom. */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * A thin hairline that draws once it enters view — left-to-right by
 * default, or top-to-bottom for vertical dividers. Used for section
 * dividers, card top accents, channel rows, and trust-strip columns.
 *
 * The viewport observer sits on an unscaled outer wrapper — the
 * animated bar itself starts scaled to zero (a zero-area target), so
 * an observer attached to it directly would never report an
 * intersection.
 */
export default function LineDraw({
  delay = 0,
  duration = 0.9,
  margin = '-10%',
  color = 'var(--hairline)',
  thickness = 1,
  orientation = 'horizontal',
  style,
  ...rest
}: LineDrawProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: margin as never });
  const shouldReduceMotion = useReducedMotion();
  const isVertical = orientation === 'vertical';
  const target = isVertical ? { scaleY: 1 } : { scaleX: 1 };

  return (
    <span
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        display: 'block',
        width: isVertical ? thickness : undefined,
        height: isVertical ? '100%' : thickness,
        ...(style as React.CSSProperties),
      }}
    >
      <motion.span
        initial={shouldReduceMotion ? false : (isVertical ? { scaleY: 0 } : { scaleX: 0 })}
        animate={shouldReduceMotion ? false : (inView ? target : {})}
        transition={{ duration, ease: cinematicEase, delay }}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: color,
          transformOrigin: isVertical ? 'top' : 'left',
        }}
        {...rest}
      />
    </span>
  );
}
