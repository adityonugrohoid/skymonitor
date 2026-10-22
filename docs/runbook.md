# Runbook

For the maintainer on duty. Everything here can be done by any person with
admin on the GitHub organisation and the Cloudflare account.

## If the cron stops

Symptom: UptimeRobot alerts on `"stale":true`, or the heartbeat monitor
goes quiet, or the site shows the stale notice.

1. Cloudflare dashboard, Workers, `skymonitor-cron`, Logs. Read the last
   error.
2. If an upstream URL changed: fix it in `worker/src/config/`, add the new
   response as a fixture, open a PR.
3. If the Worker itself fails: `cd worker && npm run deploy` from main
   redeploys the last known-good version.
4. Nothing needs to be done for visitors: the site already hides every
   number while any feed is stale.

## If NASA changes a URL or a format

1. Save the new response under `fixtures/<date>/`.
2. Update the parser and its test against that fixture.
3. Update `DATA_SOURCES.md` and the roster if a satellite was added or
   removed.

## If a satellite reaches its end date

Nothing. The roster skips it. Check that the landfill baseline was
recomputed (the status file lists the active roster).

## How to pause the site

Set every feed stale: Cloudflare dashboard, Workers, `skymonitor-cron`,
Triggers, disable the cron. Within the stale threshold the site switches to
the notice and the official-source strip on its own. To take the site down
entirely, disable the `skymonitor-site` Worker.

## How to rotate the FIRMS key

1. Request a new key at https://firms.modaps.eosdis.nasa.gov/api/map_key/
2. `cd worker && wrangler secret put FIRMS_MAP_KEY`
3. Replace the maintainer's local key file.
