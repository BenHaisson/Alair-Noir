'use client';
import { motion } from 'framer-motion';

/**
 * ALAIR NOIR logo — a restrained A | N monogram.
 *
 * variant="icon"  — A | N monogram only
 * variant="full"  — stacked monogram + wordmark + tagline (Hero / Footer)
 * variant="nav"   — compact horizontal: monogram + wordmark
 *
 * When animate=true the monogram does a quiet, clean draw-in (no bounce,
 * no sparkle, no ornament). One easing only.
 */

interface LogoProps {
  variant?: 'icon' | 'full' | 'nav';
  color?: string;
  accentColor?: string;
  animate?: boolean;
  className?: string;
  /** px height to render at */
  height?: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

// ── Icon-only (A | N monogram) ────────────────────────────────────────────
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
    <svg viewBox="0 0 200 170" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
      {/* A */}
      <motion.text
        x="80" y="138"
        textAnchor="end"
        fontSize="108"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.12, ease }}
      >
        A
      </motion.text>

      {/* Vertical divider — cream accent, draws top to bottom */}
      <motion.line
        x1="100" y1="34" x2="100" y2="136"
        stroke={accent} strokeWidth="1.2" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: delay + 0.04, ease }}
      />

      {/* N */}
      <motion.text
        x="120" y="138"
        textAnchor="start"
        fontSize="108"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.18, ease }}
      >
        N
      </motion.text>
    </svg>
  );
}

// ── Full stacked logo ─────────────────────────────────────────────────────
function FullMark({
  color,
  accent,
  anim,
  delay = 0,
  showTagline = true,
}: {
  color: string;
  accent: string;
  anim: boolean;
  delay?: number;
  showTagline?: boolean;
}) {
  return (
    <svg viewBox="0 0 400 300" fill="none" aria-label="ALAIR NOIR — Where Luxury Moves Quietly" style={{ overflow: 'visible' }}>
      {/* A */}
      <motion.text
        x="165" y="148"
        textAnchor="end"
        fontSize="115"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: delay + 0.08, ease }}
      >
        A
      </motion.text>

      {/* Vertical divider — cream accent */}
      <motion.line
        x1="200" y1="36" x2="200" y2="150"
        stroke={accent} strokeWidth="1.3" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: delay + 0.02, ease }}
      />

      {/* N */}
      <motion.text
        x="235" y="148"
        textAnchor="start"
        fontSize="115"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: delay + 0.14, ease }}
      >
        N
      </motion.text>

      {/* ALAIR NOIR wordmark */}
      <motion.text
        x="200" y="216"
        textAnchor="middle"
        fontSize="28"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        letterSpacing="14"
        fill={color}
        initial={anim ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: delay + 0.5, ease }}
      >
        ALAIR NOIR
      </motion.text>

      {/* Tagline */}
      {showTagline && (
        <motion.text
          x="200" y="250"
          textAnchor="middle"
          fontSize="10.5"
          fontFamily="var(--font-inter), 'Inter', system-ui, sans-serif"
          fontWeight="300"
          letterSpacing="7"
          fill={accent}
          initial={anim ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: delay + 0.75, ease }}
        >
          WHERE LUXURY MOVES QUIETLY
        </motion.text>
      )}
    </svg>
  );
}

// ── Compact nav variant ───────────────────────────────────────────────────
function NavMark({ color, accent, anim }: { color: string; accent: string; anim: boolean }) {
  return (
    <span className="flex items-center gap-3" style={{ lineHeight: 1 }}>
      {/* Tiny inline A | N icon */}
      <span className="flex-shrink-0" style={{ width: 26, height: 26 }}>
        <svg viewBox="0 0 200 170" fill="none" aria-hidden="true" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
          <motion.text x="80" y="138" textAnchor="end" fontSize="108"
            fontFamily="var(--font-cormorant), Georgia, serif" fontWeight="400" fill={color}
            initial={anim ? { opacity: 0 } : false} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}>A</motion.text>
          <motion.line x1="100" y1="34" x2="100" y2="136" stroke={accent} strokeWidth="1.4" strokeLinecap="round"
            initial={anim ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.04, ease }} />
          <motion.text x="120" y="138" textAnchor="start" fontSize="108"
            fontFamily="var(--font-cormorant), Georgia, serif" fontWeight="400" fill={color}
            initial={anim ? { opacity: 0 } : false} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}>N</motion.text>
        </svg>
      </span>

      {/* Wordmark text */}
      <motion.span
        className="font-cormorant font-light text-[13px] tracking-[0.30em] uppercase"
        style={{ color }}
        initial={anim ? { opacity: 0, x: -8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.3, ease }}
      >
        Alair Noir
      </motion.span>
    </span>
  );
}

// ── Public export ─────────────────────────────────────────────────────────
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

  // nav
  return (
    <span className={`inline-flex ${className}`}>
      <NavMark color={color} accent={accentColor} anim={anim} />
    </span>
  );
}
