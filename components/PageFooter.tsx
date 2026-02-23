// ─────────────────────────────────────────────────────────────────────────────
// PageFooter — Legal / disclaimer footer.
//
// Renders copyright, footer links, and earnings disclaimer text.
// ─────────────────────────────────────────────────────────────────────────────

import styles from './PageFooter.module.css';

export interface PageFooterProps {
  /** Legal / income disclaimer paragraph. Source: config.footerDisclaimer */
  disclaimer?: string;
  /** Copyright line. Source: config.footerCopyright */
  copyright?: string;
  /** Footer navigation links. Source: config.footerLinks */
  links?: Array<{ label: string; url: string }>;
  funnelSlug: string;
}

export default function PageFooter({
  disclaimer,
  copyright,
  links,
}: PageFooterProps) {
  return (
    <footer className={styles.footer} aria-label="Page footer">
      <div className={`container ${styles.inner}`}>

        {/* Links row */}
        {links && links.length > 0 && (
          <nav className={styles.links} aria-label="Footer links">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Disclaimer */}
        {disclaimer && (
          <p className={styles.disclaimer}>{disclaimer}</p>
        )}

        {/* Copyright */}
        {copyright && (
          <p className={styles.copyright}>{copyright}</p>
        )}

      </div>
    </footer>
  );
}
