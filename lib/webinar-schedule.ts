// ─────────────────────────────────────────────────────────────────────────────
// Webinar Schedule — Dynamic next-session calculator.
//
// Mirrors the client-side date-switching logic from the original GHL funnel.
// Finds the next upcoming Daily Income Stacking Webinar session based on the
// current ET (Eastern Time) date/time.
//
// Schedule (Eastern Time):
//   Sunday    → 2:00 PM ET  (sessionId: 70650)
//   Monday    → 8:00 PM ET  (sessionId: 70644)
//   Tuesday   → 8:00 PM ET  (sessionId: 70645)
//   Wednesday → 8:00 PM ET  (sessionId: 70646)
//   Thursday  → 8:00 PM ET  (sessionId: 70647)
//   Friday    → 8:00 PM ET  (sessionId: 70648)
//   Saturday  → 2:00 PM ET  (sessionId: 70649)
// ─────────────────────────────────────────────────────────────────────────────

export interface WebinarSession {
  /** UTC Date object for the session start time */
  date: Date;
  /** ET hour (24h) for the session */
  hour: number;
  /** ET minute for the session */
  minute: number;
  /** WebinarFuel session ID for this day's session */
  sessionId: string;
  /** Formatted display strings */
  display: {
    /** e.g. "Tuesday, March 19, 2026" */
    date: string;
    /** e.g. "8:00 PM ET | 7:00 PM CT | 6:00 PM MT | 5:00 PM PT" */
    time: string;
  };
}

/** WebinarFuel webinar ID — constant across all sessions */
export const WEBINAR_FUEL_ID = '18569';

/** IANA timezone used for all schedule calculations */
export const WEBINAR_TZ = 'America/New_York';

// Day-of-week schedule (0 = Sunday)
const SCHEDULE: ReadonlyArray<{ hour: number; minute: number; sessionId: string }> = [
  { hour: 14, minute: 0, sessionId: '70650' }, // Sunday
  { hour: 20, minute: 0, sessionId: '70644' }, // Monday
  { hour: 20, minute: 0, sessionId: '70645' }, // Tuesday
  { hour: 20, minute: 0, sessionId: '70646' }, // Wednesday
  { hour: 20, minute: 0, sessionId: '70647' }, // Thursday
  { hour: 20, minute: 0, sessionId: '70648' }, // Friday
  { hour: 14, minute: 0, sessionId: '70649' }, // Saturday
];

/**
 * Formats a multi-timezone time line:
 * "8:00 PM ET | 7:00 PM CT | 6:00 PM MT | 5:00 PM PT"
 */
function formatMultiTZ(date: Date): string {
  const zones = [
    { tz: 'America/New_York', label: 'ET' },
    { tz: 'America/Chicago', label: 'CT' },
    { tz: 'America/Denver', label: 'MT' },
    { tz: 'America/Los_Angeles', label: 'PT' },
  ];
  return zones
    .map(({ tz, label }) => {
      const time = date.toLocaleString('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      return `${time} ${label}`;
    })
    .join(' | ');
}

/**
 * Returns ET date parts for a given UTC Date using Intl.
 */
function getETParts(date: Date): { year: number; month: number; day: number; hour: number; minute: number; weekday: number } {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: WEBINAR_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map(p => [p.type, p.value]));
  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return {
    year: parseInt(parts.year),
    month: parseInt(parts.month),
    day: parseInt(parts.day),
    hour: parseInt(parts.hour === '24' ? '0' : parts.hour),
    minute: parseInt(parts.minute),
    weekday: weekdayMap[parts.weekday] ?? 0,
  };
}

/**
 * Converts ET date parts back to a UTC Date object.
 * Uses the JS trick: construct an ISO string and parse it, then adjust
 * for the actual ET offset at that instant (handles DST).
 */
function etPartsToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Construct a naive ISO string and interpret in ET
  // We use the "en-US" trick: find the UTC time that gives exactly these ET parts
  const guess = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`);
  // guess is interpreted as UTC; we need to shift it by ET offset
  // Get the offset at the guessed UTC time
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: WEBINAR_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  // Iterate once: get the ET wall-clock for our guess and compute the offset
  const guessParts = formatter.formatToParts(guess);
  const guessHour = parseInt(guessParts.find(p => p.type === 'hour')?.value ?? '0');
  const guessMinute = parseInt(guessParts.find(p => p.type === 'minute')?.value ?? '0');
  // The offset in minutes between guessed UTC and actual ET
  let totalGuessMinutes = guessHour * 60 + guessMinute;
  const totalTargetMinutes = hour * 60 + minute;
  let diffMinutes = totalTargetMinutes - totalGuessMinutes;
  // Handle midnight wrap
  if (diffMinutes > 720) diffMinutes -= 1440;
  if (diffMinutes < -720) diffMinutes += 1440;
  return new Date(guess.getTime() - diffMinutes * 60 * 1000);
}

/**
 * Finds the next upcoming Daily Income Stacking Webinar session.
 * Safe to call server-side or client-side.
 *
 * @param now - optional override for "now" (UTC). Defaults to Date.now().
 */
export function getNextSession(now?: Date): WebinarSession {
  const current = now ?? new Date();
  const etNow = getETParts(current);

  // Scan up to 7 days forward to find the next session
  for (let daysAhead = 0; daysAhead < 7; daysAhead++) {
    const checkDate = new Date(current.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    const et = getETParts(checkDate);
    const slot = SCHEDULE[et.weekday];

    // For today: only use the slot if the session hasn't started yet
    if (daysAhead === 0) {
      const currentMinutes = etNow.hour * 60 + etNow.minute;
      const slotMinutes = slot.hour * 60 + slot.minute;
      if (currentMinutes >= slotMinutes) continue; // past — skip to tomorrow
    }

    // Build the UTC Date for this session
    const sessionUTC = etPartsToUTC(et.year, et.month, et.day, slot.hour, slot.minute);

    return {
      date: sessionUTC,
      hour: slot.hour,
      minute: slot.minute,
      sessionId: slot.sessionId,
      display: {
        date: sessionUTC.toLocaleString('en-US', {
          timeZone: WEBINAR_TZ,
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        time: formatMultiTZ(sessionUTC),
      },
    };
  }

  // Fallback: next Sunday 2 PM ET (should never reach here in practice)
  const fallback = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
  const et = getETParts(fallback);
  const sessionUTC = etPartsToUTC(et.year, et.month, et.day, 14, 0);
  return {
    date: sessionUTC,
    hour: 14,
    minute: 0,
    sessionId: '70650',
    display: {
      date: sessionUTC.toLocaleString('en-US', {
        timeZone: WEBINAR_TZ,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: formatMultiTZ(sessionUTC),
    },
  };
}

/**
 * Returns an ISO 8601 datetime string for the next session.
 * Convenience wrapper for use in config.webinar.datetime and CountdownTimer.
 */
export function getNextSessionISO(now?: Date): string {
  return getNextSession(now).date.toISOString();
}
