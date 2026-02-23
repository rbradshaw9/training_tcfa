// ─────────────────────────────────────────────────────────────────────────────
// Webinar Schedule — Dynamic next-session calculator.
//
// Faithful TypeScript port of the original GHL funnel JavaScript.
// The rollover logic, time-zone offsets, and date computation are
// intentionally identical to the source so results match exactly.
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
  /** UTC Date object for the session start time (for countdown target) */
  date: Date;
  /** ET hour (24h) for the session */
  hour: number;
  /** ET minute for the session */
  minute: number;
  /** WebinarFuel session ID for this day's session */
  sessionId: string;
  /** Pre-formatted display strings, ready to render */
  display: {
    /** e.g. "Monday, February 23rd" */
    date: string;
    /** e.g. "8:00 PM ET | 7:00 PM CT | 6:00 PM MT | 5:00 PM PT" */
    time: string;
  };
}

/** WebinarFuel webinar ID — constant across all sessions */
export const WEBINAR_FUEL_ID = '18569';

/** IANA timezone used for all schedule calculations */
export const WEBINAR_TZ = 'America/New_York';

// ── Schedule data ─────────────────────────────────────────────────────────────

const DAY_ORDER = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
] as const;

type DayName = typeof DAY_ORDER[number];

interface DaySlot {
  hour: number;
  minute: number;
  sessionId: string;
}

const SCHEDULE: Record<DayName, DaySlot> = {
  sunday:    { hour: 14, minute: 0, sessionId: '70650' },
  monday:    { hour: 20, minute: 0, sessionId: '70644' },
  tuesday:   { hour: 20, minute: 0, sessionId: '70645' },
  wednesday: { hour: 20, minute: 0, sessionId: '70646' },
  thursday:  { hour: 20, minute: 0, sessionId: '70647' },
  friday:    { hour: 20, minute: 0, sessionId: '70648' },
  saturday:  { hour: 14, minute: 0, sessionId: '70649' },
};

// ── Helpers (mirrors original JS exactly) ────────────────────────────────────

/**
 * Returns current ET weekday (lowercase), hour (24h), and minute.
 * Same approach as the original: parse Intl formatToParts.
 */
function getNowET(now: Date): { weekday: DayName; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: WEBINAR_TZ,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const obj: Record<string, string> = {};
  parts.forEach((p) => { obj[p.type] = p.value; });

  return {
    weekday: obj.weekday.toLowerCase() as DayName,
    hour: parseInt(obj.hour === '24' ? '0' : obj.hour, 10),
    minute: parseInt(obj.minute, 10),
  };
}

/**
 * Returns true if current ET time is at or past the slot time.
 * Mirrors: h > ch || (h === ch && m >= cm)
 */
function isPast(currentH: number, currentM: number, slotH: number, slotM: number): boolean {
  return currentH > slotH || (currentH === slotH && currentM >= slotM);
}

/**
 * Ordinal suffix: 23 → "23rd", 1 → "1st", etc.
 * Mirrors the original ordinal() function exactly.
 */
function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
  return `${n}${suffixes[n % 10] ?? 'th'}`;
}

/**
 * Formats multi-timezone time line using fixed offsets from ET.
 * CT is always ET−1h, MT is ET−2h, PT is ET−3h.
 * Mirrors the original formatTimes() function exactly.
 */
function formatTimes(hourET: number, minute: number): string {
  const zones = [
    { label: 'ET', offset: 0 },
    { label: 'CT', offset: -1 },
    { label: 'MT', offset: -2 },
    { label: 'PT', offset: -3 },
  ];

  return zones
    .map(({ label, offset }) => {
      let h = hourET + offset;
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = ((h + 24) % 24) % 12 || 12;
      return `${h}:${String(minute).padStart(2, '0')} ${ampm} ${label}`;
    })
    .join(' | ');
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Finds the next upcoming webinar session.
 *
 * Algorithm is identical to the original GHL funnel JS:
 * 1. Get current ET weekday/hour/minute via Intl.DateTimeFormat
 * 2. Look up today's slot; if at or past start time, roll to tomorrow
 * 3. Compute the ET calendar date via the toLocaleString trick (DST-safe)
 * 4. Set session hour/minute on that date for the countdown UTC target
 *
 * @param now - optional Date override (defaults to new Date())
 */
export function getNextSession(now?: Date): WebinarSession {
  const current = now ?? new Date();
  const etNow = getNowET(current);

  // ── Step 1: determine which day to show ──────────────────────────────────
  let targetDay: DayName = etNow.weekday;
  let slot = SCHEDULE[targetDay];

  // If today's session is at or past its start time, roll to tomorrow
  if (isPast(etNow.hour, etNow.minute, slot.hour, slot.minute)) {
    const nextIndex = (DAY_ORDER.indexOf(targetDay) + 1) % 7;
    targetDay = DAY_ORDER[nextIndex];
    slot = SCHEDULE[targetDay];
  }

  // ── Step 2: compute target ET calendar date ───────────────────────────────
  // toLocaleString with a timezone returns a string representing that
  // timezone's wall clock. Passing it to `new Date()` without a timezone
  // makes JS parse it as local time — giving us a Date whose numeric fields
  // (getDate, getMonth, getFullYear, etc.) ARE the ET calendar values.
  // We then offset by the day difference from today to the target day.
  // This is the same technique used in the original JS.
  const etLocalDate = new Date(
    current.toLocaleString('en-US', { timeZone: WEBINAR_TZ })
  );
  const dayOffset =
    (DAY_ORDER.indexOf(targetDay) - DAY_ORDER.indexOf(etNow.weekday) + 7) % 7;
  etLocalDate.setDate(etLocalDate.getDate() + dayOffset);

  // ── Step 3: build display strings ─────────────────────────────────────────
  const weekdayDisplay = etLocalDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDisplay   = etLocalDate.toLocaleDateString('en-US', { month: 'long' });
  const dayOrdinal     = ordinal(etLocalDate.getDate());
  const dateString     = `${weekdayDisplay}, ${monthDisplay} ${dayOrdinal}`;
  const timeString     = formatTimes(slot.hour, slot.minute);

  // ── Step 4: set session time and use as UTC countdown target ──────────────
  // Setting hours/minutes on the etLocalDate (which lives in local-=ET space)
  // gives us the epoch ms for the exact session moment. Works correctly
  // in the browser where this code runs.
  etLocalDate.setHours(slot.hour, slot.minute, 0, 0);

  return {
    date: etLocalDate,
    hour: slot.hour,
    minute: slot.minute,
    sessionId: slot.sessionId,
    display: { date: dateString, time: timeString },
  };
}

/**
 * Returns an ISO 8601 string for the next session's start time.
 * Convenience wrapper for components that take a datetime string.
 */
export function getNextSessionISO(now?: Date): string {
  return getNextSession(now).date.toISOString();
}
