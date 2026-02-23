// ─────────────────────────────────────────────────────────────────────────────
// TestimonialsSection — Social proof grid with student results.
//
// Renders an array of Testimonial objects as styled cards.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import type { Testimonial } from '@/types/funnel';
import styles from './TestimonialsSection.module.css';

export interface TestimonialsSectionProps {
  /** Array of testimonials. Source: config.testimonials */
  testimonials: Testimonial[];
  /** Section headline. Source: config.testimonialsSectionTitle */
  sectionTitle?: string;
  funnelSlug: string;
}

function StarRating({ stars }: { stars: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className={styles.stars} aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < stars ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
  sectionTitle = 'Real Students. Real Results.',
}: TestimonialsSectionProps) {
  return (
    <section className={`${styles.section} section`} aria-label="Student testimonials">
      <div className="container">

        <div className={styles.header}>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <article key={i} className={styles.card}>

              {/* Result callout banner */}
              {t.result && (
                <div className={styles.result} aria-label="Student result">
                  {t.result}
                </div>
              )}

              {/* Star rating */}
              {t.stars && <StarRating stars={t.stars} />}

              {/* Quote */}
              <blockquote className={styles.quote}>
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>

              {/* Attribution */}
              <footer className={styles.attribution}>
                {t.imageUrl && (
                  <Image
                    src={t.imageUrl}
                    alt={`Photo of ${t.name}`}
                    width={88}
                    height={88}
                    className={styles.avatar}
                  />
                )}
                <div className={styles.attributionText}>
                  <strong className={styles.authorName}>{t.name}</strong>
                  {t.title && <span className={styles.authorTitle}>{t.title}</span>}
                </div>
              </footer>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
