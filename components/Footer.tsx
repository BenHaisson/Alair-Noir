'use client';
import Logo from './Logo';

const LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];
const LEGAL = ['Privacy', 'Terms'];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid var(--border)' }}>
      <div style={{
        padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,80px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(32px,5vw,64px)',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Logo variant="nav" color="#EDE8E0" accentColor="#C9A84C" />
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '0.05em',
            color: 'var(--text-subtle)',
          }}>
            Two vehicles. One standard.
          </p>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Contact + copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <a
            href="tel:+41772870956"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '0.05em',
              color: 'var(--text-subtle)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
          >
            +41 77 287 09 56
          </a>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-subtle)',
            opacity: 0.5,
          }}>
            © {year} Alair Noir GmbH · Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
