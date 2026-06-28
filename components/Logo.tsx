'use client';
import { motion } from 'framer-motion';

/**
 * Animated ALAIR NOIR logo built from the brand SVG.
 *
 * variant="icon"  — A|N monogram only (for Nav)
 * variant="full"  — Complete stacked logo with tagline (for Hero / Footer)
 * variant="nav"   — Compact horizontal: icon + wordmark side by side
 *
 * When animate=true the logo does a cinematic draw-in sequence on mount.
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

// ── Icon-only (A|N monogram) ──────────────────────────────────────────────
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
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
      {/* A */}
      <motion.text
        x="78" y="138"
        textAnchor="end"
        fontSize="108"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease }}
      >
        A
      </motion.text>

      {/* Vertical bar — draws top to bottom */}
      <motion.line
        x1="100" y1="24" x2="100" y2="146"
        stroke={color} strokeWidth="1.6" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: delay + 0.05, ease }}
      />

      {/* N */}
      <motion.text
        x="122" y="138"
        textAnchor="start"
        fontSize="108"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        fill={color}
        initial={anim ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.20, ease }}
      >
        N
      </motion.text>

      {/* Left divider line — draws right to left from center */}
      <motion.line
        x1="100" y1="162" x2="28" y2="162"
        stroke={accent} strokeWidth="1.1" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: delay + 0.5, ease }}
        style={{ originX: '100px' }}
      />

      {/* Right divider line — draws left to right from center */}
      <motion.line
        x1="100" y1="162" x2="172" y2="162"
        stroke={accent} strokeWidth="1.1" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: delay + 0.5, ease }}
      />

      {/* Star / diamond — sparkles in */}
      <motion.path
        d="M100 152 C102.4 159.5 104.4 161.5 111.9 163.9 C104.4 166.3 102.4 168.3 100 175.8 C97.6 168.3 95.6 166.3 88.1 163.9 C95.6 161.5 97.6 159.5 100 152 Z"
        fill={color}
        initial={anim ? { opacity: 0, scale: 0.3 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.62, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: '100px 163.9px' }}
      />
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
    <svg viewBox="0 0 400 310" fill="none" aria-label="ALAIR NOIR — Where Luxury Moves Quietly" style={{ overflow: 'visible' }}>
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
        transition={{ duration: 1.0, delay: delay + 0.10, ease }}
      >
        A
      </motion.text>

      {/* Vertical bar */}
      <motion.line
        x1="200" y1="22" x2="200" y2="176"
        stroke={color} strokeWidth="1.8" strokeLinecap="round"
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
        transition={{ duration: 1.0, delay: delay + 0.16, ease }}
      >
        N
      </motion.text>

      {/* Left line */}
      <motion.line
        x1="200" y1="200" x2="60" y2="200"
        stroke={accent} strokeWidth="1.2" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.52, ease }}
        style={{ originX: '200px' }}
      />

      {/* Right line */}
      <motion.line
        x1="200" y1="200" x2="340" y2="200"
        stroke={accent} strokeWidth="1.2" strokeLinecap="round"
        initial={anim ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.52, ease }}
      />

      {/* Star */}
      <motion.path
        d="M200 183 C202.8 192 205.2 194.5 214 197 C205.2 199.5 202.8 202 200 211 C197.2 202 194.8 199.5 186 197 C194.8 194.5 197.2 192 200 183 Z"
        fill={color}
        initial={anim ? { opacity: 0, scale: 0.2 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: delay + 0.65, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: '200px 197px' }}
      />

      {/* ALAIR NOIR wordmark */}
      <motion.text
        x="200" y="252"
        textAnchor="middle"
        fontSize="28"
        fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
        fontWeight="400"
        letterSpacing="14"
        fill={color}
        initial={anim ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: delay + 0.78, ease }}
      >
        ALAIR NOIR
      </motion.text>

      {/* Tagline */}
      {showTagline && (
        <motion.text
          x="200" y="286"
          textAnchor="middle"
          fontSize="10.5"
          fontFamily="var(--font-inter), 'Inter', system-ui, sans-serif"
          fontWeight="300"
          letterSpacing="7"
          fill={accent}
          initial={anim ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: delay + 1.05 }}
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
      {/* Tiny inline A|N icon */}
      <span className="flex-shrink-0" style={{ width: 28, height: 28 }}>
        <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" style={{ overflow: 'visible', width: '100%', height: '100%' }}>
          <motion.text x="78" y="138" textAnchor="end" fontSize="108"
            fontFamily="var(--font-cormorant), Georgia, serif" fontWeight="400" fill={color}
            initial={anim ? { opacity: 0 } : false} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}>A</motion.text>
          <motion.line x1="100" y1="24" x2="100" y2="146" stroke={color} strokeWidth="1.8" strokeLinecap="round"
            initial={anim ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease }} />
          <motion.text x="122" y="138" textAnchor="start" fontSize="108"
            fontFamily="var(--font-cormorant), Georgia, serif" fontWeight="400" fill={color}
            initial={anim ? { opacity: 0 } : false} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}>N</motion.text>
          <motion.line x1="100" y1="162" x2="28" y2="162" stroke={accent} strokeWidth="1.1" strokeLinecap="round"
            initial={anim ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.5, ease }} style={{ originX: '100px' }} />
          <motion.line x1="100" y1="162" x2="172" y2="162" stroke={accent} strokeWidth="1.1" strokeLinecap="round"
            initial={anim ? { pathLength: 0, opacity: 0 } : false} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.5, ease }} />
          <motion.path d="M100 152 C102.4 159.5 104.4 161.5 111.9 163.9 C104.4 166.3 102.4 168.3 100 175.8 C97.6 168.3 95.6 166.3 88.1 163.9 C95.6 161.5 97.6 159.5 100 152 Z"
            fill={color}
            initial={anim ? { opacity: 0, scale: 0.2 } : false} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.62, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: '100px 163.9px' }} />
        </svg>
      </span>

      {/* Wordmark text */}
      <motion.span
        className="font-cormorant font-light text-[13px] tracking-[0.30em] uppercase"
        style={{ color }}
        initial={anim ? { opacity: 0, x: -8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease }}
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
