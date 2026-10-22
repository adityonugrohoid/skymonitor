# Architecture

## Flow

1. A scheduled GitHub Actions job (`.github/workflows/pipeline.yml`, code in
   `pipeline/`) runs every 15 minutes.
2. It fetches every upstream source in one pass: FIRMS CSVs for each
   satellite in `pipeline/src/config/satellites.json`, Open-Meteo for the
   kecamatan centroids, and BMKG and KLHK once their letters are answered.
3. It processes: deduplicates detections across satellites and passes,
   aggregates into 2 km cells keeping the per-cell maximum fire radiative
   power, joins cells to kecamatan, computes the set of cells within the
   upwind radius, compares the rain models, and renders one card per
   kecamatan as PNG.
4. It writes static files to Cloudflare R2 through the S3 API: per-kecamatan
   JSON, PNG cards, the daily open data files, and `status.json` with a
   stale flag per feed.
5. The site (`site/`, Cloudflare Workers Static Assets on the free plan)
   reads `status.json` first and computes the age again on the client. If
   any feed is stale it shows only the stale notice and the official-source
   strip. Otherwise it shows the card and the text behind it.

The browser never calls an upstream API and never sends anything to the
project. Keys live in GitHub Actions secrets.

## Why GitHub Actions and not a Cloudflare cron Worker

Cost. A public repository gets unlimited Actions minutes; a Cloudflare cron
Worker able to parse a 2 MB CSV needs the Workers Paid plan. The price of
the choice, accepted on 2026-10-23:

- Schedules run at most every 5 minutes and can be delayed by 10 to 30
  minutes at busy hours. A delayed run is not re-run. Every card therefore
  shows the upstream data time, so lateness is visible, never hidden.
- GitHub disables a scheduled workflow after 60 days without a commit to the
  repository. A heartbeat monitor on the job catches that; the runbook says
  how to re-enable it.
- Schedules run only from the default branch.

Moving back to a Cloudflare cron Worker is a scheduler swap: the parse,
aggregate and render code is plain Node and does not change.

## Storage

| Store | Contents | Lifetime |
|---|---|---|
| R2 `latest/` | current per-kecamatan JSON, PNG cards, status.json | overwritten every run, edge cache 10 min |
| R2 `daily/` | the open data files per province and kecamatan | kept forever; the project archive |
| R2 `raw/` | upstream responses as fetched, with their timestamps | 30 days, then deleted by an R2 lifecycle rule |
| repo `fixtures/` | raw responses from the 2026 events | kept forever, used by tests |
| Static Assets | the page, boundaries, the printed ISPU scale | changes only on deploy |

R2 is served on a custom domain with a Cache Rule (JSON is not cached by
default; r2.dev is rate-limited and for development only). The card shows a
7-day trend computed from `daily/`.

The one exception to "static files only" is the Himawari and IMERG tile
loop on the map, which the browser fetches from NASA GIBS directly as an
optional layer. A slow GIBS slows the map, never the card.

## Freshness

Every file carries `generated_at` and `upstream_time`. Every card says
"data pukul HH:MM WIB" from the upstream time, never the render time.
Thresholds in `pipeline/src/config/thresholds.json`: fire 6 h, rain 12 h,
weather 24 h. Expected lags: FIRMS 1-3 h after the pass, Himawari about
1.4 h, IMERG about 6 h, plus the scheduler delay above.

Monitoring: a heartbeat monitor (UptimeRobot free tier) that the job pings
on each successful run and that alerts when a ping is missed, plus a keyword
monitor on `"stale":true` in `status.json`. UptimeRobot cannot compare
timestamps, so the client-side age check is what protects visitors.

## Satellite roster

Each fire source has an id, a URL and an end date. After the end date the
source is skipped and the landfill baseline is recomputed. Suomi NPP ends
2026-11-02 13:00 UTC. MODIS is not in the roster because both instruments
end during 2027.

## Front end

Text and card first, under 100 KB before any map. Leaflet with raster tiles
for the map when it exists; MapLibre only if vector tiles or tens of
thousands of client-side points prove necessary. Scripts vendored or loaded
with Subresource Integrity and pinned versions.

## Cost

Zero beyond a domain. Actions minutes are unlimited for a public repository.
Static asset requests on the Workers free plan are free and unlimited. R2's
free tier covers storage and operations at this size, and egress is free.
