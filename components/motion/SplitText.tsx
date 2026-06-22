'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { luxuryEase } from '@/lib/motion';

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function SplitText({
  text,
  className,
  style,
  delay = 0,
  staggerDelay = 0.045,
  as: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const words = text.split(' ');

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag ref={ref as React.Ref<HTMLSpanElement>} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.85,
              ease: luxuryEase,
              delay: delay + i * staggerDelay,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
