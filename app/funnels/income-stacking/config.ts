// ─────────────────────────────────────────────────────────────────────────────
// Income Stacking Webinar — Funnel Config
//
// This is the ONLY file you edit to update this funnel.
// Swap text, dates, form embeds, speaker info, or theme without
// touching any component code.
// ─────────────────────────────────────────────────────────────────────────────

import type { FunnelConfig } from '@/types/funnel';
import { WEBINAR_FUEL_ID } from '@/lib/webinar-schedule';

const config: FunnelConfig = {
  // ── Identity ─────────────────────────────────────────────────────────────
  slug: 'income-stacking',

  // ── Meta & SEO ────────────────────────────────────────────────────────────
  meta: {
    title: 'How to Create Multiple Income Streams in 2026 — Free Live Training',
    description:
      'Discover the exact 3-step "Income Stacking" method that lets everyday people build multiple streams of passive income — even if you start with no money, no audience, and no experience.',
    ogTitle: 'FREE Training: The Income Stacking Blueprint',
    ogDescription:
      'Join Ryan Bradshaw LIVE as he reveals the no-fluff system for stacking $3,000–$10,000+ per month in passive income streams alongside your current job.',
    ogImage: 'https://go.thecashflowacademy.com/og/income-stacking.jpg',
    canonicalUrl: 'https://training.thecashflowacademy.com',
    twitterCard: 'summary_large_image',
    favicon: '/favicon.ico',
  },

  // ── Google Tag Manager ────────────────────────────────────────────────────
  // Replace with your actual GTM container ID before going live
  gtmContainerId: 'GTM-XXXXXXX',

  // ── Webinar Details ───────────────────────────────────────────────────────
  // dynamic: true  →  CountdownTimer and HeroSection compute the next session
  //                   automatically via lib/webinar-schedule.ts (ET timezone).
  //                   Leave `datetime` unset; it is computed at runtime.
  webinarFuelId: WEBINAR_FUEL_ID,
  webinar: {
    title: 'The Income Stacking Blueprint',
    dynamic: true,
    timezone: 'America/New_York',
    durationMinutes: 90,
    type: 'live',
    platform: 'Zoom Webinar',
  },

  // ── Hero Section ──────────────────────────────────────────────────────────
  heroBadgeText: '🔴 FREE LIVE TRAINING — LIMITED SEATS',
  heroHeadline:
    'How to Stack $3,000–$10,000+ Per Month in Passive Income\n—Without Quitting Your Job',
  heroSubheadline:
    'Join investor & educator Ryan Bradshaw on this free 90-minute training where he reveals the exact "Income Stacking" blueprint his students use to build 3–5 streams of leveraged income — starting from scratch.',
  heroBullets: [
    'The 3 "low-friction" income streams that work even if you have zero experience or start-up capital',
    'Why trading your time for money is the #1 financial trap — and the exact escape plan',
    'How to stack income streams in the right ORDER so each one funds the next',
    'The single shift in thinking that separates people who build wealth vs. those who just stay busy',
    'A live walkthrough of a real $6,200/month income stack built in under 12 months',
  ],
  heroCtaText: 'YES! RESERVE MY FREE SEAT NOW →',
  heroBackgroundImage: '',

  // ── Registration Form ─────────────────────────────────────────────────────
  formTitle: 'Claim Your Free Seat',
  formSubtext:
    'Enter your name and best email below to register instantly. You\'ll receive a confirmation with all the details.',
  formPrivacyNote: '🔒 100% Free. No spam. Unsubscribe anytime.',

  // ─────────────────────────────────────────────────────────────────────────
  // INFUSIONSOFT FORM EMBED
  // Replace the value below with the actual embed code from your Infusionsoft
  // / Keap webform. Paste the full <script> or <iframe> snippet here as a
  // raw string. Example structure:
  //
  //   formEmbedCode: `<script src="https://xyz.infusionsoft.com/app/webFormHTML/..."></script>`,
  //
  // The platform wraps this in a styled container — you do NOT style the
  // form fields themselves. All submission logic stays with Infusionsoft.
  // ─────────────────────────────────────────────────────────────────────────
  formEmbedCode: `<form
  accept-charset="UTF-8"
  action="https://yv932.infusionsoft.com/app/form/process/8f04d117543e2ecf27d40a3338f87e9d"
  class="infusion-form"
  id="inf_form_8f04d117543e2ecf27d40a3338f87e9d"
  method="POST"
>
  <input name="inf_form_xid" type="hidden" value="8f04d117543e2ecf27d40a3338f87e9d" />
  <input name="inf_form_name" type="hidden" value="Daily Income Stacking Webinar Registration" />
  <input name="infusionsoft_version" type="hidden" value="1.70.0.895672" />

  <div class="infusion-field">
    <label for="inf_field_FirstName">First Name *</label>
    <input id="inf_field_FirstName" name="inf_field_FirstName" placeholder="First Name" type="text" required />
  </div>

  <div class="infusion-field">
    <label for="inf_field_LastName">Last Name</label>
    <input id="inf_field_LastName" name="inf_field_LastName" placeholder="Last Name" type="text" />
  </div>

  <div class="infusion-field">
    <label for="inf_field_Email">Email *</label>
    <input id="inf_field_Email" name="inf_field_Email" placeholder="Email *" type="email" required />
  </div>

  <div class="infusion-field">
    <label for="inf_field_Phone1">Mobile Phone</label>
    <input id="inf_field_Phone1" name="inf_field_Phone1" placeholder="Mobile Phone" type="tel" />
  </div>

  <div class="infusion-field">
    <span class="infusion-checkbox">
      <input
        id="inf_option_Bychecking"
        name="inf_option_Bychecking"
        type="checkbox"
        value="4159"
      />
      <label for="inf_option_Bychecking">
        By checking this box, I agree to receive text messages from The Cash Flow Academy
        at the number provided. Message &amp; data rates may apply. Reply STOP to unsubscribe.
      </label>
    </span>
  </div>

  <!-- UTM / Attribution hidden fields -->
  <input name="inf_custom_GaContent"    type="hidden" value="null" />
  <input name="inf_custom_GaSource"     type="hidden" value="null" />
  <input name="inf_custom_GaMedium"     type="hidden" value="null" />
  <input name="inf_custom_GaTerm"       type="hidden" value="null" />
  <input name="inf_custom_GaCampaign"   type="hidden" value="null" />
  <input name="inf_custom_GaCampaignID" type="hidden" value="null" />
  <input name="inf_custom_GaReferurl"   type="hidden" value="null" />
  <input name="inf_custom_fbclid"       type="hidden" value="null" />

  <!-- WebinarFuel / session tracking hidden fields -->
  <input name="inf_custom_WebinarFuelWebinarID"  type="hidden" value="null" />
  <input name="inf_custom_WebinarFuelSessionId" type="hidden" value="null" />
  <input name="inf_custom_TimeZone"              type="hidden" value="null" />

  <!-- Honeypot anti-spam -->
  <input type="text" name="inf-sbt" style="display:none !important;" tabindex="-1" autocomplete="off" />

  <div class="infusion-submit">
    <button class="infusion-recaptcha" type="submit">Save My Seat</button>
  </div>
</form>
<script src="https://yv932.infusionsoft.app/app/webTracking/getTrackingCode"></script>
<script src="https://yv932.infusionsoft.com/app/timezone/timezoneInputJs?xid=8f04d117543e2ecf27d40a3338f87e9d"></script>
<script src="https://yv932.infusionsoft.com/js/jquery/jquery-3.3.1.js"></script>
<script src="https://yv932.infusionsoft.app/app/webform/overwriteRefererJs"></script>`,

  // ── Speaker ───────────────────────────────────────────────────────────────
  speaker: {
    name: 'Ryan Bradshaw',
    title: 'Real Estate Investor & Financial Educator | Founder, The Cash Flow Academy',
    bio: "Ryan Bradshaw built his first income-stacking system while working a W-2 job and raising a family. After years of trial and error, he cracked a repeatable formula for layering multiple streams of passive income — then packaged it into a training system that has helped over 42,000 students across North America build real, lasting financial freedom. His approach is different: no get-rich-quick promises, no complicated strategies — just a clear, sequenced blueprint anyone can execute.",
    headshotUrl: '/images/ryan-bradshaw-headshot.jpg',
    credentials: [
      'Built a 7-figure real estate portfolio from a $0 starting point',
      'Founder of The Cash Flow Academy — 42,000+ students trained',
      'Author of "The Income Stack" — Amazon #1 Best Seller in Personal Finance',
      'Featured in Forbes, Entrepreneur, and The Wall Street Journal',
    ],
    companyLogoUrl: '/images/tcfa-logo-white.svg',
    socialProof: 'Over 42,000 students trained nationwide',
  },

  // ── What You'll Learn ─────────────────────────────────────────────────────
  learnSectionTitle: "Here's Exactly What You'll Discover on This Free Training:",
  learningPoints: [
    'The "Income Stack" framework — 3 specific stream types, in the exact order to build them for maximum leverage',
    'Why most people fail to create passive income (the 3 mistakes that keep you stuck in the time-for-money trap)',
    'How to identify YOUR personal income stack based on your available time, skills, and starting capital',
    'The fastest path to your first $1,000/month in semi-passive income — the one stream Ryan recommends every beginner start with',
    'How to automate and hand off each stream once it\'s producing — so it truly runs without you',
    'A real case study: how one student went from $0 to $6,200/month in 11 months starting with just $1,500',
    'The exact tools, platforms, and structures Ryan uses to manage 7 income streams simultaneously',
  ],

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonialsSectionTitle: 'Real Students. Real Results.',
  testimonials: [
    {
      name: 'Marcus T.',
      title: 'Firefighter, Dallas TX',
      quote:
        "I was skeptical — I've seen too many 'passive income' gurus online. But Ryan's blueprint was different. No fluff, no hype, just a step-by-step system. I implemented the first two streams while working my 24-hour shifts and hit $3,400/month within 8 months.",
      result: '$3,400/month in 8 months',
      stars: 5,
      imageUrl: '/images/testimonials/marcus-t.jpg',
    },
    {
      name: 'Jennifer L.',
      title: 'Elementary School Teacher, Phoenix AZ',
      quote:
        "I joined the training with $800 in savings and zero investing experience. Ryan walked me through exactly which stream to start with at my level. Eighteen months later I have three income streams producing $4,100/month and I've started my fourth.",
      result: '$4,100/month from 3 streams',
      stars: 5,
      imageUrl: '/images/testimonials/jennifer-l.jpg',
    },
    {
      name: 'Derek & Aisha W.',
      title: 'Married couple, two incomes, Atlanta GA',
      quote:
        "We came into the training thinking we needed a lot of money to start. Ryan completely flipped our thinking. We stacked correctly like he taught and now our combined stream income covers our entire mortgage, car payment, and then some.",
      result: 'Income streams cover $4,800/mo in fixed expenses',
      stars: 5,
      imageUrl: '/images/testimonials/derek-aisha-w.jpg',
    },
  ],

  // ── Urgency Bar ───────────────────────────────────────────────────────────
  urgencyEnabled: true,
  urgencyHeadline: '⚠️ This Training Is Filling Up — Seats Are Strictly Limited',
  urgencySubtext: 'We cap attendance to ensure quality Q&A time with Ryan. Reserve your seat now.',
  urgencySpotsRemaining: 47,

  // ── Trust Badges ──────────────────────────────────────────────────────────
  trustBadges: [
    { label: '100% Free Training' },
    { label: 'Instant Confirmation' },
    { label: 'Replay Available' },
    { label: 'No Credit Card Required' },
    { label: 'Trusted by 42,000+ Students' },
  ],

  // ── Theme ─────────────────────────────────────────────────────────────────
  // All values are optional — they override the platform defaults in globals.css
  theme: {
    primaryColor: '#e84010',
    primaryColorHover: '#c73509',
    accentColor: '#f5a623',
    backgroundColor: '#080808',
    surfaceColor: '#121212',
    textColor: '#f5f5f5',
    textMutedColor: '#a3a3a3',
    headlineFont: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
    bodyFont: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    ctaGradientStart: '#e84010',
    ctaGradientEnd: '#f5a623',
    heroBg: 'linear-gradient(150deg, #0d0d0d 0%, #1c0800 60%, #0d0d0d 100%)',
    urgencyBarBg: '#b71c1c',
    urgencyBarText: '#ffffff',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerCopyright: `© ${new Date().getFullYear()} The Cash Flow Academy. All Rights Reserved.`,
  footerDisclaimer:
    'INCOME DISCLAIMER: The income figures shared on this page are not typical. Individual results will vary based on effort, experience, and market conditions. This training is for educational purposes only and does not constitute financial or investment advice.',
  footerLinks: [
    { label: 'Privacy Policy', url: 'https://thecashflowacademy.com/privacy' },
    { label: 'Terms of Service', url: 'https://thecashflowacademy.com/terms' },
    { label: 'Contact Us', url: 'https://thecashflowacademy.com/contact' },
  ],
};

export default config;
