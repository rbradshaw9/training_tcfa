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

        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.body}>
          Our website address is:{' '}
          <a href="https://thecashflowacademy.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            https://thecashflowacademy.com
          </a>.
          This training is provided by Tanner Training LLC / The Cash Flow Academy.
        </p>

        <h2 className={styles.sectionTitle}>What Personal Data We Collect and Why</h2>

        <h3 className={styles.subSectionTitle}>Comments</h3>
        <p className={styles.body}>
          When visitors leave comments on the site we collect the data shown in the comments form,
          and also the visitor&rsquo;s IP address and browser user agent string to help spam detection.
          An anonymized string created from your email address (also called a hash) may be provided
          to the Gravatar service to see if you are using it. The Gravatar service privacy policy is
          available at{' '}
          <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            automattic.com/privacy
          </a>.
          After approval of your comment, your profile picture is visible to the public in the
          context of your comment.
        </p>

        <h3 className={styles.subSectionTitle}>Media</h3>
        <p className={styles.body}>
          If you upload images to the website, you should avoid uploading images with embedded
          location data (EXIF GPS) included. Visitors to the website can download and extract any
          location data from images on the website.
        </p>

        <h3 className={styles.subSectionTitle}>Contact Forms</h3>
        <p className={styles.body}>
          Information submitted through contact forms on this site is used solely to respond to your
          inquiry. We do not share this information with third parties except as necessary to fulfill
          your request.
        </p>

        <h2 className={styles.sectionTitle}>Cookies</h2>
        <p className={styles.body}>
          If you leave a comment on our site you may opt in to saving your name, email address, and
          website in cookies. These are for your convenience so that you do not have to fill in your
          details again when you leave another comment. These cookies will last for one year.
        </p>
        <p className={styles.body}>
          If you visit our login page, we will set a temporary cookie to determine if your browser
          accepts cookies. This cookie contains no personal data and is discarded when you close
          your browser.
        </p>
        <p className={styles.body}>
          When you log in, we will also set up several cookies to save your login information and
          your screen display choices. Login cookies last for two days, and screen options cookies
          last for a year. If you select &ldquo;Remember Me&rdquo;, your login will persist for two weeks.
          If you log out of your account, the login cookies will be removed.
        </p>
        <p className={styles.body}>
          If you edit or publish an article, an additional cookie will be saved in your browser.
          This cookie includes no personal data and simply indicates the post ID of the article you
          just edited. It expires after 1 day.
        </p>

        <h2 className={styles.sectionTitle}>Embedded Content from Other Websites</h2>
        <p className={styles.body}>
          Articles on this site may include embedded content (e.g. videos, images, articles, etc.).
          Embedded content from other websites behaves in the exact same way as if the visitor has
          visited the other website.
        </p>
        <p className={styles.body}>
          These websites may collect data about you, use cookies, embed additional third-party
          tracking, and monitor your interaction with that embedded content, including tracking your
          interaction with the embedded content if you have an account and are logged in to that
          website.
        </p>

        <h2 className={styles.sectionTitle}>How Long We Retain Your Data</h2>
        <p className={styles.body}>
          If you leave a comment, the comment and its metadata are retained indefinitely. This is so
          we can recognize and approve any follow-up comments automatically instead of holding them
          in a moderation queue.
        </p>
        <p className={styles.body}>
          For users that register on our website (if any), we also store the personal information
          they provide in their user profile. All users can see, edit, or delete their personal
          information at any time (except they cannot change their username). Website administrators
          can also see and edit that information.
        </p>

        <h2 className={styles.sectionTitle}>What Rights You Have Over Your Data</h2>
        <p className={styles.body}>
          If you have an account on this site, or have left comments, you can request to receive an
          exported file of the personal data we hold about you, including any data you have provided
          to us. You can also request that we erase any personal data we hold about you. This does
          not include any data we are obliged to keep for administrative, legal, or security purposes.
        </p>
        <p className={styles.body}>
          To request deletion of your account information, please contact us at{' '}
          <a href="mailto:customerservice@thecashflowacademy.com" className={styles.link}>
            customerservice@thecashflowacademy.com
          </a>.
          Your request will be fulfilled within 5–7 business days.
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
