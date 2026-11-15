---
name: personalize
description: Create one version of each base email for each lead group in leads/leads.csv, using the group angles in brand/voice.md. Use after write-sequence when asked to personalize or make group versions.
context: fork
argument-hint: "[group name | all]"
allowed-tools: Read Glob Grep Write
---

# Personalize campaign emails by lead group

Argument: `$ARGUMENTS` is one group name or `all` (default `all`).

## Steps
1. Read `brand/voice.md` (especially **Groups**), `.claude/rules/emails.md`, `leads/leads.csv` and the base emails `emails/01-*.md` to `emails/04-*.md`.
2. Work out the groups from the distinct values of the `group` column in `leads/leads.csv`. If a requested group is not there, stop and say so.
3. For each requested group, write four files to `emails/personalized/<group>/` with the same names as the base files. Never copy names or addresses from the leads file: keep `{{first_name}}` as the placeholder.
4. Re-read each file you wrote and check it against every rule in `.claude/rules/emails.md`. Fix any failure.
5. Report the files written, and any rule you had to fix.

## What changes per group
Keep each email's purpose, structure, footer and single call to action. Change one or two sentences, using only the angle written for that group under **Groups** in `brand/voice.md`. If the voice file has no line for a group, make no change for it and say so.

## Do not
- Add links, rates, anything listed under "Do not include", or any claim not in `brand/voice.md`.
- Promise working hours, time-zone overlap or extra deliverables unless the voice file lists them.
- Overwrite the base emails. Write only inside `emails/personalized/`.
