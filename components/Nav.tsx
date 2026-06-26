'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Fleet',    href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Contact',  href: '#booking' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(246,242,233,0.06)' : '1px solid transparent',
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="an-container">
          <div className="h-[72px] flex items-center justify-between">
            <a href="#" className="font-cormorant text-[11px] tracking-[0.38em] uppercase text-ivory font-light">
              Alair <span className="text-gold">Noir</span>
            </a>

            <nav className="hidden md:flex items-center gap-9 font-inter text-[9px] tracking-[0.20em] uppercase">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-muted hover:text-ivory transition-colors duration-300">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="#booking"
                className="hidden md:inline-flex items-center h-9 px-5 font-inter text-[9px] tracking-[0.16em] uppercase text-gold hover:bg-gold hover:text-noir transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,55,0.50)' }}
              >
                Book Now
              </a>
              <button
                className="md:hidden text-ivory p-1"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                <div className="w-5 flex flex-col gap-[5px]">
                  <span className="h-px bg-current transition-all duration-300" style={{ transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                  <span className="h-px bg-current transition-opacity duration-300" style={{ opacity: open ? 0 : 1 }} />
                  <span className="h-px bg-current transition-all duration-300" style={{ transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-[72px]"
            style={{ background: 'var(--noir)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-8 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-cormorant text-[42px] font-light tracking-[-0.02em] text-ivory py-5"
                  style={{ borderBottom: '1px solid rgba(246,242,233,0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center h-12 bg-gold text-noir font-inter text-[10px] tracking-[0.18em] uppercase"
              >
                Book a Chauffeur
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
