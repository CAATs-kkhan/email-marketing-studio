# Campaign plan: remote data analyst outreach

Sender: Khurram Khan, Data Analyst (see `brand/voice.md`). Channel: email only. Duration: 4 weeks.

The `/marketing:campaign-plan` command wasn't available in the session that wrote this, because the plugin was installed mid-session. This plan was written by hand to the same shape. Re-run the command in a fresh session if you want to compare.

## Goal
Book **8 fifteen-minute calls** with recruiters or agency owners who have, or expect, data analysis work. Stretch goal: 12.

## Numbers (planning assumptions, not guarantees)
These are my proposed estimates, not measured results. Adjust after week 1.

| Item | Target | Basis |
|---|---|---|
| Contacts on the list | 400 | 120 Pakistan, 120 Gulf, 160 UK/US |
| Emails sent in total | about 1,400 | 400 contacts x up to 4 emails, minus replies and opt-outs |
| Replies (any kind) | 20 (5%) | typical range for a targeted cold sequence is a few percent |
| Positive replies | 12 (3%) | |
| Booked calls | 8 (2%) | stretch 12 (3%) |

Weekly checkpoint: if week 1 gives under 1% replies, change the subject line or opening before week 2 (compare two angles later, Step 12).

## Audience
- **HR recruiters** (in-house): "which open role or project does this fit?"
- **Agency owners**: "this helps you fill or win client data work, remote."
- Regions: Pakistan, Gulf, UK/US. Send each region in its own working-hours window, and put the call time zone in the ask.

## Offer
Remote data analysis done on the client's behalf, per project or hourly: extraction, cleaning, analysis, audit tests and reports. Data: payroll, expenditure, tax and customs, revenue leakage. No rates quoted. One ask: a 15-minute call.

## Sequence (one email per week)
| Week | Email | Purpose | Main proof point |
|---|---|---|---|
| 1 | 01 intro | who he is and what he does, ask for a call | 20+ years, ACDA, SAP/ACL |
| 2 | 02 proof | credibility for the skeptical reader | wrote the ACL guidelines (payroll, expenditure, extraction); trained auditors and finance managers |
| 3 | 03 use case | a concrete problem recruiters' clients have | analyzing tax and customs data to find revenue leakage; payroll checks |
| 4 | 04 last note | short close, easy yes or no | restate the call offer; no pressure |

Rules for every email: follow `.claude/skills/cold-email`, keep to claims listed in `brand/voice.md`, and add the fixed footer and opt-out line (Step 6).

## Gate: do not send for real until all of these are confirmed by the user
1. Outside consulting is allowed under the user's current service terms, and the emails' government-data experience can be shared with private clients.
2. A postal address (or a documented exemption) is added to the footer. The `cold-email` skill and CAN-SPAM-style rules expect one, which conflicts with the fixed footer in `.claude/rules/emails.md`.
3. A suppression list is kept, since the footer promises no further email after "no".
4. A proper sending domain is in place (see below).

## Lists and compliance (before any real send)
- Use only business contacts from sources the user can lawfully use. No scraped personal addresses, and nothing is sent in this lab.
- Each email carries a clear opt-out line. Stop all emails to anyone who replies or opts out.
- Sending from a free Gmail address at volume risks spam filtering. For real use, set up a separate sending domain with SPF, DKIM and DMARC and warm it first. That is outside the lab.
- Check that outside consulting is allowed under the user's service terms before real outreach.

## Measures
Replies, positive replies, booked calls, opt-outs and bounces (aim under 2%). Open tracking stays off.

## Next steps
Step 5 builds `leads.csv` with 24 fake recruiters and agency owners at @example.com in three groups. Proposed groups: Pakistan, Gulf, UK/US.
