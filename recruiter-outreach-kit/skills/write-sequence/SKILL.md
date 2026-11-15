---
name: write-sequence
description: Write the four-email outreach sequence (intro, proof, use case, last note) into emails/ from brand/voice.md and the email rule. Use after client-voice.
argument-hint: "[optional: extra angle or topic for email 03]"
allowed-tools: Read Write Glob Grep
---

# Write the base email sequence

Read `brand/voice.md`, `.claude/rules/emails.md` and `outreach.config.json`. If the `cold-email` skill is installed, follow its guidance on structure and subject lines; if not, use the rules below. Extra angle from the user: `$ARGUMENTS`.

## Files to write in `emails/`
| File | Purpose |
|---|---|
| `01-intro.md` | who the sender is, what is offered, one ask |
| `02-proof.md` | one credibility point from the confirmed claims, a different one from email 01 |
| `03-use-case.md` | one concrete problem the reader's clients have and how the offer addresses it |
| `04-last-note.md` | short close, easy yes or no |

Each file has frontmatter with `subject` and `preview`, then a body greeting `{{first_name}}`, then the exact footer from the rule.

## Rules
- Follow every rule in `.claude/rules/emails.md`: subject 50 characters or fewer and lowercase, preview 90 or fewer, no links, one ask, no em dashes, body under 120 words, exact footer.
- Use only claims listed in `brand/voice.md`. Never add a figure, client name, rate or duration that is not listed.
- Each email adds something new. Do not repeat email 01's credentials in email 02.
- Call to action in emails 01 to 03: reply "call" and the sender will send times for 15 minutes.

After writing, re-read each file and check it against the rule. Fix any failure. Report the four subjects and the word counts. Do not send anything.
