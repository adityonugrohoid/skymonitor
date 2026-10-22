// status.json: one entry per feed with the newest upstream time and whether
// it is older than the feed's threshold. The site computes the age again on
// the client from generated_at, so a stopped pipeline cannot leave a fresh
// flag behind.

export interface FeedStatus {
  stale: boolean;
  upstream_time: string | null;
  threshold_hours: number;
}

export interface Status {
  generated_at: string;
  feeds: Record<string, FeedStatus>;
}

export function buildStatus(
  now: Date,
  staleHours: Record<string, number>,
  upstreamTimes: Record<string, Date | null>,
): Status {
  const feeds: Record<string, FeedStatus> = {};
  for (const [feed, hours] of Object.entries(staleHours)) {
    if (!(feed in upstreamTimes)) {
      throw new Error(`no upstream time given for feed "${feed}"`);
    }
    const t = upstreamTimes[feed];
    const ageHours = t === null ? Infinity : (now.getTime() - t.getTime()) / 3_600_000;
    feeds[feed] = {
      stale: ageHours > hours,
      upstream_time: t === null ? null : t.toISOString(),
      threshold_hours: hours,
    };
  }
  return { generated_at: now.toISOString(), feeds };
}
