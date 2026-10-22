# Data sources

One row per source. "Letter" is the state of the permission request where
one is needed. Dates are the last time the row was checked.

| Source | Used for | Licence | Limits | Ends | Letter | Checked |
|---|---|---|---|---|---|---|
| NASA FIRMS, VIIRS NOAA-20 | fire detections | CC0 | keyless SE Asia CSV 24h/48h/7d; keyed area API 5,000 transactions per 10 min | none announced | not needed | 2026-10-23 |
| NASA FIRMS, VIIRS NOAA-21 | fire detections | CC0 | as above | none announced | not needed | 2026-10-23 |
| NASA FIRMS, VIIRS Suomi NPP | not used | CC0 | as above | 2026-11-02 13:00 UTC | not needed | 2026-10-23 |
| NASA FIRMS, MODIS Terra and Aqua | not used | CC0 | as above | Terra about 2027-01, Aqua about 2027-09 (secondary source) | not needed | 2026-10-23 |
| NASA GIBS, Himawari-9 AHI Band 13 | cloud and smoke imagery | acknowledgement | no published rate policy; tiles no-store; max zoom 6; about 1.4 h lag | Himawari-9 operational; Himawari-10 not before FY2029 | traffic note to Earthdata Support | 2026-10-23 |
| NASA GIBS, IMERG 30 min | observed rain | acknowledgement | max zoom 6; about 6 h lag | none announced | as above | 2026-10-23 |
| Open-Meteo forecast (JMA, GFS, ICON, IFS) | wind and rain outlook | CC BY 4.0, non-commercial free tier | 10,000 calls/day, 5,000/h, 600/min; called from the pipeline job only | none | not needed | 2026-10-23 |
| Open-Meteo CAMS air quality 0.4 deg | model PM2.5 | CC BY 4.0 | as above | none | not needed | 2026-10-23 |
| Permen LHK P.14/2020 | ISPU scale and advice text | regulation text | none | none | not needed | 2026-10-23 |
| HDX COD-AB Indonesia | kecamatan boundaries (decision pending) | CC BY-IGO | none | 2020 geometry, 34 provinces | not needed | 2026-10-23 |
| OpenStreetMap | boundaries or landfill polygons (decision pending) | ODbL | tile usage policy forbids heavy use of osm.org tiles | none | not needed | 2026-10-23 |
| BMKG open data | village forecast, nowcast warnings | terms: credit, whole, unaltered; written permission for third-party integration | 60 req/min/IP | none | to send | 2026-10-23 |
| KLHK ISPUnet | official ISPU readings | no public API found | unknown | none | to send | 2026-10-23 |
| KLHK SiPongi | official hotspots | no public API found | unknown | none | to send | 2026-10-23 |

Not used, with the reason: JAXA GSMaP (FTP with registration, v7 NRT ended
2026-06-29), WAQI/aqicn (no redistribution), RainViewer (personal use only),
PetaBencana (CC BY-NC), Global Forest Watch Data API (no shared keys),
Sensor.Community (three sensors in Indonesia).

## Adding a source

1. Read its terms yourself; do not rely on a summary.
2. Add the row here, the notice to `ATTRIBUTION.md`, and the entry to
   `pipeline/src/config/` with its end date if one is known.
3. Save a raw response as a fixture under `fixtures/<date>/`.
