export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: '#2F4A33', backgroundColor: '#0A0A0A' }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-8 md:px-14 lg:px-20 py-10">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-2">
          <span className="font-cormorant font-light tracking-[0.3em] text-ivory text-base uppercase">
            ALAIR NOIR
          </span>
          <span className="font-inter font-light text-[10px] tracking-[0.16em] uppercase text-stone">
            Private Mobility. Perfectly Delivered.
          </span>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-8 list-none">
            <li>
              <a
                href="https://instagram.com/alairnoir"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter font-light text-[9px] tracking-[0.18em] uppercase text-stone hover:text-ivory transition-colors duration-200"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:booking@alairnoir.ch"
                className="font-inter font-light text-[9px] tracking-[0.18em] uppercase text-stone hover:text-ivory transition-colors duration-200"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/41772870956"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter font-light text-[9px] tracking-[0.18em] uppercase text-stone hover:text-ivory transition-colors duration-200"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <p className="font-inter font-light text-[9px] tracking-[0.12em] text-stone">
          © {year} Alair Noir GmbH · CHE-411.952.415 · Zürich
        </p>
      </div>
    </footer>
  );
}
