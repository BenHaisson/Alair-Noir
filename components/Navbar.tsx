'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Arrival', href: '#arrival' },
  { label: 'Standard', href: '#standard' },
  { label: 'Cabins', href: '#cabins' },
  { label: 'Routes', href: '#routes' },
  { label: 'Private Office', href: '#private-office' },
  { label: 'Request', href: '#request' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
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
        <div className="nav-inner">
          <Link href="/" aria-label="Alair Noir home" style={{ lineHeight: 0 }}>
            <Logo variant="nav" animate color="#F6F2E9" accentColor="#D6C7B0" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#request" className="nav-request hidden md:inline-flex">
              Request
            </a>
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              type="button"
            >
              <span className={`menu-line ${open ? 'menu-line--top' : ''}`} />
              <span className={`menu-line ${open ? 'menu-line--middle' : ''}`} />
              <span className={`menu-line ${open ? 'menu-line--bottom' : ''}`} />
            </button>
          </div>
        </div>
      </header>

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
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/41772870956"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mobile-whatsapp"
              >
                WhatsApp Direct
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
