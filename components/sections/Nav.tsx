'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryEase } from '@/lib/motion';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      className="site-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: luxuryEase, delay: 0.3 }}
      style={{
        background: scrolled
          ? 'rgba(5,5,5,.95)'
          : 'linear-gradient(to bottom, rgba(7,7,7,.86), transparent)',
        transition: 'background 0.4s ease',
      }}
    >
      <a href="/" className="wordmark" aria-label="ALAIR NOIR home">
        ALAIR&nbsp;<span>NOIR</span>
      </a>

      <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
        <a href="#services">Services</a>
        <a href="#fleet">Fleet</a>
        <a href="#about">About</a>
        <a href="#book" className="button button--gold">Book a Ride</a>
      </div>

      <button
        className="menu-button"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(v => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.g key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </motion.g>
            ) : (
              <motion.g key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1="3" y1="7" x2="19" y2="7" />
                <line x1="3" y1="12" x2="19" y2="12" />
                <line x1="3" y1="17" x2="19" y2="17" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </button>
    </motion.nav>
  );
}
