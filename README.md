# Funnel Platform

A Next.js-based webinar registration funnel platform built for speed, conversion, and simplicity. Deployed on Vercel. Integrates with Infusionsoft/Keap for lead capture and Google Tag Manager for tracking.

## Philosophy

Each funnel lives in its own folder with its own config file. Changing headlines, speakers, dates, colors, or form endpoints never requires touching component code. Creating a new funnel takes less than 5 minutes.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- CSS Modules (no UI frameworks — full design control)
- Vercel (deployment)
- Infusionsoft/Keap (form submissions via POST endpoint)
- Google Tag Manager (all tracking and conversion events)

## Project Structure

\`\`\`
/app
  /funnels
    /income-stacking
      page.tsx          ← assembles components using config
      config.ts         ← all content and settings for this funnel
/components
  HeroSection/
  CountdownTimer/
  RegistrationForm/
  SpeakerBio/
  TestimonialsSection/
  UrgencyBar/
  TrustBadges/
  PageFooter/
/lib
  infusionsoft.ts       ← form submission handler
  gtm.ts                ← GTM event helpers
  funnel-utils.ts       ← config defaults and helpers
/styles
  globals.css           ← CSS variables, resets
/types
  funnel.ts             ← FunnelConfig TypeScript types
\`\`\`

## Creating a New Funnel

1. Duplicate `/app/funnels/income-stacking` and rename the folder
2. Edit `config.ts` with your new funnel's content
3. Push to main — Vercel deploys automatically
4. Done.

## Environment Variables

\`\`\`
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
\`\`\`

Each funnel can override GTM ID in its config if needed.

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

Connect repo to Vercel. Every push to main auto-deploys. Preview deployments created for every branch.

---

# Clone Analyst Brief — Income Stacking Registration Page

**Source URL:** `https://go.thecashflowacademy.com/income-stacking-reg-wf-ghl-d`
**GHL Funnel:** WEBINAR FUEL – Evergreen – Income Stacking Webinar
**Page ID:** `JlM6pqetJKVh2wCWTtLn` | **Step ID:** `5f63c824-cd0c-46e7-8326-cef31d438fba`

---

## 1. SECTION MAP (Top → Bottom)

| # | Section ID | Contents | Background | Approx Height |
|---|---|---|---|---|
| 1 | `section-WgBGBr5am` | Full-width logo/brand banner image | White `#ffffff` | ~80–120px |
| 2 | `section-2tssjHlotd` | **Hero** — headline, subhead, dynamic webinar date/time, primary CTA (left col 58%); Andy Tanner photo + credential (right col 42%) | White wrapper; inner row = sky blue `#53B9EF` | ~400–500px |
| 3 | `section-UZkNTb2us1` | **Main content block** — 5 nested rows (see below); blue outer chrome | Blue `rgb(1,116,199)` outer; white/light-blue inner rows | ~1,800–2,400px |
| 3a | `row-EWX8M2EHJAb` | 2-col: Andy circle headshot + "LEARN FROM ANDY" + bullets + CTA (left); 3 benefit sections w/ red subheads + body copy + CTA (right) | White | ~700px |
| 3b | `row-W3VbZbca7W0` | **Testimonials row 1** — 3 cards: Justin OKeefe, David Corley, Guy Pierce | White + card borders | ~450px |
| 3c | `row-yiSazh7Fr5O` | **Testimonials row 2** — 3 cards: Michael Tollen, Carlos Azuero, Fortuna Gyeltsen | White + card borders | ~450px |
| 3d | `row-e-FQPdb6rTp` | **Pre-close CTA** — "DON'T MISS THIS FREE TRAINING" + benefit summary line + CTA button | Light blue `rgb(204,223,247)` | ~200px |
| 3e | `row-oT_Ny3CIVG2` | **Bio section** — Andy speaking photo (left 33%); instructor bio paragraphs (right 66%) | White | ~350px |
| 4 | `section-Sz3IWi-INp` | **Footer** — legal disclaimer + copyright + logo + Contact / T&C / Privacy links | White | ~150px |
| M | **Modal Popup** `hl_main_popup-eg_UEq7yIU` | Triggered by every CTA button — "Register Your Spot Now!" header + Infusionsoft form | White, 5px solid black border | 720px wide desktop / 380px mobile |

