// ─────────────────────────────────────────────────────────────────────────────
// FunnelConfig — the single source of truth for every funnel.
// Editing a config.ts is the ONLY thing required to launch a new funnel.
// ─────────────────────────────────────────────────────────────────────────────

// ── Meta & SEO ────────────────────────────────────────────────────────────────

export interface FunnelMeta {
  /** Browser tab title */
  title: string;
  /** Meta description for search engines / social shares */
  description: string;
  /** Open Graph title (falls back to `title`) */
  ogTitle?: string;
  /** Open Graph description (falls back to `description`) */
  ogDescription?: string;
  /** Absolute URL to OG share image (1200×630 recommended) */
  ogImage?: string;
  /** Canonical URL for this page */
  canonicalUrl?: string;
  /** Path to favicon — relative from /public or absolute URL */
  favicon?: string;
  /** Twitter/X card type */
  twitterCard?: 'summary' | 'summary_large_image';
}

// ── Speaker ───────────────────────────────────────────────────────────────────

export interface FunnelSpeaker {
  name: string;
  /** Short title / role shown under name */
  title: string;
  /** Full bio paragraph(s) */
  bio: string;
  /** Absolute or /public-relative URL to headshot image */
  headshotUrl: string;
  /** Credential bullets, e.g. ["Built a $4M portfolio in 3 years"] */
  credentials?: string[];
  /** Optional company/brand logo shown alongside headshot */
  companyLogoUrl?: string;
  /** Optional social proof number, e.g. "Over 42,000 students trained" */
  socialProof?: string;
}

// ── Webinar ───────────────────────────────────────────────────────────────────

export interface FunnelWebinar {
  /** Webinar title used in copy ("Join [title]") */
  title: string;
  /**
   * ISO 8601 datetime string for the next session.
   * Leave empty (`''`) to enable client-side dynamic schedule computation
   * via lib/webinar-schedule.ts (recommended for daily recurring webinars).
   * Example static value: "2026-03-15T20:00:00"
   */
  datetime?: string;
  /** IANA timezone identifier, e.g. "America/New_York" */
  timezone: string;
  /** Duration in minutes, used for display copy */
  durationMinutes: number;
  /** Live or pre-recorded (evergreen). Affects urgency copy. */
  type?: 'live' | 'automated';
  /** Short platform description, e.g. "Zoom Webinar" */
  platform?: string;
  /**
   * When true, CountdownTimer and HeroSection will compute the next session
   * dynamically on the client using lib/webinar-schedule.ts instead of
   * using the static `datetime` value.
   */
  dynamic?: boolean;
}

// ── Theme ─────────────────────────────────────────────────────────────────────

export interface FunnelTheme {
  /** Primary brand / CTA button color. Default: #e84010 */
  primaryColor?: string;
  /** Hover state for primary color. Default: auto-darkened */
  primaryColorHover?: string;
  /** Secondary accent color for highlights. Default: #f5a623 */
  accentColor?: string;
  /** Page background color. Default: #0a0a0a */
  backgroundColor?: string;
  /** Card / panel surface color. Default: #141414 */
  surfaceColor?: string;
  /** Primary text color. Default: #ffffff */
  textColor?: string;
  /** Muted / secondary text color. Default: #a3a3a3 */
  textMutedColor?: string;
  /** Headline font stack (CSS font-family value) */
  headlineFont?: string;
  /** Body font stack (CSS font-family value) */
  bodyFont?: string;
  /** Start color of CTA button gradient. Defaults to primaryColor */
  ctaGradientStart?: string;
  /** End color of CTA button gradient. Defaults to accentColor */
  ctaGradientEnd?: string;
  /** Hero section background color / gradient override */
  heroBg?: string;
  /** Urgency bar background color. Default: #c0392b */
  urgencyBarBg?: string;
  /** Urgency bar text color. Default: #ffffff */
  urgencyBarText?: string;
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface Testimonial {
  /** Attendee's full name */
  name: string;
  /** Short title / occupation shown under name */
  title?: string;
  /** The quote text */
  quote: string;
  /** URL to headshot image */
  imageUrl?: string;
  /** Bolded result callout, e.g. "Made $11,000 in 60 days" */
  result?: string;
  /** Star rating 1–5 (optional, shows star icons when provided) */
  stars?: 1 | 2 | 3 | 4 | 5;
}

// ── Trust Badges ──────────────────────────────────────────────────────────────

export interface TrustBadge {
  /** Display label */
  label: string;
  /** Inline SVG string or URL to badge icon */
  icon?: string;
}

// ── Root Config ───────────────────────────────────────────────────────────────

export interface FunnelConfig {
  // ── Identity ──────────────────────────────────────────────────────────────
  /** Internal slug — must match the folder name in /app/funnels/ */
  slug: string;

  // ── Meta & SEO ────────────────────────────────────────────────────────────
  meta: FunnelMeta;

  // ── Google Tag Manager ────────────────────────────────────────────────────
  /** GTM container ID, e.g. "GTM-XXXXXXX" */
  gtmContainerId: string;

  // ── Webinar ───────────────────────────────────────────────────────────────
  webinar: FunnelWebinar;

  // ── Hero Section ──────────────────────────────────────────────────────────
  /**
   * Main headline — supports newlines via \n for manual line breaks.
   * Can use ** ** markdown-style bold markers for emphasis.
   */
  heroHeadline: string;
  /** Sub-headline paragraph below main headline */
  heroSubheadline?: string;
  /** Bullet points shown in the hero (what they'll discover) */
  heroBullets?: string[];
  /** CTA button label. Default: "YES! RESERVE MY FREE SEAT NOW →" */
  heroCtaText?: string;
  /** Small text above the headline, e.g. "FREE LIVE TRAINING" badge */
  heroBadgeText?: string;
  /** Background image URL for the hero (dark overlay applied automatically) */
  heroBackgroundImage?: string;

  // ── Registration Form ─────────────────────────────────────────────────────
  /**
   * Raw HTML embed code from Infusionsoft/Keap.
   * Paste exactly as provided — the platform wraps it in a styled container.
   */
  formEmbedCode: string;
  /** Headline shown above the form box */
  formTitle?: string;
  /** Subtext shown directly above the form iframe */
  formSubtext?: string;
  /** Small print / privacy notice shown below the form */
  formPrivacyNote?: string;

  // ── Speaker ───────────────────────────────────────────────────────────────
  speaker: FunnelSpeaker;

  // ── What You'll Learn ─────────────────────────────────────────────────────
  /** Section headline */
  learnSectionTitle?: string;
  /** Array of learning point strings */
  learningPoints?: string[];

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials?: Testimonial[];
  /** Section headline for testimonials */
  testimonialsSectionTitle?: string;

  // ── Urgency Bar ───────────────────────────────────────────────────────────
  urgencyEnabled?: boolean;
  urgencyHeadline?: string;
  urgencySubtext?: string;
  /** Optional number displayed as "Only X spots remaining" */
  urgencySpotsRemaining?: number;

  // ── Trust Badges ──────────────────────────────────────────────────────────
  trustBadges?: TrustBadge[];

  // ── Theme ─────────────────────────────────────────────────────────────────
  theme?: FunnelTheme;

  // ── WebinarFuel ──────────────────────────────────────────────────────────
  /**
   * WebinarFuel webinar ID — injected into the form's hidden
   * `inf_custom_WebinarFuelWebinarID` field by WebinarFuelTracker.
   */
  webinarFuelId?: string;

  // ── Footer ────────────────────────────────────────────────────────────────
  footerDisclaimer?: string;
  footerCopyright?: string;
  footerLinks?: Array<{ label: string; url: string }>;
}
