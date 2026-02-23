// ─────────────────────────────────────────────────────────────────────────────
// Income Stacking — Funnel Page
//
// This is a Next.js 14 Server Component.
// It reads the config, builds metadata, injects GTM, applies the theme,
// and assembles all section components in the correct conversion order.
//
// To update ANY copy, design, or settings: edit config.ts — never this file.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import config from './config';
import { buildMetadata, resolveCssVariables } from '@/lib/funnel-utils';

// Components
import GTMScript from '@/components/GTMScript';
import GTMTracker from '@/components/GTMTracker';
import UrgencyBar from '@/components/UrgencyBar';
import HeroSection from '@/components/HeroSection';
import SpeakerBio from '@/components/SpeakerBio';
import RegistrationForm from '@/components/RegistrationForm';
import CountdownTimer from '@/components/CountdownTimer';
import TestimonialsSection from '@/components/TestimonialsSection';
import TrustBadges from '@/components/TrustBadges';
import PageFooter from '@/components/PageFooter';

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata(config);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IncomeStackingPage() {
  const cssVars = resolveCssVariables(config);

  return (
    <>
      {/* GTM script tags — injected into <head> via next/script */}
      <GTMScript containerId={config.gtmContainerId} />

      {/* Client-side tracker: fires page_view, form_view, scroll_depth events */}
      <GTMTracker funnelSlug={config.slug} />

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
        <CountdownTimer
          targetDatetime={config.webinar.datetime}
          timezone={config.webinar.timezone}
          webinarTitle={config.webinar.title}
          funnelSlug={config.slug}
        />

        {/*
          ── 4. Testimonials (moved ABOVE the form) ────────────────────────
          Social proof lands at the point of highest trust evaluation —
          BEFORE the user is asked to submit their info.
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

        {/* ── 5. Speaker Bio ────────────────────────────────────────────── */}
        <SpeakerBio speaker={config.speaker} funnelSlug={config.slug} />

        {/* ── 6. Testimonials ───────────────────────────────────────────── */}
        {config.testimonials && config.testimonials.length > 0 && (
          <TestimonialsSection
            testimonials={config.testimonials}
            sectionTitle={config.testimonialsSectionTitle}
            funnelSlug={config.slug}
          />
        )}

        {/* ── 7. Trust Badges ───────────────────────────────────────────── */}
        {config.trustBadges && config.trustBadges.length > 0 && (
          <TrustBadges badges={config.trustBadges} funnelSlug={config.slug} />
        )}

        {/* ── 8. Bottom CTA + Form (repeat for long-scroll conversion) ──── */}
        <RegistrationForm
          formEmbedCode={config.formEmbedCode}
          formTitle="Don't Miss Out — Secure Your Seat Before It's Gone"
          formSubtext={config.formSubtext}
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
