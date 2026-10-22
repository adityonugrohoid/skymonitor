# Sky Monitor

Data langit untuk Indonesia, dalam bahasa yang jelas.

Sky Monitor menampilkan data satelit dan cuaca publik untuk musim kebakaran
dan kabut asap: titik panas, arah angin, asap yang terlihat satelit, hujan
yang sudah turun dan yang diperkirakan model, dan bacaan ISPU resmi bila
ada stasiun. Setiap model diberi label sebagai model. Pernyataan resmi
disampaikan apa adanya dengan sumbernya. Situs ini tidak pernah mengeluarkan
peringatan, tingkat bahaya, atau kategori buatan sendiri. Untuk itu ada
BMKG, KLHK dan BPBD, dan setiap halaman menautkan ke mereka.

Yang ada di dalamnya sekarang:
- Kartu "Asap hari ini" per kecamatan yang bisa diteruskan lewat WhatsApp.
- Berkas data terbuka harian per provinsi dan kecamatan (CC BY 4.0).

Yang direncanakan: peta api dan hujan, pantauan panas satelit di sekitar TPA.

## English

Sky Monitor is a lightweight, open-source window on public satellite and
weather data for Indonesia's fire and haze season. It labels every model as a
model, relays official statements unaltered with credit, and never issues
warnings, alert levels or categories of its own.

How it works: a scheduled Cloudflare Worker fetches every upstream source,
processes it, renders one card per kecamatan and writes static files to R2.
The browser reads only those files. When any feed is older than its
threshold the site hides every number and shows only the official sources.
See `docs/architecture.md`.

## Sources and licences

Code: Apache-2.0 (`LICENSE`). Published data: CC BY 4.0 (`LICENSE-DATA`).
Upstream sources, their licences and required notices: `DATA_SOURCES.md` and
`ATTRIBUTION.md`.

## Contributing

Read `CONTRIBUTING.md` before opening a pull request. The wording rules there
are not style; they are what keeps the project legal.

## Status

Scaffold. Nothing is published yet.
