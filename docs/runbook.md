# Runbook

For the maintainer on duty. Everything here can be done by any person with
admin on the GitHub organisation and the Cloudflare account.

## Secrets the pipeline needs

Repository secrets (Settings, Secrets and variables, Actions):

| Secret | Where it comes from |
|---|---|
| R2_ACCOUNT_ID | Cloudflare dashboard, R2, account id shown on the overview |
| R2_ACCESS_KEY_ID | Cloudflare dashboard, R2, Manage API tokens, a token with Object Read and Write on the `skymonitor-data` bucket |
| R2_SECRET_ACCESS_KEY | shown once when that token is created |
| FIRMS_MAP_KEY | https://firms.modaps.eosdis.nasa.gov/api/map_key/ |

The bucket name is not a secret and is set in the workflow file.

## If the pipeline stops

Symptom: the heartbeat monitor alerts, or the site shows the stale notice.

1. GitHub, Actions, `pipeline`. Open the last run and read the failing step.
2. If the workflow shows "This scheduled workflow is disabled because there
   has been no activity in this repository for at least 60 days": re-enable
   it with `gh workflow enable pipeline.yml`, or from the workflow page. Any
   commit to the repository resets the clock.
3. If an upstream URL changed: fix it in `pipeline/src/config/`, add the new
   response as a fixture, open a PR.
4. If a secret expired or was rotated: update it in repository secrets and
   trigger a run with `gh workflow run pipeline.yml`.
5. Nothing needs to be done for visitors: the site hides every number while
   any feed is stale, and it computes the age itself from `generated_at`.

## If NASA changes a URL or a format

1. Save the new response under `fixtures/<date>/`.
2. Update the parser and its test against that fixture.
3. Update `DATA_SOURCES.md` and the roster if a satellite was added or
   removed.

## If a satellite reaches its end date

Nothing. The roster skips it. Check that the landfill baseline was
recomputed (the status file lists the active roster).

## How to pause the site

Disable the workflow: `gh workflow disable pipeline.yml`. Within the stale
threshold the site switches to the notice and the official-source strip on
its own. To take the site down entirely, disable the `skymonitor-site`
Worker in the Cloudflare dashboard.

## How to rotate the FIRMS key

1. Request a new key at https://firms.modaps.eosdis.nasa.gov/api/map_key/
2. Update the `FIRMS_MAP_KEY` repository secret.
3. Replace the maintainer's local key file.

## Running the pipeline on a laptop

```
cd pipeline
npm ci
R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... R2_BUCKET=skymonitor-data npm run pipeline
```

Tests never need credentials: `npm test` runs against `fixtures/`.