---

## 2. COLOR PALETTE

| Role | Variable | Value |
|---|---|---|
| Primary blue (section bg) | `--color-lzqmix0f5v` | `#0174C7` / `rgb(1,116,199)` |
| Hero row sky blue | `--color-g8etycb6px` | `#53B9EF` / `rgb(83,185,239)` |
| Pre-close CTA row powder blue | `--color-oz9yyfwbbo` | `#CCdFF7` / `rgb(204,223,247)` |
| CTA button orange (primary action) | `--brandboards-button_orange` | `#F16314` / `rgb(241,99,20)` |
| Submit button gradient | — | `#fb923c → #f97316` |
| Section red subheadings | `--color-6r3d305wlf` | `#E43B2C` / `rgb(228,59,44)` |
| Dark body/heading text | `--color-j0pubb9p92` | `#2D2D2D` / `rgb(45,45,45)` |
| Charcoal / mid-gray | `--color-qt7t3cq5cd` | `#474747` / `rgb(71,71,71)` |
| Webinar date text | — | `#003E52` |
| Links / bullet icons | `--secondary` | `#188BF6` |
| White | — | `#FFFFFF` |
| Testimonial card border | — | `rgba(0,0,0,0.14)` |
| Testimonial card bg tint | — | `rgba(0,0,0,0.06)` |
| Modal border | `--color-lustcscoaf` | `#080808` / `rgb(8,8,8)` |
| Form input focus | — | `#2563EB` |

**Dominant visual impression:** Cool-blue authority + hot-orange urgency.

---

## 3. TYPOGRAPHY

### Google Fonts Loaded
Poppins, Montserrat, Lato, Roboto, Open Sans, Fjalla One (all weights 100–900)

