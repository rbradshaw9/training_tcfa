'use client';

// ─────────────────────────────────────────────────────────────────────────────
// UrgencyBar — Sticky top banner driving scarcity / urgency.
//
// Includes headline, optional spots-remaining count, and "register now" CTA.
// Appears above the hero and is visible as the user scrolls.
// ─────────────────────────────────────────────────────────────────────────────

import { scrollToForm } from '@/lib/funnel-utils';
import { fireCtaClick } from '@/lib/gtm';
import styles from './UrgencyBar.module.css';

export interface UrgencyBarProps {
  /** Main urgency headline. Source: config.urgencyHeadline */
  headline?: string;
  /** Secondary copy. Source: config.urgencySubtext */
  subtext?: string;
  /** Optional spots count for dynamic scarcity. Source: config.urgencySpotsRemaining */
  spotsRemaining?: number;
  funnelSlug: string;
}

export default function UrgencyBar({
  headline,
  subtext,
  spotsRemaining,
  funnelSlug,
}: UrgencyBarProps) {
  const resolvedHeadline =
    headline ??
    (spotsRemaining !== undefined
      ? `⚠️ Only ${spotsRemaining} Spots Remaining — Register Now Before It's Full`
      : '⚠️ Seats Are Filling Up Fast — Register Now');

  function handleClick() {
    fireCtaClick(funnelSlug, 'Urgency Bar CTA', 'urgency_bar');
    scrollToForm(funnelSlug, 'urgency_bar');
  }

  return (
    <div className={styles.bar} role="alert">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.headline}>{resolvedHeadline}</p>
          {subtext && <p className={styles.subtext}>{subtext}</p>}
        </div>
        <button
          type="button"
          className={`cta-button ${styles.cta}`}
          onClick={handleClick}
        >
          Register Free →
        </button>
      </div>
    </div>
  );
}
