import { Reveal } from '@/components/motion/Reveal';

const footerLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: 'mailto:info@alairnoir.ch' },
];

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <Reveal>
        <p className="footer-statement">
          Private mobility,<br />
          <span style={{ color: 'var(--gold)' }}>orchestrated</span> with discretion.
        </p>
        <p className="footer-address">
          Zurich · Geneva · St. Moritz · Europe<br />
          info@alairnoir.ch &nbsp;·&nbsp; +41 44 123 45 67
        </p>
      </Reveal>

      <div className="footer-links">
        <span style={{ color: 'rgba(147,139,127,.45)', fontSize: 9, letterSpacing: '.08em' }}>
          © {new Date().getFullYear()} ALAIR NOIR GmbH
        </span>
        {footerLinks.map(link => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  );
}
