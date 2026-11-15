---
name: personalize
description: Create one version of each campaign email for each lead group (pakistan, gulf, uk-us) from the base emails in emails/. Use when asked to personalize, localize, or make group versions of the outreach emails.
context: fork
argument-hint: "[group: pakistan | gulf | uk-us | all]"
allowed-tools: Read Glob Grep Write
---

# Personalize campaign emails by lead group

Argument: `$ARGUMENTS` is one group name or `all` (default `all`).

## Steps
1. Read `brand/voice.md`, `.claude/rules/emails.md`, and the base emails `emails/01-intro.md` to `emails/04-last-note.md`.
2. Read `leads/leads.csv` to confirm the groups exist. Never copy names or addresses from it. Keep `{{first_name}}` as the placeholder.
3. For each requested group, write four files to `emails/personalized/<group>/`, named like the base files (`01-intro.md`, `02-proof.md`, `03-use-case.md`, `04-last-note.md`). All groups gives 12 files.
4. Re-read each file you wrote and check it against every rule in `.claude/rules/emails.md`. Fix anything that fails.
5. Report the files written and any rule you had to fix.

## What changes per group
Keep each email's purpose, structure, footer and single call to action. Change only one or two sentences of wording, and never add a claim that isn't in `brand/voice.md`.

- **pakistan**: speak to local data work. Lead with the experience on Pakistan payroll, tax and customs data and the SAP extraction across provinces.
- **gulf**: stress fully remote work, flexible hours that overlap Gulf working days, and payroll and expenditure analysis for multi-site organizations.
- **uk-us**: stress remote delivery, flexible hours that overlap UK or US working days, and a clear written report on each project.

## Do not
- Add links, rates, a current employer or post, a location, or any private detail from the CV.
- Change the subject or preview rules: subject 50 characters or fewer, preview 90 or fewer, both plain and lowercase subject.
- Overwrite `emails/01-*.md` to `emails/04-*.md`. Only write inside `emails/personalized/`.
- Invent figures, client names or results.
