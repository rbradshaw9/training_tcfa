'use client';

// ─────────────────────────────────────────────────────────────────────────────
// GTMTracker — Client Component.
// Runs client-side tracking hooks: pageView on mount, scroll depth milestones,
// and form section viewport detection (form_view event).
//
// Render once inside each funnel page — it renders nothing visible.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import {
  firePageView,
  fireFormView,
  fireScrollDepth,
} from '@/lib/gtm';

interface GTMTrackerProps {
  funnelSlug: string;
}

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

export default function GTMTracker({ funnelSlug }: GTMTrackerProps) {
  const firedMilestones = useRef<Set<number>>(new Set());

  // ── Page view on mount
  useEffect(() => {
    firePageView(funnelSlug);
  }, [funnelSlug]);

  // ── Scroll depth tracking
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          fireScrollDepth(funnelSlug, milestone);
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [funnelSlug]);

  // ── Form view via IntersectionObserver (tracks both form instances)
  useEffect(() => {
    type FormEntry = { id: string; instance: 'top' | 'bottom' };
    const forms: FormEntry[] = [
      { id: 'registration-form',        instance: 'top'    },
      { id: 'registration-form-bottom', instance: 'bottom' },
    ];

    const observers: IntersectionObserver[] = [];
    const fired = new Set<string>();

    forms.forEach(({ id, instance }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !fired.has(id)) {
              fired.add(id);
              fireFormView(funnelSlug, instance);
              observer.disconnect();
            }
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [funnelSlug]);

  return null;
}