- `--headlinefont` = **Poppins** — all section headlines, CTA buttons, webinar date
- `--contentfont` = **Montserrat** — body copy, subheads, footer
- Form inputs use system-ui stack (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Inter`)

### Size Hierarchy

| Element | Font | Size | Weight |
|---|---|---|---|
| Hero H1 "MAXIMIZE YOUR INVESTMENTS…" | Poppins | 60px | 600 |
| Modal H1 "Register Your Spot Now!" | Poppins | 48px desktop / 35px mobile | 900 |
| Section H1 (dark, bio) | Poppins | 36px | 400 |
| Red benefit subheadings | Poppins | 29px → 20px | 400 |
| Hero CTA button label | Montserrat | 27px | 700 |
| Section CTA button label | Poppins | 20px | 600–700 |
| Button sub-text (scarcity line) | system/Montserrat | 15–18px | 400 |
| Body copy / testimonials | Montserrat | 18px | 400 |
| Hero subheadline | Poppins | 18px | 400 |
| Webinar date | Poppins | `clamp(22px, 5.5vw, 30px)` | 700 |
| Webinar time | system-ui | `clamp(14px, 3.8vw, 18px)` | 500 |
| Legal disclaimer | Montserrat | 9px | 400 |
| Footer links | Montserrat | 13px | 400 |

---

## 4. COPY PATTERNS

### Page Title
`MAXIMIZE YOUR INCOME WITH INCOME STACKING`

### Meta Description
> "Discover how to invest your money in the Stock Market wisely, without huge risks of losing your money, gain confidence in your own knowledge and abilities, all while building up your Cash Flow so you can get out of the Rat Race."

### Hero H1 (60px white Poppins)
`MAXIMIZE YOUR INVESTMENTS WITH INCOME STACKING`

### Hero Subheadline (18px, italic emphasis)
`Unlock the power of Cash Flow Stocks and discover how to generate multiple income streams from a single stock.`

### Dynamic Webinar Date/Time Block
JavaScript renders the next upcoming session in local display:
```
[Weekday], [Month] [Ordinal Day]
8:00 PM ET | 7:00 PM CT | 6:00 PM MT | 5:00 PM PT
```
Sun/Sat = 2:00 PM ET; Mon–Fri = 8:00 PM ET

### CTA Button Copy (4 buttons, identical)
- **Hero:** `CLICK HERE TO REGISTER NOW` / subtext: `Spots are Limited. Don't Miss Out`
- **3 section buttons:** `CLICK HERE TO REGISTER NOW!` / subtext: `Spots are limited. Don't miss out!`

### Red Benefit Subheadings
```
WHY INCOME STACKING IS SUPERIOR
ELIMINATE YOUR INVESTING FEARS WITH INCOME STACKING
ACCELERATE YOUR INCOME AND CATCH UP FASTER
```

### Objection Handlers
- Complexity: *"Makes investing simpler and more accessible for everyone"*
- Fear of loss: *"focusing on generating income rather than gambling on market swings"*
- Late start: ***"GOOD NEWS: It's never too late to start."***
- Beginner: *"even if you feel behind and need to catch up"*

### Bullet List Under Andy Headshot
```
• Step-by-Step Investing Blueprint — Access the proven methods Andy has shared with thousands of investors worldwide.
• Time-Tested Strategies — Perfect for anyone looking to build wealth—even if you feel behind and need to catch up.
• Boost Your Confidence — Learn how to take control of your financial future with clear, actionable steps.
• And So Much More!
```

### Pre-Close CTA Copy
```
DON'T MISS THIS FREE TRAINING
Claim your spot now and discover how Income Stacking can transform your financial future:
BUILD RETIREMENT SAVINGS – CREATE NEW INCOME STREAMS – UPGRADE YOUR LIFESTYLE – AND MORE!
```

### Modal Copy
- H1: `Register Your Spot Now!`
- H2: `Just enter your name & email to secure your spot on this webclass...`
- Submit: `Save My Seat`

### Naming Conventions
The event is **never** called a "webinar" in CTAs. Always: **"masterclass"**, **"free training"**, or **"webclass"**.

---

## 5. CONVERSION ELEMENTS

### Trust Stack
| Signal | Where |
|---|---|
| "Rich Dad Expert" badge | Hero (above the fold, repeated 3×) |
| Andy's Rich Dad Company affiliation | Meta author tag, bio copy |
| "shared with thousands of investors worldwide" | Bullet list |
| Real LLC name in legal: "Tanner Training LLC" | Footer disclaimer |
| 6 named + photographed testimonials | Rows 3b / 3c |

### Social Proof — 6 Testimonials
| Person | Theme |
|---|---|
| Justin OKeefe | Teacher quality, systematic learning |
| David Corley | "Get out of the rat race" transformation |
| Guy Pierce | Speed: "placing trades and getting cash flow immediately… in just 30 days!" |
| Michael Tollen | Confidence + capital efficiency |
| Carlos Azuero | Control + cash flow mindset |
| Fortuna Gyeltsen | Peace of mind: "I can sleep better at night" |

All cards: real first/last name, real photo (fixed 240px height), `rgba(0,0,0,0.06)` tinted bg, `rgba(0,0,0,0.14)` border.

### Urgency Triggers
| Trigger | Type |
|---|---|
| Dynamic date/time ("Tonight, Monday [date] at 8:00 PM ET") | Genuine time pressure |
| "Spots are Limited. Don't Miss Out" × 4 | Scarcity (every CTA) |
| "DON'T MISS THIS FREE TRAINING" | FOMO |
| "FREE" used 5× across copy | Loss aversion |

### Conversion Scroll Journey
```
[Logo/Brand] → [Hero + first CTA] → [Value arguments + 2nd CTA] → [6 Testimonials]
→ [Pre-close CTA] → [Bio/authority] → [Footer/compliance]
```

---

## 6. FORM

**Platform:** Infusionsoft / Keap
**Action:** `POST https://yv932.infusionsoft.com/app/form/process/8f04d117543e2ecf27d40a3338f87e9d`
**Form Name:** `Daily Income Stacking Webinar Registration`
**Trigger:** Modal popup — fired by all 4 CTA buttons. Never inline on page.
**Max-width:** 420px centered

### Visible Fields
| Field | Input Type | Required |
|---|---|---|
| First Name (`inf_field_FirstName`) | text | ✅ |
| Last Name (`inf_field_LastName`) | text | ❌ |
| Email (`inf_field_Email`) | email | ✅ |
| Mobile Phone (`inf_field_Phone1`) | tel | ❌ |
| SMS Consent | checkbox | ❌ |

**SMS Label:**
> "By checking this box, I agree to receive text messages (such as reminders, updates and promotional offers) from The Cash Flow Academy at the mobile number provided. Message and data rates may apply. Message frequency varies. Consent is not a condition of purchase. Reply STOP to unsubscribe."

### Hidden Fields (JS-populated)
```
inf_custom_GaSource/Medium/Campaign/Term/Content  ← UTM params from URL
inf_custom_fbclid                                 ← Facebook click ID
inf_custom_WebinarFuelWebinarID = 18569           ← fixed
inf_custom_WebinarFuelSessionId                   ← dynamic by day (70644–70650)
inf_custom_TimeZone                               ← Intl.DateTimeFormat().resolvedOptions().timeZone
inf_custom_GaReferurl                             ← document.referrer
inf-sbt                                           ← honeypot (display:none)
```

### Form Visual Styles
```css
/* Inputs */
border: 1px solid #d1d5db;
border-radius: 8px;
padding: 14px 12px;
font-size: 16px;
color: #111827;

/* Focus */
border-color: #2563eb;
box-shadow: 0 0 0 3px rgba(37,99,235,0.15);

/* Submit button */
background: linear-gradient(180deg, #fb923c, #f97316);
border-radius: 10px;
font-size: 18px;
font-weight: 700;
color: white;
box-shadow: 0 6px 18px rgba(249,115,22,0.35);
/* Hover: translateY(-1px), gradient darkens */
```

---

## 7. MOBILE BEHAVIOR

**GHL breakpoints:** mobile ≤480px, tablet 481–767px, desktop ≥768px
**Column rule:** All multi-column layouts use `flex-direction: row` only at `min-width: 768px`. Below that = single column stack.

| Element | Desktop | Mobile (≤480px) |
|---|---|---|
| Modal width | 720px | 380px |
| Hero section top padding | 20px | 0px |
| Hero layout | 2 columns (58% / 42%) | Vertical stack |
| Andy photo (hero) | Right column | Stacks below copy, `margin-top: 40px` |
| Hero H1 | 60px | 60px (same) |
| Modal H1 | 48px | 35px |
| Testimonial padding | 25px all | 10px L/R, 20px T/B |
| Testimonial rows | 3 cards per row | 1 card per row, `margin-top: 20px` each |
| Bio section | 2 columns (33%/66%) | Vertical stack |
| Webinar date | `clamp(22px–30px)` | Fluid (same clamp) |
| Webinar time | `clamp(14px–18px)` | `word-break: keep-all` to prevent tz label breaks |
| Background rule | `.bg-fixed` = position:fixed | Same — blue outer "floor" shows through section gaps |

---

## 8. GTM EVENTS

**Container:** `GTM-NFS9XPJ`
**Also present:** VWO A/B Testing (account `1174441`), Infusionsoft web tracking, Cloudflare Web Analytics beacon

### Event Plan

| User Action | Event Name | Key Parameters |
|---|---|---|
| Page loads | `page_view` | `page_name: "income_stacking_reg"`, `funnel_step: "optin"` |
| Any CTA click | `cta_click` | `cta_location: "hero" / "benefit_1" / "benefit_2" / "pre_close"` |
| Modal opens | `modal_open` | `modal_name: "registration_form"` |
| First form field focused | `form_start` | `form_name: "webinar_registration"` |
| Field filled | `form_field_complete` | `field: "first_name" / "email" / "phone"` |
| SMS consent checked | `sms_consent_check` | `consent: true` |
| Form submitted | `form_submit` | `form_name`, `webinar_session_id: "[dynamic]"` |
| Confirmed page loaded | `lead` | `conversion_type: "webinar_registration"` |
| Modal closed | `modal_close` | `modal_name: "registration_form"` |
| Scroll 25/50/75/100% | `scroll_depth` | `depth: 25 / 50 / 75 / 100` |
| Testimonials row in view | `section_view` | `section: "testimonials"` |
| Bio section in view | `section_view` | `section: "instructor_bio"` |
| Footer link click | `footer_link_click` | `link_text: "Contact Us" / "Terms" / "Privacy Policy"` |

---

## 9. WHAT MAKES IT CONVERT

### #1 — Modal-Only Form: Commitment Before the Ask
All four CTA buttons trigger a modal; the registration form never appears inline on the page. The visitor must actively click "CLICK HERE TO REGISTER NOW" before seeing a single form field. By the time the modal opens, they've micro-committed once. The modal headline "Register Your Spot Now!" confirms their action, and the sub-copy tells them it's "just your name & email" — minimizing perceived effort. Two-step opt-in measurably outperforms below-the-fold forms.

### #2 — Dynamic Date/Time Injection: Real Urgency, Not a Fake Countdown
JavaScript calculates and displays the *next actual session* based on the visitor's current clock (converted to ET). Runs 7 days/week. At 7:45 PM ET on a Monday, the page shows "Tonight, Monday [date] at 8:00 PM ET." This makes an evergreen recording feel like a live, time-pressured event without deploying an easily-mistrusted countdown timer.

### #3 — "Rich Dad Expert" Authority Halo
Robert Kiyosaki's Rich Dad franchise is globally known. "Rich Dad Expert Andy Tanner" appears in the hero, in copy, and in the presenter credential line. The brand equity transfers immediately. No explanation needed. Combined with the circle-cropped headshot with `shadow20` and dark border, it creates a trust signal above the primary CTA before any scrolling occurs.

### #4 — Six-Testimonial Proof Wall Before the Final CTA
Two full rows of 3 testimonials each, all with real names and real photos, placed between the benefit copy and the pre-close CTA. They aren't scattered — they're massed into a single "wall of proof." Testimonial themes directly address the two dominant objections of a 45–65 investor audience: fear of market loss (*"I can sleep better at night"*) and feeling behind (*"placing trades and getting cash flow immediately… in just 30 days"*).

### #5 — Scarcity On Every CTA, Every Scroll Position
Every CTA button has two lines: the action and the scarcity. "Spots are Limited. Don't Miss Out" appears 4 times over the scroll journey — integrated into the button itself, not as a separate element. At 4× repetition, it becomes a default expectation. Combined with the dynamic date/time and the word "FREE" appearing 5 times, the page sustains low-grade urgency continuously without ever using an aggressive countdown overlay that triggers banner blindness.

---

## Technical Reference

### Webinar Schedule (WebinarFuel ID: 18569)

| Day | Time (ET) | Session ID |
|---|---|---|
| Sunday | 2:00 PM | 70650 |
| Monday | 8:00 PM | 70644 |
| Tuesday | 8:00 PM | 70645 |
| Wednesday | 8:00 PM | 70646 |
| Thursday | 8:00 PM | 70647 |
| Friday | 8:00 PM | 70648 |
| Saturday | 2:00 PM | 70649 |

### Key CDN Assets
All assets at base path: `https://assets.cdn.filesafe.space/AlaOChaaJskjBj6JtxyE/media/`
Served via: `images.leadconnectorhq.com` (WebP, srcsets at 320/480/640/768/900/1200px)

| Asset | File |
|---|---|
| Logo/hero banner | `18bdcfd5-760a-411a-9268-a233b11c88ca.png` |
| Andy presenter photo (hero) | `1ebd6e1a-3a7a-449e-b860-94dd348ac98b.png` |
| Andy circle headshot (content) | `0fca577b-aeb4-4205-8b3a-1bbecb7c6265.png` (300×300) |
| Andy speaking photo (bio) | `9e49c39d-2d70-4647-81dd-04fc7537eb6e.jpg` |
| Footer logo | `a6e882d3-a630-468d-8f12-ceda87b9a52d.png` |
| OG / social share image | `https://cf.thecashflowacademy.com/hosted/images/05/29d18dad56493c831b9428d165d1f9/Cash-Flow-Stocks-Mobile-Banner-LIVE.jpg` |

### Funnel Steps
| Step | Slug | Name |
|---|---|---|
| 1 | `/income-stacking-webclass` | Income Stacking Reg Page |
| 2 | `/income-stacking-webclass-fb` | Income Stacking Reg Page (FACEBOOK) |
| 3 | `/confirmed-income-stacking` | Registration Confirmation |
| 4 | `/confirmed-is-fb-d` | Registration Confirmation (No WF Widget) |
| 5 | `/confirmed-income-stacking-fb` | Registration Confirmation (FACEBOOK) |
| **6** | **`/income-stacking-reg-wf-ghl-d`** | **THIS PAGE — Daily Version (YouTube)** |
| 7 | `/income-stacking-webclass-af` | Feb 5th 2026 — Set Time for Affiliate |