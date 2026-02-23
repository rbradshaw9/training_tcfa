// ─────────────────────────────────────────────────────────────────────────────
// TrustBadges — Horizontal row of credibility/trust indicators.
//
// Displays icon + label badges that reinforce the registration decision.
// ─────────────────────────────────────────────────────────────────────────────

import type { TrustBadge } from '@/types/funnel';
import styles from './TrustBadges.module.css';

export interface TrustBadgesProps {
  /** Array of badge objects. Source: config.trustBadges */
  badges: TrustBadge[];
  funnelSlug: string;
}

/** Fallback icon used when no custom icon is provided for a badge */
const DEFAULT_ICON = '✓';

export default function TrustBadges({ badges }: TrustBadgesProps) {
  return (
    <div className={styles.wrapper} aria-label="Trust indicators">
      <div className={`container ${styles.inner}`}>
        <ul className={styles.list}>
          {badges.map((badge, i) => (
            <li key={i} className={styles.badge}>
              {badge.icon ? (
                <span
                  className={styles.icon}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: badge.icon }}
                />
              ) : (
                <span className={styles.icon} aria-hidden="true">
                  {DEFAULT_ICON}
                </span>
              )}
              <span className={styles.label}>{badge.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
