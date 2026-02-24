'use client';

// ─────────────────────────────────────────────────────────────────────────────
// CountdownTimer — Live countdown to the next webinar session.
//
// Fires countdown_expired GTM event when the timer reaches zero.
// Optionally shows a "happening now" state when the event time has passed.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from 'react';
import { formatWebinarDate, scrollToForm } from '@/lib/funnel-utils';
import { getNextSession } from '@/lib/webinar-schedule';
import { fireCountdownExpired, fireCtaClick } from '@/lib/gtm';
import styles from './CountdownTimer.module.css';

export interface CountdownTimerProps {
  /**
   * ISO 8601 datetime string for the webinar. Source: config.webinar.datetime
   * Leave empty or omit to enable dynamic scheduling via lib/webinar-schedule.ts
   * (computes next session automatically in the client).
   */
  targetDatetime?: string;
  /** IANA timezone string. Source: config.webinar.timezone */
  timezone: string;
  /** Short webinar title for display in the "happening now" state */
  webinarTitle: string;
  /** Presenter's first name used in the scarcity message. Defaults to 'the presenter'. */
  presenterName?: string;
  funnelSlug: string;
  /**
   * When the timer is this many days or more away, suppress the ticking
   * countdown (which signals "no rush") and show a seats-scarcity message
   * instead. Defaults to 3 days.
   */
  urgencyThresholdDays?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDatetime: string): TimeLeft | null {
  const now = Date.now();
  const target = new Date(targetDatetime).getTime();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer({
  targetDatetime,
  timezone,
  webinarTitle,
  presenterName = 'the presenter',
  funnelSlug,
  urgencyThresholdDays = 3,
}: CountdownTimerProps) {
  // ── Dynamic scheduling ────────────────────────────────────────────────────
  // If no targetDatetime is provided (or it's empty), compute the next session
  // on the client to avoid stale/hardcoded dates.
  const [resolvedDatetime, setResolvedDatetime] = useState<string>(targetDatetime ?? '');

  useEffect(() => {
    if (!targetDatetime) {
      setResolvedDatetime(getNextSession().date.toISOString());
    }
  }, [targetDatetime]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    resolvedDatetime ? calculateTimeLeft(resolvedDatetime) : null
  );
  const [expired, setExpired] = useState(false);
  const hasExpiredFiredRef = useRef(false);

  const tick = useCallback(() => {
    if (!resolvedDatetime) return;
    const next = calculateTimeLeft(resolvedDatetime);
    if (!next) {
      setExpired(true);
      setTimeLeft(null);
      if (!hasExpiredFiredRef.current) {
        hasExpiredFiredRef.current = true;
        fireCountdownExpired(funnelSlug, resolvedDatetime);
      }
    } else {
      setTimeLeft(next);
    }
  }, [resolvedDatetime, funnelSlug]);

  useEffect(() => {
    if (!resolvedDatetime) return;
    // Re-seed timeLeft whenever resolvedDatetime changes (e.g., after dynamic resolve)
    setTimeLeft(calculateTimeLeft(resolvedDatetime));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick, resolvedDatetime]);

  const formattedDate = resolvedDatetime
    ? formatWebinarDate(resolvedDatetime, timezone)
    : 'Loading date...';

  // ── Approaching state: event is far away — a ticking countdown signals "no rush" ──
  // Show a scarcity-framed message with the date instead.
  if (timeLeft && timeLeft.days >= urgencyThresholdDays) {
    return (
      <div className={styles.wrapper}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.approachingLabel}>Seats Are Filling Up For This Training</p>
          <p className={styles.approachingDate}>{formattedDate}</p>
          <p className={styles.approachingSubtext}>
            We cap attendance to keep Q&amp;A time with {presenterName} meaningful.
            Spots go quickly once registration opens to our full list.
          </p>
          <button
            type="button"
            className={`cta-button ${styles.cta}`}
            onClick={() => {
              fireCtaClick(funnelSlug, 'Reserve My Spot Now', 'countdown');
              scrollToForm(funnelSlug, 'countdown');
            }}
          >
            Reserve My Spot Now →
          </button>
        </div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className={styles.wrapper}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.expiredLabel}>🔴 Training Is Starting Now</p>
          <p className={styles.webinarTitle}>{webinarTitle}</p>
          <button
            type="button"
            className={`cta-button ${styles.cta}`}
            onClick={() => {
              fireCtaClick(funnelSlug, 'Join Training Now', 'countdown');
              scrollToForm(funnelSlug, 'countdown');
            }}
          >
            Join Training Now →
          </button>
        </div>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Training starts in:</p>

        <div className={styles.segments}>
          {timeLeft.days > 0 && (
            <div className={styles.segment}>
              <span className={styles.number}>{pad(timeLeft.days)}</span>
              <span className={styles.unit}>Days</span>
            </div>
          )}
          <div className={styles.segment}>
            <span className={styles.number}>{pad(timeLeft.hours)}</span>
            <span className={styles.unit}>Hours</span>
          </div>
          <div className={styles.segment}>
            <span className={styles.number}>{pad(timeLeft.minutes)}</span>
            <span className={styles.unit}>Minutes</span>
          </div>
          <div className={styles.segment}>
            <span className={styles.number}>{pad(timeLeft.seconds)}</span>
            <span className={styles.unit}>Seconds</span>
          </div>
        </div>

        <p className={styles.dateDisplay}>{formattedDate}</p>
      </div>
    </div>
  );
}
