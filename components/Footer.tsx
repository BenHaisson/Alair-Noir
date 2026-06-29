'use client';
import Logo from './Logo';

const LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Fleet', href: '#collection' },
  { label: 'Interiors', href: '#bmw-i7' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
  { label: 'WhatsApp', href: 'https://wa.me/41772870956', external: true },
  { label: 'Phone', href: 'tel:+41772870956' },
];
const LEGAL = ['Impressum', 'Privacy Policy'];

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
        alignItems: 'flex-start',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '340px' }}>
          <Logo variant="nav" color="#EDE8E0" accentColor="#C9A84C" />
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '11px', letterSpacing: '0.05em',
            color: 'var(--text)',
          }}>
            Held to one standard.
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)', fontWeight: 300,
            fontSize: '11px', lineHeight: 1.7,
            color: 'var(--text-subtle)',
          }}>
            Private chauffeur service in Zürich for airport transfers, executive travel, events, and long-distance journeys across Switzerland and Europe.
          </p>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px', maxWidth: '320px' }}
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <a
            href="mailto:booking@alairnoir.ch"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '0.05em', color: 'var(--text-subtle)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
          >
            booking@alairnoir.ch
          </a>
          <a
            href="tel:+41772870956"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '0.05em', color: 'var(--text-subtle)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
          >
            +41 77 287 09 56
          </a>
          <a
            href="https://wa.me/41772870956"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 300,
              fontSize: '11px', letterSpacing: '0.05em', color: 'var(--text-subtle)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
          >
            WhatsApp Direct
          </a>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{
        padding: '0 clamp(20px,5vw,80px) clamp(32px,4vw,48px)',
        display: 'flex', flexWrap: 'wrap', gap: '20px 28px',
        justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid var(--border)', paddingTop: 'clamp(24px,3vw,32px)',
        marginTop: 'clamp(16px,2vw,24px)',
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {LEGAL.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: 'var(--font-inter)', fontWeight: 300,
                fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--text-subtle)', transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)')}
            >
              {l}
            </a>
          ))}
        </div>
        <p style={{
          fontFamily: 'var(--font-inter)', fontWeight: 300,
          fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--text-subtle)', opacity: 0.5,
        }}>
          © {year} Alair Noir GmbH · Switzerland
        </p>
      </div>
    </footer>
  );
}
