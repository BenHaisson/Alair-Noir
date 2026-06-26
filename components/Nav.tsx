'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Vehicle', href: '#vehicle' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2F4A33' : '1px solid transparent',
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20">
        {/* Logo */}
        <a
          href="/"
          className="font-cormorant font-light tracking-[0.3em] text-ivory text-base md:text-lg uppercase"
          aria-label="Alair Noir — home"
        >
          ALAIR NOIR
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-inter font-light text-[10px] tracking-[0.18em] uppercase text-stone hover:text-ivory transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Reserve CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center h-9 px-6 border border-cream text-cream font-inter font-light text-[10px] tracking-[0.18em] uppercase hover:bg-cream hover:text-black transition-all duration-300"
        >
          Reserve
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            {open ? (
              <>
                <line x1="1" y1="1" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <line x1="21" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-forest border-t border-moss px-6 py-6 flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-inter font-light text-[11px] tracking-[0.18em] uppercase text-stone hover:text-ivory transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center h-9 px-6 border border-cream text-cream font-inter font-light text-[10px] tracking-[0.18em] uppercase w-fit hover:bg-cream hover:text-black transition-all duration-300"
          >
            Reserve
          </a>
        </div>
      )}
    </header>
  );
}
