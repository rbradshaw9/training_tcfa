'use client';

// ─────────────────────────────────────────────────────────────────────────────
// RegistrationForm — The primary conversion unit on the page.
//
// Renders the Infusionsoft embed code (dangerouslySetInnerHTML),
// wrapped in our styled container. Also renders the "What You'll Learn"
// section alongside the form on desktop.
//
// Submission detection strategy (fires GTM form_submit exactly once):
//   1. MutationObserver  — watches the embed DOM for IS "thank you" state
//   2. postMessage       — catches iframe-based IS embed submit events
//   3. Script execution  — re-runs <script> tags injected via innerHTML
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { fireFormSubmit, fireFormStart } from '@/lib/gtm';
import styles from './RegistrationForm.module.css';

export interface RegistrationFormProps {
  /** Raw Infusionsoft embed HTML. Source: config.formEmbedCode */
  formEmbedCode: string;
  /** Headline above the form box. Source: config.formTitle */
  formTitle?: string;
  /** Paragraph below the form headline. Source: config.formSubtext */
  formSubtext?: string;
  /** Small privacy/disclaimer note below the submit. Source: config.formPrivacyNote */
  formPrivacyNote?: string;
  /** Learning points shown to the left of the form on desktop. Source: config.learningPoints */
  learningPoints?: string[];
  /** Section headline for learning points. Source: config.learnSectionTitle */
  learnSectionTitle?: string;
  /** CTA button label — currently unused in layout, kept for future use */
  ctaText?: string;
  funnelSlug: string;
  /** When true, renders a compact centered version without the learning points column */
  isBottomForm?: boolean;
  /**
   * The HTML id placed on the outermost <section>.
   * Top form: 'registration-form' (default)
   * Bottom form: 'registration-form-bottom'
   * Must be unique — GTMTracker uses this to fire separate form_view events.
   */
  formId?: string;
  /** Which instance this is — passed to GTM form_submit / form_view events. */
  formInstance?: 'top' | 'bottom';
}

export default function RegistrationForm({
  formEmbedCode,
  formTitle = 'Reserve Your Free Seat Now',
  formSubtext,
  formPrivacyNote = '🔒 Your information is 100% secure and will never be shared.',
  learningPoints,
  learnSectionTitle = "Here's What You'll Discover:",
  funnelSlug,
  isBottomForm = false,
  formId = 'registration-form',
  formInstance = 'top',
}: RegistrationFormProps) {
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const submitFiredRef  = useRef(false);
  const formStartFiredRef = useRef(false);

  // ── Re-execute <script> tags that browsers skip when set via innerHTML ────
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    container.querySelectorAll<HTMLScriptElement>('script').forEach((original) => {
      const clone = document.createElement('script');
      Array.from(original.attributes).forEach((attr) =>
        clone.setAttribute(attr.name, attr.value)
      );
      clone.textContent = original.textContent;
      original.parentNode?.replaceChild(clone, original);
    });
  }, [formEmbedCode]);

  // ── Form start detection ──────────────────────────────────────
  // Fires form_start exactly once on the first input/change event inside
  // the embed wrapper. Works for script-injected IS embeds. Iframe embeds
  // are sandboxed — postMessage-based submission detection covers those.
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    function handleFormStart() {
      if (formStartFiredRef.current) return;
      formStartFiredRef.current = true;
      fireFormStart(funnelSlug, formInstance);
    }

    // Capture phase catches events from all descendant inputs, selects, etc.
    container.addEventListener('input',  handleFormStart, { capture: true, once: true });
    container.addEventListener('change', handleFormStart, { capture: true, once: true });

    return () => {
      container.removeEventListener('input',  handleFormStart, { capture: true });
      container.removeEventListener('change', handleFormStart, { capture: true });
    };
  }, [funnelSlug, formInstance]);

  // ── Submission detection ─────────────────────────────────────────────────
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    function maybeFireSubmit() {
      if (submitFiredRef.current) return;

      const text = container!.textContent?.toLowerCase() ?? '';

      // 1. Explicit IS / Keap success elements
      const hasSuccessEl =
        !!container!.querySelector('.infusion-success') ||
        !!container!.querySelector('[class*="success"]') ||
        !!container!.querySelector('[class*="thank"]') ||
        !!container!.querySelector('[class*="confirmation"]');

      // 2. Thank-you language in DOM AND form inputs are gone
      const hasThankYouText =
        text.includes('thank you') ||
        text.includes("you're registered") ||
        text.includes('you are registered') ||
        text.includes('registration confirmed') ||
        text.includes('check your email');

      const formInputsGone =
        !container!.querySelector('input[type="email"]') &&
        !container!.querySelector('input[type="text"]');

      if (hasSuccessEl || (hasThankYouText && formInputsGone)) {
        submitFiredRef.current = true;
        fireFormSubmit(funnelSlug, formInstance);
      }
    }

    // MutationObserver watches full subtree for any DOM change
    const observer = new MutationObserver(maybeFireSubmit);
    observer.observe(container, {
      childList:     true,
      subtree:       true,
      attributes:    true,
      characterData: true,
    });

    // postMessage for iframe-based embeds
    function handleMessage(e: MessageEvent) {
      if (submitFiredRef.current) return;
      try {
        let data = e.data;
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch { /* not JSON — keep as string */ }
        }
        if (typeof data === 'string') {
          if (data.includes('formSubmit') || data.includes('form_submitted') || data.includes('success')) {
            submitFiredRef.current = true;
            fireFormSubmit(funnelSlug, formInstance);
          }
        } else if (data && typeof data === 'object') {
          const d = data as Record<string, unknown>;
          if (
            d.event === 'form_submit'            ||
            d.event === 'InfusionsoftFormSubmit' ||
            d.type  === 'success'                ||
            d.type  === 'complete'
          ) {
            submitFiredRef.current = true;
            fireFormSubmit(funnelSlug, formInstance);
          }
        }
      } catch { /* ignore malformed messages */ }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener('message', handleMessage);
    };
  }, [funnelSlug]);

  const showLearningPoints = !isBottomForm && learningPoints && learningPoints.length > 0;

  return (
    <section
      id={formId}
      className={`${styles.section} section`}
      aria-label="Register for free training"
    >
      <div className={`container ${styles.inner} ${showLearningPoints ? styles.withLearn : styles.centered}`}>

        {/* ── Learning Points column (desktop left, mobile stacks below) ── */}
        {showLearningPoints && (
          <div className={styles.learnCol}>
            <h2 className={styles.learnTitle}>{learnSectionTitle}</h2>
            <ul className={styles.learnList}>
              {learningPoints!.map((point, i) => (
                <li key={i} className={styles.learnItem}>
                  <span className={styles.learnCheck} aria-hidden="true">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Form column ───────────────────────────────────────────────── */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>{formTitle}</h2>
            {formSubtext && <p className={styles.formSubtext}>{formSubtext}</p>}

            {/* Infusionsoft embed — rendered as raw HTML */}
            <div
              ref={wrapperRef}
              className={`infusionsoft-form-wrapper ${styles.embedWrapper}`}
              dangerouslySetInnerHTML={{ __html: formEmbedCode }}
            />

            <p className={styles.privacy}>{formPrivacyNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
