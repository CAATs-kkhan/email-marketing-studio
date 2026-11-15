---
name: setup-outreach
description: Set up a project for practice outreach emails to recruiters and agencies. Creates the folders, the email rule, the practice-mode Resend config and outreach.config.json. Use once per client project, before the other outreach skills.
argument-hint: "[sender name | title | sender email]"
allowed-tools: Read Write Glob
---

# Set up an outreach project

Argument: `$ARGUMENTS`, in the form `sender name | title | sender email`. If any part is missing, ask the user for it. Do not guess. Everything you need is written below; do not read files outside the project.

## Steps
1. Check what already exists with Glob: `outreach.config.json`, `.mcp.json`, `.claude/rules/emails.md`, `brand/voice.md`, `leads/leads.csv`. Never overwrite an existing file. If one exists, tell the user and skip it.
2. Write the five files below, replacing `<NAME>`, `<TITLE>` and `<EMAIL>` with the sender's values (lowercase the email).
3. Report what was created and what was skipped. Remind the user:
   - run `npx emulate --service resend --port 4000` for practice sending,
   - next: `client-voice`, then `write-sequence`, then `personalize`.

## File 1: `outreach.config.json`
```json
{
  "senderName": "<NAME>",
  "senderTitle": "<TITLE>",
  "senderEmail": "<EMAIL>",
  "allowedAddresses": ["<EMAIL>"],
  "optOutLine": "Not relevant? Reply \"no\" and I won't email you again."
}
```
`allowedAddresses` holds the sender's own address only. Never add anyone else.

## File 2: `.claude/rules/emails.md`
Write this exactly, with the footer filled in:
````markdown
---
paths:
  - "emails/**/*.md"
---

# Email file rules

Applies to every file in `emails/`. Voice and allowed claims come from `brand/voice.md`.

- Frontmatter has `subject` and `preview`. Subject: 50 characters or fewer, lowercase, plain words. Preview: 90 characters or fewer.
- No links or URLs. The only call to action is: reply to book a 15-minute call.
- One ask per email.
- Greet with `{{first_name}}`. No "I hope this finds you well", no "I am writing to".
- No em dashes. No "it's not X, it's Y" patterns.
- No rates, prices, recovered amounts or client names. Use only claims listed in `brand/voice.md`.
- Never mention anything `brand/voice.md` lists under "Do not include".
- Keep the body under 120 words, excluding the footer.
- End every email with this footer, exactly:

```
<NAME> | <TITLE>
<EMAIL>

Not relevant? Reply "no" and I won't email you again.
```
````

## File 3: `.mcp.json` (practice mode)
Skip it and show the user the `resend` entry if `.mcp.json` already exists.
```json
{
  "mcpServers": {
    "resend": {
      "command": "npx",
      "args": ["-y", "resend-mcp"],
      "env": {
        "RESEND_API_KEY": "${RESEND_API_KEY:-re_practice_key}",
        "RESEND_BASE_URL": "${RESEND_BASE_URL:-http://localhost:4000}",
        "SENDER_EMAIL_ADDRESS": "${SENDER_EMAIL_ADDRESS:-onboarding@resend.dev}"
      }
    }
  }
}
```

## File 4: `brand/voice.md` (template, filled in later by `client-voice`)
```markdown
# Brand voice: <NAME>

## Sender
- Name / title / contact: (from `outreach.config.json`)
- Call to action: one ask only, a 15-minute call booked by replying. No links.
- Never quote rates or prices.

## Audience
Who receives these emails (HR recruiters, agency owners, regions).

## Tone
How the emails sound, and wording to avoid.

## What the sender offers
One or two sentences.

## Claims we may make
Only facts the sender has confirmed. Anything not listed here needs the sender's confirmation first.

## Groups
One line per lead group in `leads/leads.csv` (the `group` column): the angle or local detail to use for that group. Never add a claim that is not listed above.

## Do not include
Anything the sender wants kept out of the emails (current employer, private details, unconfirmed figures).
```

## File 5: `leads/leads.csv` (header only)
```
id,first_name,last_name,email,role,company,group,city
```

## Do not
- Put a real API key anywhere.
- Add any address other than the sender's own to `allowedAddresses`.
- Send any email.
