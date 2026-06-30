'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'icon' | 'full' | 'nav';
  color?: string;
  accentColor?: string;
  animate?: boolean;
  className?: string;
  height?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

function IconMark({
  color,
  accent,
  anim,
  delay = 0,
}: {
  color: string;
  accent: string;
  anim: boolean;
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="an-soft-light" x="-30%" y="-40%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.84 0 1 0 0 0.78 0 0 1 0 0.68 0 0 0 0.55 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.text
        x="98"
        y="118"
        textAnchor="end"
        fontSize="92"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontWeight="500"
        fill="rgba(10,10,10,0.18)"
        stroke={color}
        strokeWidth="1.25"
        filter="url(#an-soft-light)"
        initial={anim ? { opacity: 0, x: -10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.18, ease }}
      >
        A
      </motion.text>
      <motion.line
        x1="130"
        y1="28"
        x2="130"
        y2="142"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
        filter="url(#an-soft-light)"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: delay + 0.04, ease }}
      />
      <motion.text
        x="162"
        y="118"
        textAnchor="start"
        fontSize="92"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontWeight="500"
        fill="rgba(10,10,10,0.18)"
        stroke={color}
        strokeWidth="1.25"
        filter="url(#an-soft-light)"
        initial={anim ? { opacity: 0, x: 10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.22, ease }}
      >
        N
      </motion.text>
    </svg>
  );
}

function FullMark({ color, accent, anim }: { color: string; accent: string; anim: boolean }) {
  return (
    <span className="full-logo-mark">
      <span className="full-logo-icon">
        <IconMark color={color} accent={accent} anim={anim} />
      </span>
      <motion.span
        className="full-logo-name"
        style={{ color }}
        initial={anim ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.58, ease }}
      >
        ALAIR NOIR
      </motion.span>
      <motion.span
        className="full-logo-tagline"
        style={{ color: accent }}
        initial={anim ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease }}
      >
        NOT FOR EVERYONE / FOR YOU
      </motion.span>
    </span>
  );
}

function NavMark({ color, accent, anim }: { color: string; accent: string; anim: boolean }) {
  return (
    <span className="nav-logo-mark">
      <span className="nav-logo-icon">
        <IconMark color={color} accent={accent} anim={anim} />
      </span>
      <motion.span
        className="nav-logo-name"
        style={{ color }}
        initial={anim ? { opacity: 0, x: -6 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease }}
      >
        Alair Noir
      </motion.span>
    </span>
  );
}

export default function Logo({
  variant = 'nav',
  color = '#F6F2E9',
  accentColor = '#D6C7B0',
  animate: anim = false,
  className = '',
  height,
}: LogoProps) {
  const style = height ? { height, width: 'auto' } : undefined;

  if (variant === 'icon') {
    return (
      <span className={`block ${className}`} style={style}>
        <IconMark color={color} accent={accentColor} anim={anim} />
      </span>
    );
  }

  if (variant === 'full') {
    return (
      <span className={`block ${className}`} style={style}>
        <FullMark color={color} accent={accentColor} anim={anim} />
      </span>
    );
  }

  return (
    <span className={`inline-flex ${className}`}>
      <NavMark color={color} accent={accentColor} anim={anim} />
    </span>
  );
}
