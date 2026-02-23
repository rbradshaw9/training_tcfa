// ─────────────────────────────────────────────────────────────────────────────
// SpeakerBio — Establishes authority and credibility for the presenter.
//
// Renders speaker headshot, name, title, credentials, and bio paragraph.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import type { FunnelSpeaker } from '@/types/funnel';
import styles from './SpeakerBio.module.css';

export interface SpeakerBioProps {
  /** Speaker data object. Source: config.speaker */
  speaker: FunnelSpeaker;
  funnelSlug: string;
}

export default function SpeakerBio({ speaker }: SpeakerBioProps) {
  return (
    <section className={`${styles.section} section`} aria-label="About your trainer">
      <div className={`container ${styles.inner}`}>

        {/* Section label */}
        <p className={styles.eyebrow}>Your Trainer</p>

        <div className={styles.card}>
          {/* Headshot */}
          <div className={styles.headshotCol}>
            <div className={styles.headshotWrapper}>
              <Image
                src={speaker.headshotUrl}
                alt={`Photo of ${speaker.name}`}
                width={320}
                height={320}
                className={styles.headshot}
              />
            </div>

            {speaker.socialProof && (
              <p className={styles.socialProof}>{speaker.socialProof}</p>
            )}

            {speaker.companyLogoUrl && (
              <Image
                src={speaker.companyLogoUrl}
                alt="Company logo"
                width={160}
                height={48}
                className={styles.companyLogo}
              />
            )}
          </div>

          {/* Copy */}
          <div className={styles.copyCol}>
            <h2 className={styles.name}>{speaker.name}</h2>
            <p className={styles.title}>{speaker.title}</p>

            <div className={styles.divider} />

            <p className={styles.bio}>{speaker.bio}</p>

            {speaker.credentials && speaker.credentials.length > 0 && (
              <ul className={styles.credentials}>
                {speaker.credentials.map((cred, i) => (
                  <li key={i} className={styles.credential}>
                    <span className={styles.credIcon} aria-hidden="true">▸</span>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
