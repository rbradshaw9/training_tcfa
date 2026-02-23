// ─────────────────────────────────────────────────────────────────────────────
// Root page — Daily Income Stacking Webinar Funnel
//
// This is the root route ("/") served as the main landing page.
// Additional funnels live at their own sub-paths (e.g. /funnel-name/).
//
// To update ANY copy, design, or settings: edit
//   app/funnels/income-stacking/config.ts
// — never this file.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import config from './funnels/income-stacking/config';
import { buildMetadata, resolveCssVariables } from '@/lib/funnel-utils';

// Components
import GTMTracker from '@/components/GTMTracker';
import UrgencyBar from '@/components/UrgencyBar';
import HeroSection from '@/components/HeroSection';
import SpeakerBio from '@/components/SpeakerBio';
import RegistrationForm from '@/components/RegistrationForm';
import CountdownTimer from '@/components/CountdownTimer';
import TestimonialsSection from '@/components/TestimonialsSection';
import TrustBadges from '@/components/TrustBadges';
import PageFooter from '@/components/PageFooter';
import WebinarFuelTracker from '@/components/WebinarFuelTracker';

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata(config);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RootPage() {
  const cssVars = resolveCssVariables(config);

  return (
    <>
      {/* Client-side tracker: fires page_view, form_view, scroll_depth events */}
      <GTMTracker funnelSlug={config.slug} />

      {/*
        WebinarFuel + UTM tracker: waits for the IS form, then injects the
        WebinarFuel webinarID, session ID, UTM params, and timezone into the
        form's hidden fields. Re-injects on submit.
      */}
      {config.webinarFuelId && (
        <WebinarFuelTracker webinarFuelId={config.webinarFuelId} />
      )}

      {/*
        Root wrapper: injects all CSS custom property overrides from this
        funnel's theme config. Every component inherits these variables.
      */}
      <div
        style={cssVars as React.CSSProperties}
        data-funnel={config.slug}
      >
        {/* ── 1. Urgency Bar ────────────────────────────────────────────── */}
        {config.urgencyEnabled && (
          <UrgencyBar
            headline={config.urgencyHeadline}
            subtext={config.urgencySubtext}
            spotsRemaining={config.urgencySpotsRemaining}
            funnelSlug={config.slug}
          />
        )}

        {/* ── 2. Hero Section ───────────────────────────────────────────── */}
        <HeroSection
          badgeText={config.heroBadgeText}
          headline={config.heroHeadline}
          subheadline={config.heroSubheadline}
          bullets={config.heroBullets}
          ctaText={config.heroCtaText}
          backgroundImage={config.heroBackgroundImage}
          webinar={config.webinar}
          funnelSlug={config.slug}
        />

        {/* ── 3. Countdown Timer ────────────────────────────────────────── */}
        {/* targetDatetime is omitted when webinar.dynamic is true;
            the timer computes the next ET session automatically. */}
        <CountdownTimer
          targetDatetime={config.webinar.dynamic ? undefined : config.webinar.datetime}
          timezone={config.webinar.timezone}
          webinarTitle={config.webinar.title}
          funnelSlug={config.slug}
        />

        {/*
          ── 4. Testimonials (above the first form) ────────────────────────
          Social proof before the ask — lands at peak trust evaluation.
        */}
        {config.testimonials && config.testimonials.length > 0 && (
          <TestimonialsSection
            testimonials={config.testimonials}
            sectionTitle={config.testimonialsSectionTitle}
            funnelSlug={config.slug}
          />
        )}

        {/* ── 5. What You'll Learn + Registration Form (side-by-side on desktop) */}
        <RegistrationForm
          formEmbedCode={config.formEmbedCode}
          formTitle={config.formTitle}
          formSubtext={config.formSubtext}
          formPrivacyNote={config.formPrivacyNote}
          learningPoints={config.learningPoints}
          learnSectionTitle={config.learnSectionTitle}
          ctaText={config.heroCtaText}
          funnelSlug={config.slug}
          formId="registration-form"
          formInstance="top"
        />

        {/* ── 6. Speaker Bio ────────────────────────────────────────────── */}
        <SpeakerBio speaker={config.speaker} funnelSlug={config.slug} />

        {/* ── 7. Trust Badges ───────────────────────────────────────────── */}
        {config.trustBadges && config.trustBadges.length > 0 && (
          <TrustBadges badges={config.trustBadges} funnelSlug={config.slug} />
        )}

        {/* ── 8. Bottom CTA + Form (repeat for long-scroll conversion) ──── */}
        <RegistrationForm
          formEmbedCode={config.formEmbedCode}
          formTitle="BUILD RETIREMENT SAVINGS. CREATE NEW INCOME STREAMS. UPGRADE YOUR LIFESTYLE."
          formSubtext="Claim your spot now and discover how Income Stacking can transform your financial future."
          formPrivacyNote={config.formPrivacyNote}
          ctaText={config.heroCtaText}
          funnelSlug={config.slug}
          isBottomForm
        />

        {/* ── 9. Footer ─────────────────────────────────────────────────── */}
        <PageFooter
          disclaimer={config.footerDisclaimer}
          copyright={config.footerCopyright}
          links={config.footerLinks}
          funnelSlug={config.slug}
        />
      </div>
    </>
  );
}
