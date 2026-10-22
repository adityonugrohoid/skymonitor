// Scheduled Worker: fetch every upstream, process, render, write static
// files to R2. The browser reads only what this Worker writes.
//
// Today this writes status.json with every feed marked stale, which is the
// truthful state until the pipeline exists. The site reads status.json
// first and hides every number while any feed is stale.

import thresholds from "./config/thresholds.json";

export interface Env {
  DATA: R2Bucket;
  FIRMS_MAP_KEY: string;
}

export interface FeedStatus {
  stale: boolean;
  upstream_time: string | null;
  threshold_hours: number;
}

export interface Status {
  generated_at: string;
  feeds: Record<string, FeedStatus>;
}

export function buildStatus(now: Date, upstreamTimes: Record<string, Date | null>): Status {
  const feeds: Record<string, FeedStatus> = {};
  for (const [feed, hours] of Object.entries(thresholds.stale_hours)) {
    const t = upstreamTimes[feed] ?? null;
    const ageHours = t === null ? Infinity : (now.getTime() - t.getTime()) / 3_600_000;
    feeds[feed] = {
      stale: ageHours > hours,
      upstream_time: t === null ? null : t.toISOString(),
      threshold_hours: hours,
    };
  }
  return { generated_at: now.toISOString(), feeds };
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
    if (!env.FIRMS_MAP_KEY) {
      throw new Error("FIRMS_MAP_KEY secret is not set");
    }
    const status = buildStatus(new Date(), { fire: null, rain: null, weather: null });
    await env.DATA.put("latest/status.json", JSON.stringify(status), {
      httpMetadata: { contentType: "application/json", cacheControl: "public, max-age=600" },
    });
  },
};
