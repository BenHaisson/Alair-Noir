import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-12"
      style={{ background: 'var(--noir)', borderTop: '1px solid rgba(246,242,233,0.06)' }}
    >
      <div className="an-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <Logo variant="nav" color="#F6F2E9" accentColor="#D6C7B0" className="mb-3" />
            <p className="font-inter font-light text-[11px] tracking-[0.04em]" style={{ color: 'var(--muted)' }}>
              Two vehicles. One standard.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 font-inter text-[8px] tracking-[0.18em] uppercase" style={{ color: 'var(--stone)' }}>
            {['Fleet', 'Services', 'Journey', 'Book', 'Contact'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="hover:text-ivory transition-colors duration-300"
              >
                {l}
              </a>
            ))}
          </nav>
          <p className="font-inter text-[8px] tracking-[0.10em] uppercase" style={{ color: 'var(--stone)' }}>
            © {year} ALAIR NOIR GMBH · Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
