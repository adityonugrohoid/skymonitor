# Contributing

## Wording rules

These apply to every string the project authors: page copy, card text, file
descriptions, README, commit messages. They keep the site outside the legal
definition of a warning (UU 24/2007) and inside the protected act of helping
disseminate official information (UU 31/2009 Pasal 89, PP 11/2016 Pasal 49).

1. Every statement is one of three kinds: a sourced fact with a time, a
   verbatim relay of an official statement with agency and time, or a
   comparison of named models.
2. No imperative sentences of the project's own. Advice text comes only from
   Permen LHK P.14/2020 Lampiran II or an official BMKG or KLHK statement,
   quoted with attribution.
3. The words "peringatan", "siaga", "waspada", "darurat" and "status" do not
   appear in project-authored text or in the project name.
4. Any notification, if ever added, is called "pembaruan" and carries only
   facts or verbatim official statements.
5. Every page carries a one-line "sumber resmi" strip linking BMKG, ISPUnet
   (KLHK) and SiPongi (KLHK).

Model PM2.5 is shown as a number with "perkiraan model sekitar 40 km, bukan
pengukuran", on its own neutral colour ramp, with the official ISPU scale
printed beside it as a reference table. The project prints the scale; it
never assigns the category. ISPU colours appear only on official KLHK
readings.

The hotspot view is limited to about 30-50 km and labelled "arah angin saat
ini", never "sumber asap". No company, concession or private landowner is
ever named.

## No personal data

The site collects nothing: no accounts, no cookies, no analytics, no
server-side logging of visitors beyond what Cloudflare keeps by default. Any
geolocation stays in the browser. Pull requests must not add any of these.

Nothing in the repo may contain a person's name, home location, phone number
or health detail, including in fixtures, screenshots and test data. Landfill
and station coordinates are public facilities and are fine.

## No keys in the repo

Upstream keys live in `wrangler secret` and in the maintainer's local key
file. The build and deploy scripts read them from there. A key in a tracked
file is a blocking review finding, and the key is rotated.

## Text

ASCII punctuation only in prose: hyphen, straight quotes, three dots. No
em-dashes, curly quotes, arrows or decorative symbols. Bahasa Indonesia
first, English second. Times carry their zone (WIB, WITA, WIT) and come from
the upstream data time, never the render time.

## Pull requests

- One PR, one intent. The title describes the change.
- Stage only files the change touched.
- Tests run against `fixtures/`, never against the network.
- The PR template's checklist must be answered honestly; "not verified" is
  an acceptable answer, a false "verified" is not.
