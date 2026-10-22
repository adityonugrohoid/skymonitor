# Architecture

## Flow

1. A scheduled Cloudflare Worker (`worker/`) runs every 10 minutes.
2. It fetches every upstream source in one pass: FIRMS CSVs for each
   satellite in `worker/src/config/satellites.json`, Open-Meteo for the
   kecamatan centroids, and BMKG and KLHK once their letters are answered.
3. It processes: deduplicates detections across satellites and passes,
   aggregates into 2 km cells keeping the per-cell maximum fire radiative
   power, joins cells to kecamatan, computes the set of cells within the
   upwind radius, compares the rain models, and renders one card per
   kecamatan as SVG converted to PNG.
4. It writes static files to R2: per-kecamatan JSON, PNG cards, the daily
   open data files, and `status.json` with a stale flag per feed.
5. The site (`site/`, Workers Static Assets) reads `status.json` first. If
   any feed is stale it shows only the stale notice and the official-source
   strip. Otherwise it shows the card and the text behind it.

The browser never calls an upstream API and never sends anything to the
project. Keys live in `wrangler secret`.

## Storage

| Store | Contents | Lifetime |
|---|---|---|
| R2 `latest/` | current per-kecamatan JSON, PNG cards, status.json | overwritten every 10 min, edge cache 10 min |
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
Thresholds in `worker/src/config/thresholds.json`: fire 6 h, rain 12 h,
weather 24 h. Expected lags: FIRMS 1-3 h after the pass, Himawari about
1.4 h, IMERG about 6 h.

Monitoring: UptimeRobot keyword monitor on the string `"stale":true` in
`status.json` (it cannot compare timestamps), plus a heartbeat monitor the
Worker pings on each successful run.

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

Workers Paid (USD 5/month minimum) for the cron Worker: the Free plan gives
10 ms CPU per cron run, which cannot parse a 2 MB CSV. Static asset requests
are free and unlimited. R2 free tier covers storage and operations at this
size; egress is free.
