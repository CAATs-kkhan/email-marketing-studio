# Step 12 decision: subject line for email 01

Compares `handoff/angle-a.md` and `handoff/angle-b.md`. Both verdicts are reasoning from `.claude/skills/cold-email/references/subject-lines.md` and `brand/voice.md`. No send data exists, so no open or reply rates are claimed. Nothing in `emails/` has been changed.

## Subjects compared
- Control: `remote data analysis`
- Angle A (outcome-led): `revenue leakage help`
- Angle B (credential-led): `remote acl analyst`

All three are lowercase, 2-4 words and well under 50 characters. None has spam triggers, urgency words, numbers or a name.

## Recommendation per audience

**HR recruiters: keep the control, `remote data analysis`.**
Both verdicts agree. Recruiters place "data analysis" at once. "revenue leakage" (A) is a finance problem, not a role or project they fill. "acl" (B) is niche, and "remote ... analyst" can look like a CV submission.

**Agency owners: test Angle A, `revenue leakage help`, against the control.**
Both verdicts say the control is not the best fit for owners. A names a client problem an owner could win work on, which matches the voice file's line for owners. B suits only owners who serve audit and finance clients, and shares the candidate-pitch risk. Keep B as the backup variant if A is rejected.
Condition for A: the body of email 01 must use the approved wording (analysis of tax and customs data to find revenue leakage, no recovered amounts), because "revenue leakage" is not named in the CV.

## Overall pick: the control, `remote data analysis`
It is the safe default for the whole list. Both verdicts say not to replace it for everyone. It is clear to both audiences and makes no claim beyond the voice file. A is an owner-only variant, and B is a backup.

## Where the two verdicts differ
- **Which variant for owners.** A's verdict says use A for owners. B's verdict says use B for owners. They did not compare A with B directly, so each one only argued against the control. I chose A because it fits the voice file's owner line best. The cost is that A carries the overclaim risk that B avoids (B's wording is fully backed by the CV).
- **How firm the owner case is.** A's verdict is firm for owners. B's is conditional on the owner serving audit or finance clients, and "no better" otherwise. Treat the owner recommendation as a hypothesis to test, not a proven result.
- **Risk on the control.** A's verdict rates the control as low risk. B's verdict says the control carries a mild "pitching product in subject" risk. This does not change the pick, because both agree the alternatives are no safer.

## Applied (user confirmed)
Three owner versions of email 01 were added: `emails/personalized/<group>/01-intro-owner.md` for pakistan, gulf and uk-us. Subject `revenue leakage help`, preview "I analyze tax and customs data for revenue leakage, remotely, per project or hourly." The opening paragraph leads with tax and customs data for revenue leakage (the approved wording, no recovered amounts) and says "your clients' behalf". The existing `01-intro.md` files are unchanged and stay the recruiter versions (subject `remote data analysis`). No other email was edited. This is still a hypothesis to test, not a proven winner.
