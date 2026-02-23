// ─────────────────────────────────────────────────────────────────────────────
// /terms — Terms of Service
// Content sourced from thecashflowacademy.com/terms-and-conditions/
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Tanner Training LLC and The Cash Flow Academy.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>← Back to Registration</Link>
        </nav>

        <h1 className={styles.title}>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last updated: January 22, 2021</p>

        <p className={styles.intro}>
          Please read these Terms of Use (&ldquo;Terms,&rdquo; &ldquo;Terms of Use&rdquo;) carefully before
          using the <a href="https://thecashflowacademy.com" target="_blank" rel="noopener noreferrer" className={styles.link}>thecashflowacademy.com</a> website
          (the &ldquo;Service&rdquo;) operated by The Cash Flow Academy (&ldquo;us,&rdquo; &ldquo;we,&rdquo; or &ldquo;our&rdquo;).
        </p>
        <p className={styles.intro}>
          Your access to and use of the Service is conditioned on your acceptance of and compliance
          with these Terms. These Terms apply to all visitors, users, and others who access or use
          the Service.
        </p>
        <p className={styles.intro}>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree
          with any part of the terms, then you may not access the Service.
        </p>

        <h2 className={styles.sectionTitle}>Accounts</h2>
        <p className={styles.body}>
          When you create an account with us, you must provide us with information that is accurate,
          complete, and current at all times. Failure to do so constitutes a breach of the Terms,
          which may result in immediate termination of your account on our Service.
        </p>
        <p className={styles.body}>
          You are responsible for safeguarding the password that you use to access the Service and
          for any activities or actions under your password, whether your password is with our
          Service or a third-party service.
        </p>
        <p className={styles.body}>
          You agree not to disclose your password to any third party. You must notify us immediately
          upon becoming aware of any breach of security or unauthorized use of your account.
        </p>

        <h2 className={styles.sectionTitle}>Intellectual Property</h2>
        <p className={styles.body}>
          The Service and its original content, features, and functionality are and will remain the
          exclusive property of The Cash Flow Academy and its licensors.
        </p>

        <h2 className={styles.sectionTitle}>Links to Other Websites</h2>
        <p className={styles.body}>
          Our Service may contain links to third-party websites or services that are not owned or
          controlled by The Cash Flow Academy.
        </p>
        <p className={styles.body}>
          The Cash Flow Academy has no control over and assumes no responsibility for the content,
          privacy policies, or practices of any third-party websites or services. You further
          acknowledge and agree that The Cash Flow Academy shall not be responsible or liable,
          directly or indirectly, for any damage or loss caused or alleged to be caused by or in
          connection with the use of or reliance on any such content, goods, or services available
          on or through any such websites or services.
        </p>
        <p className={styles.body}>
          We strongly advise you to read the terms and conditions and privacy policies of any
          third-party websites or services that you visit.
        </p>

        <h2 className={styles.sectionTitle}>Termination</h2>
        <p className={styles.body}>
          We may terminate or suspend access to our Service immediately, without prior notice or
          liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <p className={styles.body}>
          We may terminate or suspend your account immediately, without prior notice or liability,
          for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <p className={styles.body}>
          Upon termination, your right to use the Service will immediately cease. If you wish to
          terminate your account, you may simply discontinue using the Service.
        </p>
        <p className={styles.body}>
          All provisions of the Terms which by their nature should survive termination shall survive
          termination, including, without limitation, ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability.
        </p>

        <h2 className={styles.sectionTitle}>Disclaimer</h2>
        <p className={styles.body}>
          Your use of the Service is at your sole risk. The Service is provided on an &ldquo;AS IS&rdquo; and
          &ldquo;AS AVAILABLE&rdquo; basis. The Service is provided without warranties of any kind, whether
          express or implied, including but not limited to implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, or course of performance.
        </p>
        <p className={styles.body}>
          Tanner Training LLC and The Cash Flow Academy are providing all training and educational
          materials for educational purposes only. We are not providing legal, accounting, or
          financial advisory services, and nothing presented constitutes a solicitation or
          recommendation to buy or sell any securities. All investing and trading in the securities
          markets involves risk of loss. Past performance is not a guarantee of future results.
          Individual results will vary.
        </p>

        <h2 className={styles.sectionTitle}>Governing Law</h2>
        <p className={styles.body}>
          These Terms shall be governed and construed in accordance with the laws of the United
          States without regard to its conflict of law provisions.
        </p>
        <p className={styles.body}>
          Our failure to enforce any right or provision of these Terms will not be considered a
          waiver of those rights. If any provision of these Terms is held to be invalid or
          unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          These Terms constitute the entire agreement between us regarding our Service and supersede
          and replace any prior agreements we might have between us regarding the Service.
        </p>

        <h2 className={styles.sectionTitle}>Changes</h2>
        <p className={styles.body}>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any
          time. If a revision is material, we will try to provide at least 30 days&rsquo; notice prior to
          any new terms taking effect. What constitutes a material change will be determined at our
          sole discretion.
        </p>
        <p className={styles.body}>
          By continuing to access or use our Service after those revisions become effective, you
          agree to be bound by the revised terms. If you do not agree to the new terms, please stop
          using the Service.
        </p>

        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.body}>
          If you have any questions about these Terms, please contact us at{' '}
          <a href="mailto:customerservice@thecashflowacademy.com" className={styles.link}>
            customerservice@thecashflowacademy.com
          </a>{' '}
          or call (801) 515-3681.
        </p>

        <nav className={styles.footerLinks} aria-label="Legal pages">
          <Link href="/" className={styles.footerNavLink}>← Back to Registration</Link>
          <span className={styles.sep}>·</span>
          <Link href="/privacy" className={styles.footerNavLink}>Privacy Policy</Link>
        </nav>

      </div>
    </div>
  );
}
