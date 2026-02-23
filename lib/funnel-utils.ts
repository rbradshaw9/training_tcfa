// ─────────────────────────────────────────────────────────────────────────────
// Funnel utilities — derives display values from a FunnelConfig.
// All functions are pure; nothing here throws. Missing fields always return
// a safe, sensible default so the page never breaks from an incomplete config.
// ─────────────────────────────────────────────────────────────────────────────

import type { FunnelConfig, FunnelTheme } from '@/types/funnel';
import { fireScrollToForm } from '@/lib/gtm';

// ── Theme defaults ────────────────────────────────────────────────────────────

export const DEFAULT_THEME: Required<FunnelTheme> = {
  primaryColor: '#e84010',
  primaryColorHover: '#c73509',
  accentColor: '#f5a623',
  backgroundColor: '#0a0a0a',
  surfaceColor: '#141414',
  textColor: '#ffffff',
  textMutedColor: '#a3a3a3',
  headlineFont: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
  bodyFont: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  ctaGradientStart: '#e84010',
  ctaGradientEnd: '#f5a623',
  heroBg: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a00 100%)',
  urgencyBarBg: '#b71c1c',
  urgencyBarText: '#ffffff',
};

/**
 * Merges config theme overrides on top of DEFAULT_THEME.
 * Returns a fully-resolved theme with no undefined values.
 */
export function resolveTheme(config: FunnelConfig): Required<FunnelTheme> {
  return { ...DEFAULT_THEME, ...config.theme };
}

// ── CSS custom properties ─────────────────────────────────────────────────────

/**
 * Converts a resolved theme into a flat Record that can be spread
 * directly onto a `style` prop as CSS custom properties.
 *
 * @example
 * <div style={resolveCssVariables(config)} />
 */
export function resolveCssVariables(config: FunnelConfig): Record<string, string> {
  const t = resolveTheme(config);
  return {
    '--color-primary': t.primaryColor,
    '--color-primary-hover': t.primaryColorHover,
    '--color-accent': t.accentColor,
    '--color-bg': t.backgroundColor,
    '--color-surface': t.surfaceColor,
    '--color-text': t.textColor,
    '--color-text-muted': t.textMutedColor,
    '--font-headline': t.headlineFont,
    '--font-body': t.bodyFont,
    '--cta-gradient-start': t.ctaGradientStart,
    '--cta-gradient-end': t.ctaGradientEnd,
    '--hero-bg': t.heroBg,
    '--urgency-bar-bg': t.urgencyBarBg,
    '--urgency-bar-text': t.urgencyBarText,
  };
}

// ── Date formatting ───────────────────────────────────────────────────────────

/**
 * Returns a human-readable webinar date string.
 *
 * @example
 * "Thursday, March 19, 2026 at 8:00 PM EST"
 */
export function formatWebinarDate(isoDatetime: string, timezone: string): string {
  try {
    const date = new Date(isoDatetime);
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoDatetime;
  }
}

/**
 * Returns just the time portion for compact displays.
 *
 * @example
 * "8:00 PM EST"
 */
export function formatWebinarTime(isoDatetime: string, timezone: string): string {
  try {
    const date = new Date(isoDatetime);
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoDatetime;
  }
}

// ── Copy helpers ──────────────────────────────────────────────────────────────

export function getCtaText(config: FunnelConfig): string {
  return config.heroCtaText ?? 'YES! RESERVE MY FREE SEAT NOW →';
}

export function getFormTitle(config: FunnelConfig): string {
  return config.formTitle ?? 'Reserve Your Free Spot Now';
}

export function getFormSubtext(config: FunnelConfig): string {
  if (config.formSubtext) return config.formSubtext;
  const dateStr = config.webinar.datetime
    ? formatWebinarDate(config.webinar.datetime, config.webinar.timezone)
    : 'the next available session';
  return `Seats are limited. Enter your details below to claim your spot on the ${dateStr}.`;
}

export function getFormPrivacyNote(config: FunnelConfig): string {
  return (
    config.formPrivacyNote ??
    '🔒 Your information is 100% secure and will never be shared.'
  );
}

export function getUrgencyHeadline(config: FunnelConfig): string {
  const spots = config.urgencySpotsRemaining;
  if (spots !== undefined) {
    return config.urgencyHeadline ?? `⚠️ Only ${spots} Spots Remaining — Register Now Before It's Full`;
  }
  return config.urgencyHeadline ?? '⚠️ Seats Are Filling Up Fast — Register Now';
}

export function getLearnSectionTitle(config: FunnelConfig): string {
  return config.learnSectionTitle ?? "Here's What You'll Discover on This Free Training:";
}

export function getTestimonialsSectionTitle(config: FunnelConfig): string {
  return config.testimonialsSectionTitle ?? "Real Results From Real Students";
}

export function getHeroBadgeText(config: FunnelConfig): string {
  return config.heroBadgeText ?? '🔴 FREE LIVE TRAINING';
}

// ── Scroll utility ────────────────────────────────────────────────────────────

/**
 * Smoothly scrolls to the registration form section and fires the
 * GTM scroll_to_form event (once per call — caller decides when to invoke).
 *
 * @param funnelSlug   - required to fire the GTM event; omit in non-client contexts
 * @param triggerSource - where the call originated: 'hero_cta' | 'urgency_bar' | 'countdown'
 */
export function scrollToForm(funnelSlug?: string, triggerSource?: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('registration-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (funnelSlug) {
      fireScrollToForm(funnelSlug, triggerSource);
    }
  }
}

// ── Metadata builder ──────────────────────────────────────────────────────────

/**
 * Builds a Next.js Metadata object from a FunnelConfig.
 * Import and use this in each funnel's page.tsx generateMetadata export.
 */
export function buildMetadata(config: FunnelConfig) {
  const { meta } = config;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      images: meta.ogImage ? [{ url: meta.ogImage, width: 1200, height: 630 }] : undefined,
      type: 'website' as const,
    },
    twitter: {
      card: (meta.twitterCard ?? 'summary_large_image') as 'summary' | 'summary_large_image',
      title: meta.ogTitle ?? meta.title,
      description: meta.ogDescription ?? meta.description,
      images: meta.ogImage ? [meta.ogImage] : undefined,
    },
    alternates: meta.canonicalUrl ? { canonical: meta.canonicalUrl } : undefined,
    icons: meta.favicon ? { icon: meta.favicon } : undefined,
  };
}
