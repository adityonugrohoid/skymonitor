# CLAUDE.md - skymonitor

Public open-source site showing satellite and weather data for Indonesia's
fire and haze season. Bahasa first. The global rules apply (safety, git,
writing). These are the repo-specific ones.

1. No personal data, ever: no names, home coordinates, phone numbers or
   health details, in code, fixtures, docs, screenshots or commit messages.
   Coordinates of public facilities (landfills, stations) are fine.
2. No keys in tracked files. Upstream keys live in `wrangler secret` and in
   the maintainer's local key file; scripts read them, files never contain
   them.
3. Wording rules in `CONTRIBUTING.md` apply to every string, including UI
   text and data file descriptions. Nothing the project writes is a warning,
   a category or an imperative.
4. Times come from upstream data time, with zone, never from render time.
   Every published file carries generated_at and upstream_time.
5. Tests run against `fixtures/`, never the network.
6. No build-order labels (phase, stage, step, v1) in tracked files. Ordering
   lives in the owner's handoff notes outside this repo.
