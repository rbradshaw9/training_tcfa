// ─────────────────────────────────────────────────────────────────────────────
// /confirmation — Seat Booking Confirmation Page
//
// Shown after successful registration. Embeds the Andy Tanner intro video,
// outlines next steps, and reinforces commitment with social proof.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import Link from 'next/link';
import ConfirmationTracker from '@/components/ConfirmationTracker';
import styles from './confirmation.module.css';

export const metadata: Metadata = {
  title: 'You\'re Registered! — Income Stacking Webinar',
  description: 'Your seat is confirmed. Watch this short video from Andy Tanner and get ready for your training.',
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <div className={styles.page}>      <ConfirmationTracker />
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.badge}>✅ SEAT BOOKING CONFIRMATION</div>
        <h1 className={styles.headline}>
          Great! You Are Now Successfully Registered
        </h1>
        <p className={styles.subheadline}>
          Your spot for the <strong>Income Stacking Live Masterclass</strong> with Andy Tanner is confirmed.
          Check your inbox for your confirmation email — then watch the short video below.
        </p>
      </header>

      {/* ── Vimeo Video ─────────────────────────────────────────────────── */}
      <section className={styles.videoSection} aria-label="Welcome video from Andy Tanner">
        <div className={styles.videoContainer}>
          <iframe
            src="https://player.vimeo.com/video/1109179265?badge=0&autopause=0&player_id=0&app_id=58479"
            title="Welcome message from Andy Tanner — Income Stacking Webinar"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </section>

      {/* ── What to Do Next ──────────────────────────────────────────────── */}
      <section className={styles.steps} aria-label="Next steps">
        <h2 className={styles.stepsTitle}>Here&rsquo;s What to Do Right Now</h2>

        <div className={styles.stepList}>

          {/* Step 1 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Try the Cash Flow Calculator</h3>
              <p className={styles.stepBody}>
                While you wait for the webinar, get a head start by exploring Andy&rsquo;s Cash Flow
                calculator — see how Income Stacking could work with your own numbers.
              </p>
              <a
                href="https://thecashflowacademy.com/resources"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stepCta}
              >
                Open the Calculator →
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Check Your Email &amp; Text</h3>
              <p className={styles.stepBody}>
                Your confirmation and webinar link have been sent to the email address you provided.
                If you opted in to text reminders, you&rsquo;ll also receive an SMS with the link
                before the training starts.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepHeading}>Join on Desktop or iPad</h3>
              <p className={styles.stepBody}>
                For the best experience, join the training on a <strong>laptop, desktop, or iPad</strong>.
                Andy will be sharing his screen with charts and live examples — a larger screen makes
                it much easier to follow along.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <p className={styles.footerDisclaimer}>
          Tanner Training LLC is providing this training for educational purposes only.
          Investing involves risk. Past performance is not indicative of future results.
          Nothing presented constitutes financial, investment, or legal advice.
        </p>
        <nav className={styles.footerLinks} aria-label="Footer links">
          <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
          <span className={styles.footerSep}>·</span>
          <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          <span className={styles.footerSep}>·</span>
          <a
            href="https://thecashflowacademy.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Contact Us
          </a>
        </nav>
        <p className={styles.footerCopyright}>
          © {new Date().getFullYear()} Tanner Training LLC. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}
