// ─────────────────────────────────────────────────────────────────────────────
// GTM Helper — all conversion events flow through this module.
// Push to window.dataLayer; GTM reads and routes from there.
// ─────────────────────────────────────────────────────────────────────────────

// Extend the global Window interface so TypeScript knows about dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────

/** Strongly-typed list of all custom events this platform fires. */
export type GTMEventName =
  | 'page_view'
  | 'form_view'
  | 'form_start'
  | 'form_submit'
  | 'registration_complete'
  | 'cta_click'
  | 'scroll_to_form'
  | 'scroll_depth'
  | 'countdown_expired'
  | 'video_play'
  | 'video_complete';

export interface GTMBasePayload {
  event: GTMEventName | string;
  funnel_slug: string;
  [key: string]: unknown;
}

// ── Core push ─────────────────────────────────────────────────────────────────

/**
 * Low-level push to GTM dataLayer.
 * Safe to call in any context — silently no-ops on the server.
 */
export function pushToDataLayer(payload: GTMBasePayload): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

// ── Initializer ───────────────────────────────────────────────────────────────

/**
 * Builds the inline GTM script string that must be placed in <head>.
 * Used by the GTMScript server component.
 */
/** Fires when a registrant lands on the confirmation page. */
export function fireRegistrationComplete(funnelSlug: string): void {
  pushToDataLayer({ event: 'registration_complete', funnel_slug: funnelSlug });
}

export function buildGTMHeadScript(containerId: string): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
}

/**
 * Builds the GTM noscript iframe src.
 * Used in the <noscript> fallback placed after the opening <body> tag.
 */
export function buildGTMNoScriptSrc(containerId: string): string {
  return `https://www.googletagmanager.com/ns.html?id=${containerId}`;
}

// ── Named event helpers ───────────────────────────────────────────────────────

/** Fire when the funnel page mounts / becomes visible. */
export function firePageView(funnelSlug: string): void {
  pushToDataLayer({
    event: 'page_view',
    funnel_slug: funnelSlug,
  });
}

/**
 * Fire when a user begins interacting with a registration form field.
 * Fires exactly once per form instance — on the first input/change event.
 * Used to calculate form-start-to-submit conversion rate.
 * Note: only works for script-injected (non-iframe) Infusionsoft embeds.
 * @param formInstance - 'top' (main form) or 'bottom' (repeat form at end of page)
 */
export function fireFormStart(funnelSlug: string, formInstance?: 'top' | 'bottom'): void {
  pushToDataLayer({
    event: 'form_start',
    funnel_slug: funnelSlug,
    ...(formInstance ? { form_instance: formInstance } : {}),
  });
}

/**
 * Fire when a registration form section enters the viewport.
 * @param formInstance - 'top' (main form) or 'bottom' (repeat form at end of page)
 */
export function fireFormView(funnelSlug: string, formInstance?: 'top' | 'bottom'): void {
  pushToDataLayer({
    event: 'form_view',
    funnel_slug: funnelSlug,
    ...(formInstance ? { form_instance: formInstance } : {}),
  });
}

/**
 * Fire when Infusionsoft fires its own submit event.
 * @param formInstance - 'top' (main form) or 'bottom' (repeat form at end of page)
 */
export function fireFormSubmit(funnelSlug: string, formInstance?: 'top' | 'bottom'): void {
  pushToDataLayer({
    event: 'form_submit',
    funnel_slug: funnelSlug,
    ...(formInstance ? { form_instance: formInstance } : {}),
  });
}

/**
 * Fire when a user clicks any CTA button that scrolls to the form.
 * @param ctaLocation - where on the page the button lives: 'hero' | 'urgency_bar' | 'countdown' | 'bottom_form'
 */
export function fireCtaClick(
  funnelSlug: string,
  ctaLabel: string,
  ctaLocation?: string,
): void {
  pushToDataLayer({
    event: 'cta_click',
    funnel_slug: funnelSlug,
    cta_label: ctaLabel,
    ...(ctaLocation ? { cta_location: ctaLocation } : {}),
  });
}

/**
 * Fire when the page is programmatically scrolled to the form section.
 * @param triggerSource - which element initiated the scroll: 'hero_cta' | 'urgency_bar' | 'countdown'
 */
export function fireScrollToForm(funnelSlug: string, triggerSource?: string): void {
  pushToDataLayer({
    event: 'scroll_to_form',
    funnel_slug: funnelSlug,
    ...(triggerSource ? { trigger_source: triggerSource } : {}),
  });
}

/** Fire at scroll depth milestones (25 / 50 / 75 / 100 %). */
export function fireScrollDepth(funnelSlug: string, depthPercent: 25 | 50 | 75 | 100): void {
  pushToDataLayer({
    event: 'scroll_depth',
    funnel_slug: funnelSlug,
    scroll_depth_percent: depthPercent,
  });
}

/** Fire when the countdown timer reaches zero. */
export function fireCountdownExpired(funnelSlug: string, webinarDatetime?: string): void {
  pushToDataLayer({
    event: 'countdown_expired',
    funnel_slug: funnelSlug,
    ...(webinarDatetime ? { webinar_datetime: webinarDatetime } : {}),
  });
}
