'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Story', href: '/#story' },
  { label: 'Fleet', href: '/#collection' },
  { label: 'Interiors', href: '/#bmw-i7' },
  { label: 'Services', href: '/#services' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact',  href: '/#contact' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(214,199,176,0.12)' : '1px solid transparent',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 'clamp(60px,6vw,72px)',
          padding: '0 clamp(20px,5vw,80px)',
        }}>
          {/* Logo — compresses slightly on scroll, a quiet sign of precision */}
          <Link href="/" aria-label="Alair Noir — home" style={{ lineHeight: 0 }}>
            <motion.span
              animate={{ scale: scrolled ? 0.94 : 1 }}
              transition={{ duration: 0.5, ease }}
              style={{ display: 'block', transformOrigin: 'left center' }}
            >
              <Logo variant="nav" animate color="#F6F2E9" accentColor="#D6C7B0" />
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="an-nav-link"
                style={{
                  fontFamily: 'var(--font-inter)', fontWeight: 300,
                  fontSize: '11.6px', letterSpacing: '0.20em', textTransform: 'uppercase',
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Reserve CTA + burger */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center justify-center"
              style={{
                height: '36px', padding: '0 22px',
                border: '1px solid var(--hairline)',
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '11.6px', letterSpacing: '0.20em', textTransform: 'uppercase',
                color: 'var(--gold)',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'var(--gold)';
                el.style.color = '#0A0A0A';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = 'var(--gold)';
              }}
            >
              Reserve
            </Link>

            {/* Burger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{ color: '#F6F2E9' }}
            >
              <span
                style={{
                  display: 'block', height: '1px', backgroundColor: 'currentColor',
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform: open ? 'rotate(45deg) translateY(6px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block', height: '1px', backgroundColor: 'currentColor',
                  transition: 'opacity 0.3s',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block', height: '1px', backgroundColor: 'currentColor',
                  transition: 'transform 0.3s',
                  transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-[72px]"
            style={{ backgroundColor: '#0A0A0A' }}
          >
            <nav
              className="flex flex-col flex-1 justify-center"
              style={{ padding: '0 clamp(24px,8vw,64px)' }}
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  style={{
                    fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                    fontSize: 'clamp(46.4px,10vw,74.2px)', lineHeight: 1.1,
                    color: '#F6F2E9',
                    borderBottom: '1px solid rgba(246, 242, 233,0.07)',
                    paddingBottom: '20px', marginBottom: '20px',
                    display: 'block',
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="/#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  height: '48px', padding: '0 32px', alignSelf: 'flex-start',
                  backgroundColor: 'var(--ivory)', color: '#0A0A0A',
                  fontFamily: 'var(--font-inter)', fontWeight: 400,
                  fontSize: '11.6px', letterSpacing: '0.22em', textTransform: 'uppercase',
                  marginTop: '12px',
                }}
              >
                Reserve a Journey
              </motion.a>
            </nav>

            {/* Bottom contact strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{
                padding: 'clamp(20px,4vw,32px) clamp(24px,8vw,64px)',
                borderTop: '1px solid rgba(246, 242, 233,0.07)',
              }}
            >
              <a
                href="tel:+41772870956"
                style={{
                  fontFamily: 'var(--font-inter)', fontWeight: 300,
                  fontSize: '13.9px', letterSpacing: '0.08em',
                  color: 'rgba(246, 242, 233,0.45)',
                }}
              >
                +41 77 287 09 56
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
