// ─────────────────────────────────────────────────────────────────────────────
// /privacy — Privacy Policy
// Content sourced from thecashflowacademy.com/privacy-policy/
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Tanner Training LLC and The Cash Flow Academy.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>← Back to Registration</Link>
        </nav>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: February 24, 2026</p>

        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.body}>
          This registration page is operated by Tanner Training LLC d/b/a The Cash Flow Academy
          (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Our primary website is{' '}
          <a href="https://thecashflowacademy.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            thecashflowacademy.com
          </a>.
        </p>

        <h2 className={styles.sectionTitle}>What Information We Collect</h2>
        <p className={styles.body}>
          When you register for an Income Stacking webinar, we collect the information you submit
          in the registration form: your first name, last name, email address, and optionally your
          mobile phone number. We also automatically collect your IP address, browser type, and
          referring URL for security and analytics purposes.
        </p>
        <p className={styles.body}>
          If you arrive via a tracked link (e.g. from an email, advertisement, or affiliate partner),
          we may collect UTM campaign parameters and click identifiers (such as a Google Click ID or
          Facebook Click ID) to understand how you found us.
        </p>

        <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
        <p className={styles.body}>
          We use the information you provide to:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Confirm your webinar registration and send you the access link.</li>
          <li className={styles.listItem}>Send reminder emails and, if you opted in, SMS reminders before the training.</li>
          <li className={styles.listItem}>Follow up after the training with related educational content, offers, and announcements from The Cash Flow Academy.</li>
          <li className={styles.listItem}>Improve our training programs and marketing based on aggregate analytics.</li>
        </ul>
        <p className={styles.body}>
          We do not sell your personal information to third parties.
        </p>

        <h2 className={styles.sectionTitle}>Third-Party Services</h2>
        <p className={styles.body}>
          We use the following third-party services to deliver and track our webinars:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Keap / Infusionsoft</strong> — stores your registration data and manages email and SMS delivery. Their privacy policy is available at{' '}
            <a href="https://keap.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.link}>keap.com/legal/privacy-policy</a>.
          </li>
          <li className={styles.listItem}><strong>WebinarFuel</strong> — manages webinar session tracking and attendance. Your registration is associated with a session ID used to deliver the training.</li>
          <li className={styles.listItem}><strong>Google Tag Manager / Google Analytics</strong> — collects anonymized page view and interaction data to help us understand how visitors use our site. Google&rsquo;s privacy policy is available at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>policies.google.com/privacy</a>.
          </li>
          <li className={styles.listItem}><strong>Vimeo</strong> — hosts the welcome video on our confirmation page. Vimeo may set cookies and collect data per their privacy policy at{' '}
            <a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>vimeo.com/privacy</a>.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>Cookies</h2>
        <p className={styles.body}>
          This site uses cookies and similar tracking technologies for analytics (Google Analytics)
          and advertising attribution. You can disable cookies in your browser settings, though
          doing so may affect your ability to use certain features of this site.
        </p>

        <h2 className={styles.sectionTitle}>SMS Communications</h2>
        <p className={styles.body}>
          If you checked the opt-in box on the registration form, you consent to receive text
          message reminders from The Cash Flow Academy regarding your webinar. Message and data
          rates may apply. Message frequency varies. Reply STOP at any time to unsubscribe.
        </p>

        <h2 className={styles.sectionTitle}>How Long We Retain Your Data</h2>
        <p className={styles.body}>
          We retain your registration information for as long as you remain an active subscriber
          or customer of The Cash Flow Academy, or as required by law. You may request deletion
          of your data at any time (see Your Rights below).
        </p>

        <h2 className={styles.sectionTitle}>Your Rights</h2>
        <p className={styles.body}>
          You have the right to access, correct, or request deletion of the personal information
          we hold about you. To exercise any of these rights, please contact us at the address
          below. We will respond within 5–7 business days.
        </p>

        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.body}>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:customerservice@thecashflowacademy.com" className={styles.link}>
            customerservice@thecashflowacademy.com
          </a>{' '}
          or call (801) 515-3681.
        </p>

        <nav className={styles.footerLinks} aria-label="Legal pages">
          <Link href="/" className={styles.footerNavLink}>← Back to Registration</Link>
          <span className={styles.sep}>·</span>
          <Link href="/terms" className={styles.footerNavLink}>Terms of Service</Link>
        </nav>

      </div>
    </div>
  );
}
