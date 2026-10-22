# Landfill (TPA) list

The project's own list of landfills watched for satellite heat detections.
Licence: CC BY 4.0 (see `LICENSE-DATA`). Coordinates are of public
facilities. Each row names its source and the date it was checked.

Columns: name, kabupaten_kota, provinsi, lat, lon (WGS84, four decimals),
source, checked (YYYY-MM-DD), note.

A site is flagged only when detections within its radius exceed its 30-day
baseline, because flares, factories and hot roofs near landfills trigger
detections every day.
