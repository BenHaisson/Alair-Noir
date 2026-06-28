'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Fleet',    href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-20">
        {/* Wordmark */}
        <a href="/" aria-label="Alair Noir — home">
          <Logo variant="nav" animate color="#EDE8E0" accentColor="#C9A84C" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Reserve CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center transition-colors duration-300"
          style={{
            height: '36px', padding: '0 24px',
            border: '1px solid var(--border-gold)',
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)';
            (e.currentTarget as HTMLElement).style.color = '#080808';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
          }}
        >
          Reserve
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: 'var(--text)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            {open ? (
              <>
                <line x1="1" y1="1" x2="19" y2="13" stroke="currentColor" strokeWidth="1.2" />
                <line x1="19" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.2" />
              </>
            ) : (
              <>
                <line x1="0" y1="1"  x2="20" y2="1"  stroke="currentColor" strokeWidth="1.2" />
                <line x1="0" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.2" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.2" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden flex flex-col gap-6 px-6 py-8"
          style={{ backgroundColor: 'rgba(8,8,8,0.98)', borderTop: '1px solid var(--border)' }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 24px',
              border: '1px solid var(--border-gold)', color: 'var(--gold)',
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              width: 'fit-content',
            }}
          >
            Reserve
          </a>
        </div>
      )}
    </header>
  );
}
