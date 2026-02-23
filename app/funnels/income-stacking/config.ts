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
    title: 'Maximize Your Investments with Income Stacking — Free Live Masterclass with Andy Tanner',
    description:
      'Unlock the power of Cash Flow Stocks and discover how to generate multiple income streams from a single stock. Join Rich Dad Expert Andy Tanner for this free masterclass.',
    ogTitle: 'FREE Masterclass: Income Stacking with Cash Flow Stocks',
    ogDescription:
      'Join Rich Dad Expert Andy Tanner LIVE and discover how to generate three unique income streams from a single stock — for consistent cash flow that grows and compounds over time.',
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
    title: 'Maximize Your Investments with Income Stacking',
    dynamic: true,
    timezone: 'America/New_York',
    durationMinutes: 90,
    type: 'live',
    platform: 'Zoom Webinar',
  },

  // ── Hero Section ──────────────────────────────────────────────────────────
  heroBadgeText: '🔴 FREE LIVE MASTERCLASS — JOIN RICH DAD EXPERT ANDY TANNER',
  heroHeadline: 'MAXIMIZE YOUR INVESTMENTS WITH **INCOME STACKING**',
  heroSubheadline:
    'Unlock the power of Cash Flow Stocks and discover how to generate multiple income streams from a single stock.',
  heroBullets: [
    'Step-by-Step Investing Blueprint: Access the proven methods Andy has shared with thousands of investors worldwide.',
    'Time-Tested Strategies: Perfect for anyone looking to build wealth — even if you feel behind and need to catch up.',
    'Boost Your Confidence: Learn how to take control of your financial future with clear, actionable steps.',
    'And So Much More!',
  ],
  heroCtaText: 'CLICK HERE TO REGISTER NOW',
  heroBackgroundImage: '',

  // ── Registration Form ─────────────────────────────────────────────────────
  formTitle: "DON'T MISS THIS FREE TRAINING",
  formSubtext:
    'Claim your spot now and discover how Income Stacking can transform your financial future.',
  formPrivacyNote: '🔒 100% Free. Spots are limited. Don\'t miss out!',

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
    name: 'Andy Tanner',
    title: 'Noted Author, Speaker, Teacher, and Long-time Rich Dad Expert',
    bio: "With a lifelong passion for Teaching, Investing, Entrepreneurship, and Self Development, Andy Tanner has devoted his career to training and inspiring motivated people all over the world. Andy's passion for helping investors and entrepreneurs shows through in everything he does: The Cash Flow Academy Show podcast, regular investing update videos and commentary, interviews with top experts, and focused training programs. The goal with The Cash Flow Academy is to make everything fun, simple, and real.\n\nAndy is a lifelong teacher and student of investing. His mission: empower and inspire people to discover how to create their own income — showing them what it really takes to become in control and self-sufficient.",
    headshotUrl: '/images/andy-tanner-headshot.jpg',
    credentials: [
      'Long-time Rich Dad Expert and close collaborator of Robert Kiyosaki',
      'Author of "Stock Market Cash Flow" — a Rich Dad Advisors book',
      'Founder of The Cash Flow Academy — thousands of investors trained worldwide',
      'Creator of the Income Stacking method for generating 3 income streams from a single stock',
    ],
    companyLogoUrl: '/images/tcfa-logo-white.svg',
    socialProof: 'Thousands of investors trained worldwide',
  },

  // ── What You'll Learn ─────────────────────────────────────────────────────
  learnSectionTitle: 'ANDY IS SHARING HIS MOST POWERFUL STRATEGIES',
  learningPoints: [
    'Discover the secret of Income Stacking with cash flow stocks — and see how anyone can unlock the potential for consistent income.',
    '**WHY INCOME STACKING IS SUPERIOR:** Unlike the typical "buy and hold" strategy, this method shows you how to generate three unique income streams from a single stock.',
    'Instead of relying on unpredictable stock value increases, learn how to turn your investments into consistent cash flow that grows and compounds for greater wealth.',
    '**ELIMINATE YOUR INVESTING FEARS:** Discover a strategy that builds confidence by focusing on generating income rather than gambling on market swings — with Andy showing you how to stack income streams while minimizing risks.',
    '**ACCELERATE YOUR INCOME AND CATCH UP FASTER:** It\'s never too late to start. This strategy creates multiple cash flow streams that compound over time, giving you the chance to achieve your lifestyle goals sooner.',
  ],

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonialsSectionTitle: "What Andy's Students Are Saying",
  testimonials: [
    {
      name: 'Justin OKeefe',
      quote:
        "Andy's teaching style is fantastic. If you don't understand the first time he will explain it — his talent for describing and personalizing concepts, and drawing fantastic diagrams that help explain any idea, really helps. With Andy you will definitely be able to learn to invest for cash flow with confidence.",
      stars: 5,
    },
    {
      name: 'David Corley',
      quote:
        'Andy makes things very simple to understand. This is a pretty complicated subject but I got the basics easily through his teaching style very early in the classes. I know that I will get out of the rat race and have financial freedom!',
      stars: 5,
    },
    {
      name: 'Guy Pierce',
      quote:
        "Andy's teaching style was perfect for a beginner like me to trading in the stock market. I can't believe how simple the process has become in just 30 days! I am placing trades and getting cash flow immediately and with Andy's training (and his awesome team) I am able to keep that cash repeatedly.",
      stars: 5,
    },
    {
      name: 'Michael Tollen',
      quote:
        "Andy's teaching style is clear, and he repeats the more complex concepts so that all understand them. It gives me confidence to buy & sell options. I won't need to put up so much capital to invest, and my risk can be controlled.",
      stars: 5,
    },
    {
      name: 'Carlos Azuero',
      quote:
        'Andy opened my eyes to a new world of possibilities. I realized that this is true — you can have control on the investment in this market with cash flow, something that I did not know could be possible.',
      stars: 5,
    },
    {
      name: 'Fortuna Gyeltsen',
      quote:
        'The training has improved my life in the short term by illuminating an accessible investment technique that allows control and risk management in a liquid market. I can sleep better at night knowing that I do not have to fall at the mercy of the market\'s ups and downs, but can position my investments accordingly.',
      stars: 5,
    },
  ],

  // ── Urgency Bar ───────────────────────────────────────────────────────────
  urgencyEnabled: true,
  urgencyHeadline: '⚠️ Spots Are Limited — Don\'t Miss Out on This Free Training with Andy Tanner',
  urgencySubtext: 'We cap attendance to ensure a quality experience. Reserve your spot now before it\'s full.',
  urgencySpotsRemaining: 47,

  // ── Trust Badges ──────────────────────────────────────────────────────────
  trustBadges: [
    { label: '100% Free Training' },
    { label: 'Instant Confirmation' },
    { label: 'Replay Available' },
    { label: 'No Credit Card Required' },
    { label: 'Rich Dad Expert' },
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
    'RESULTS DISCLAIMER: The results and income figures shared on this page reflect the experiences of individual students and are not typical. Investing in the stock market involves risk, including the possible loss of principal. Past performance is not indicative of future results. Nothing on this page constitutes financial, investment, or legal advice. The Cash Flow Academy and Andy Tanner are educators, not licensed financial advisors.',
  footerLinks: [
    { label: 'Privacy Policy', url: 'https://thecashflowacademy.com/privacy' },
    { label: 'Terms of Service', url: 'https://thecashflowacademy.com/terms' },
    { label: 'Contact Us', url: 'https://thecashflowacademy.com/contact' },
  ],
};

export default config;
