# Handoff summary (written for Step 12)

Read this first in any new session. It replaces the chat history.

## State of the project
- Goal: practice email campaign offering Khurram Khan's remote data analysis (ACL, SAP, payroll, expenditure, tax and customs, revenue leakage) to recruiters and agency owners in Pakistan, UK/US and the Gulf. Nothing is sent for real.
- Done: Steps 1-10. Voice in `brand/voice.md`, plan in `plan.md`, 24 fake leads in `leads/leads.csv`, rules in `.claude/rules/emails.md`, base emails `emails/01-04`, 12 group versions in `emails/personalized/`, `.mcp.json` (Resend practice mode), `send-guard.mjs` hook.
- Step 11 (practice launch) done and verified: three group email 01s were sent through the Resend MCP tools to delivered@resend.dev (all `email.delivered` on the local emulator), and a send to an @example.com address was blocked by send-guard.
- Real sending is gated in `plan.md` (service-terms check, postal address, suppression list, sending domain).

## Step 12 task
Compare two subject-line angles for email 01 (the intro). Do not edit `emails/` until the comparison is decided.

- Current subject: `remote data analysis` (control)
- Angle A, outcome-led: `revenue leakage help`
- Angle B, credential-led: `remote acl analyst`

Both must stay lowercase and 50 characters or fewer (`.claude/rules/emails.md`). The previews may be adjusted to fit each angle but must stay at 90 characters or fewer.

## How to judge
No real send data exists, so judge on reasoning from `.claude/skills/cold-email/references/subject-lines.md` and the audiences (HR recruiters vs agency owners), not on invented open or reply rates. Say which angle suits which audience, any risk (spam-trigger or overclaim wording), and give one recommendation.

## Where to record results
Write each session's verdict to `handoff/angle-a.md` and `handoff/angle-b.md` (one page each). A final session compares them in `handoff/decision.md`.
