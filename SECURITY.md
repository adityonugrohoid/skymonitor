# Security

## Reporting

Use GitHub's private vulnerability reporting on this repository (Security
tab, "Report a vulnerability"). Do not open a public issue for a security
problem. Expect an acknowledgement within 7 days.

## What counts

- Any way to make the site show data that is not from the stated source, or
  with a wrong time.
- Any way to reach an upstream key or the Cloudflare account.
- Any way to make the site collect or expose visitor data.
- Any way to defeat the stale switch-off so old data shows as current.

## What the site is

A static site plus one scheduled Worker. The Worker is the only component
with secrets. The browser never calls an upstream API and never sends
anything to the project.
