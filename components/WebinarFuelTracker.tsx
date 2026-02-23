'use client';

// ─────────────────────────────────────────────────────────────────────────────
// WebinarFuelTracker — Client-side form field injector.
//
// Waits for the Infusionsoft form to mount (using MutationObserver for
// pop-up / async safety), then injects:
//
//   • WebinarFuelWebinarID  — constant WEBINAR_FUEL_ID (e.g. "18569")
//   • WebinarFuelSessionId  — per-day session ID from webinar-schedule.ts
//   • TimeZone              — visitor's IANA timezone string
//   • GaSource / GaMedium / GaCampaign / GaTerm / GaContent — from UTM params
//   • GaCampaignID          — utm_id / gclid
//   • GaReferurl            — document.referrer
//   • fbclid                — Facebook click ID if present
//
// Re-injects on form submit so values are always current.
// Renders null — this is a pure side-effect component.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import { getNextSession } from '@/lib/webinar-schedule';

export interface WebinarFuelTrackerProps {
  /** WebinarFuel webinar ID — constant across all sessions */
  webinarFuelId: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUrlParam(name: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(name) ?? '';
}

function setHiddenField(form: HTMLFormElement, name: string, value: string): void {
  const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (input) input.value = value;
}

function injectValues(form: HTMLFormElement, webinarFuelId: string): void {
  const session = getNextSession();

  // ── WebinarFuel ─────────────────────────────────────────────────────────
  setHiddenField(form, 'inf_custom_WebinarFuelWebinarID', webinarFuelId);
  setHiddenField(form, 'inf_custom_WebinarFuelSessionId', session.sessionId);

  // ── Timezone ────────────────────────────────────────────────────────────
  try {
    setHiddenField(
      form,
      'inf_custom_TimeZone',
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  } catch {
    // Non-critical; ignore if Intl is unavailable
  }

  // ── UTM / Attribution ───────────────────────────────────────────────────
  const utm = {
    inf_custom_GaSource:     getUrlParam('utm_source'),
    inf_custom_GaMedium:     getUrlParam('utm_medium'),
    inf_custom_GaCampaign:   getUrlParam('utm_campaign'),
    inf_custom_GaTerm:       getUrlParam('utm_term'),
    inf_custom_GaContent:    getUrlParam('utm_content'),
    inf_custom_GaCampaignID: getUrlParam('utm_id') || getUrlParam('gclid'),
    inf_custom_GaReferurl:   document.referrer,
    inf_custom_fbclid:       getUrlParam('fbclid'),
  };

  for (const [name, value] of Object.entries(utm)) {
    if (value) setHiddenField(form, name, value);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WebinarFuelTracker({ webinarFuelId }: WebinarFuelTrackerProps) {
  useEffect(() => {
    // The IS form may not be in the DOM immediately (dangerouslySetInnerHTML +
    // script re-execution can be async). Use MutationObserver so this works
    // even if the form mounts after the initial render.

    const formSelector = 'form.infusion-form';

    function tryInject(): boolean {
      const forms = document.querySelectorAll<HTMLFormElement>(formSelector);
      if (forms.length === 0) return false;

      forms.forEach((form) => {
        // Inject on load
        injectValues(form, webinarFuelId);

        // Re-inject on every submit so values are guaranteed fresh
        const handleSubmit = () => injectValues(form, webinarFuelId);
        // Guard against double-binding
        if (!(form as HTMLFormElement & { _wfBound?: boolean })._wfBound) {
          form.addEventListener('submit', handleSubmit);
          (form as HTMLFormElement & { _wfBound?: boolean })._wfBound = true;
        }
      });
      return true;
    }

    // Immediate attempt
    if (tryInject()) return;

    // Observe DOM for the form to appear
    const observer = new MutationObserver(() => {
      if (tryInject()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [webinarFuelId]);

  // Renders nothing — side effects only
  return null;
}
