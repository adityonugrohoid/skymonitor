// Scheduled pipeline: fetch every upstream, process, render, write static
// files to R2. The browser reads only what this job writes.
//
// Today it writes status.json with every feed marked stale, which is the
// truthful state until the fetch and processing steps exist.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildStatus } from "./status.js";
import { putJson, r2Client, r2ConfigFromEnv } from "./r2.js";

interface Thresholds {
  stale_hours: Record<string, number>;
}

function loadThresholds(): Thresholds {
  const path = fileURLToPath(new URL("./config/thresholds.json", import.meta.url));
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (typeof parsed !== "object" || parsed === null || !("stale_hours" in parsed)) {
    throw new Error(`thresholds.json at ${path} has no stale_hours`);
  }
  return parsed as Thresholds;
}

async function main(): Promise<void> {
  const thresholds = loadThresholds();
  const cfg = r2ConfigFromEnv(process.env);
  const now = new Date();
  const upstreamTimes: Record<string, Date | null> = {};
  for (const feed of Object.keys(thresholds.stale_hours)) {
    upstreamTimes[feed] = null;
  }
  const status = buildStatus(now, thresholds.stale_hours, upstreamTimes);
  const client = r2Client(cfg);
  await putJson(client, cfg.bucket, "latest/status.json", status, "public, max-age=600");
  console.log(`wrote latest/status.json at ${status.generated_at}`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
