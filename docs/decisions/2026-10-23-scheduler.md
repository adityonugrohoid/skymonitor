# 2026-10-23: the pipeline runs on GitHub Actions, not a Cloudflare cron Worker

Chosen for cost. The owner does not want a recurring charge yet, and a
public repository gets unlimited Actions minutes, while a Cloudflare cron
Worker that can parse a 2 MB fire CSV needs the Workers Paid plan.

Accepted costs: schedules of 5 minutes at best with delays of 10 to 30
minutes at busy hours and no re-run of a late slot; automatic disabling
after 60 days without a commit; schedules only from the default branch;
logs in GitHub and files in Cloudflare.

Mitigations: every card shows the upstream data time, so lateness is
visible; the site computes data age on the client; a heartbeat monitor
catches a silent stop; the runbook says how to re-enable the schedule.

Gains: plain Node for the whole job, so PNG rendering uses an ordinary
library and the job runs on a laptop; a 6-hour job limit instead of 15
minutes of CPU; the job can move to any scheduler.

Reversal: a move to Workers Paid is a scheduler swap. The parse, aggregate
and render modules stay as they are.
