'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxPanelProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
  imgClassName?: string;
  priority?: boolean;
}

export function ParallaxPanel({
  src,
  alt,
  speed = 0.18,
  className,
  children,
  imgClassName,
  priority = false,
}: ParallaxPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yPct = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${yPct}%`, `${yPct}%`]);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: `-${yPct * 1.2}% 0`,
          willChange: 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={imgClassName}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={priority}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </motion.div>
      {children && <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>}
    </div>
  );
}
