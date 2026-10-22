# Fixtures

Raw upstream responses, saved as fetched, one folder per date (UTC). Tests
run against these and never against the network. They are also the
known-answer cases for the cell, upwind and baseline logic.

| Folder | File | Source | Licence | Note |
|---|---|---|---|---|
| 2026-10-23 | J1_VIIRS_C2_SouthEast_Asia_24h.csv | NASA FIRMS, NOAA-20 VIIRS, keyless 24h CSV | CC0 | fetched 2026-10-22 about 20:00 UTC, South East Asia region |
| 2026-10-23 | J2_VIIRS_C2_SouthEast_Asia_24h.csv | NASA FIRMS, NOAA-21 VIIRS, keyless 24h CSV | CC0 | as above |

Fixtures must not contain personal data. Upstream responses from Open-Meteo
are saved with the request URL in a sidecar file so the model list is on
record.
