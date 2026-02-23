'use client';
// ─────────────────────────────────────────────────────────────────────────────
// ConfirmationTracker — fires page_view + registration_complete on mount.
// Render once inside the /confirmation server component.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import { firePageView, fireRegistrationComplete } from '@/lib/gtm';

export default function ConfirmationTracker() {
  useEffect(() => {
    firePageView('income-stacking');
    fireRegistrationComplete('income-stacking');
  }, []);

  return null;
}
