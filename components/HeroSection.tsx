'use client';

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection — above-the-fold conversion section.
//
// Contains: badge, headline, subheadline, bullet points (what you'll learn),
// webinar date/time display, and primary CTA button.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import type { FunnelWebinar } from '@/types/funnel';
import { formatWebinarDate, getCtaText, getHeroBadgeText, scrollToForm } from '@/lib/funnel-utils';
import { getNextSession } from '@/lib/webinar-schedule';
import { fireCtaClick } from '@/lib/gtm';
import { parseHeadline } from '@/lib/parseHeadline';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  badgeText?: string;
  headline: string;
  subheadline?: string;
  bullets?: string[];
  ctaText?: string;
  backgroundImage?: string;
  webinar: FunnelWebinar;
  funnelSlug: string;
}

export default function HeroSection({
  badgeText,
  headline,
  subheadline,
  bullets,
  ctaText,
  backgroundImage,
  webinar,
  funnelSlug,
}: HeroSectionProps) {
  const resolvedCtaText = ctaText ?? getCtaText({ slug: funnelSlug } as never);
  const resolvedBadge = badgeText ?? getHeroBadgeText({ slug: funnelSlug } as never);

  // ── Dynamic webinar date ──────────────────────────────────────────────────
  // When webinar.dynamic is true (or no datetime is set), compute the next
  // upcoming session on the client to keep the date display current.
  const [formattedDate, setFormattedDate] = useState<string>(() =>
    webinar.datetime
      ? formatWebinarDate(webinar.datetime, webinar.timezone)
      : 'Loading schedule...'
  );

  useEffect(() => {
    if (webinar.dynamic || !webinar.datetime) {
      const session = getNextSession();
      setFormattedDate(
        formatWebinarDate(session.date.toISOString(), webinar.timezone)
      );
    }
  }, [webinar.dynamic, webinar.datetime, webinar.timezone]);

  function handleCta() {
    fireCtaClick(funnelSlug, resolvedCtaText, 'hero');
    scrollToForm(funnelSlug, 'hero_cta');
  }

  return (
    <section
      className={styles.hero}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`${styles.content} container`}>
        {/* Badge */}
        <p className={styles.badge}>{resolvedBadge}</p>

        {/* Headline */}
        <h1 className={styles.headline}>
          {parseHeadline(headline)}
        </h1>

        {/* Subheadline */}
        {subheadline && <p className={styles.subheadline}>{subheadline}</p>}

        {/* Bullet points */}
        {bullets && bullets.length > 0 && (
          <ul className={styles.bullets}>
            {bullets.map((bullet, i) => (
              <li key={i} className={styles.bullet}>
                <span className={styles.bulletIcon} aria-hidden="true">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Webinar date/time */}
        <p className={styles.dateTime}>
          <span className={styles.dateTimeLabel}>Training Date:</span>{' '}
          <strong>{formattedDate}</strong>
          {webinar.platform && (
            <span className={styles.platform}> via {webinar.platform}</span>
          )}
        </p>

        {/* CTA Button */}
        <button
          type="button"
          className={`cta-button cta-button--large cta-button--pulse ${styles.cta}`}
          onClick={handleCta}
        >
          {resolvedCtaText}
        </button>

        {/* Below-CTA micro-copy */}
        <p className={styles.micro}>
          FREE to attend · {webinar.durationMinutes}-minute training · Replay included
        </p>
      </div>
    </section>
  );
}
