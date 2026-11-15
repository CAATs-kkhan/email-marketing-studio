---
name: client-voice
description: Interview the sender (up to six questions, one at a time) and write brand/voice.md for outreach emails to recruiters and agencies. Use after setup-outreach, or when the voice file is empty or needs redoing.
argument-hint: "[optional: a document with the sender's background]"
allowed-tools: Read Write Glob
---

# Build the client voice file

Read `outreach.config.json` and the current `brand/voice.md` (the template). If a background document is given in `$ARGUMENTS`, read it too, and use only facts it states.

## Interview
Ask one question at a time and wait for each answer. Ask at most six, skipping any the user already answered:
1. What exactly does the sender offer?
2. What proof can be stated (experience, results, credentials)? Only confirmed facts.
3. Who receives the emails (roles, regions), and how should each group be addressed?
4. How should the emails sound, and which words must never appear?
5. What must never be mentioned (current employer, private details, unconfirmed figures)?
6. What is the single call to action? (Default: reply to book a 15-minute call. No links, no rates.)

If the user supplies all answers up front, do not re-ask them. Do not invent answers.

## Write `brand/voice.md`
Keep the template's headings: Sender, Audience, Tone, What the sender offers, Claims we may make, Groups, Do not include.
- Put every confirmed claim as its own bullet. Use the weakest accurate verb ("contributed to", not "led") when the user's source is vague.
- Under **Groups**, write one line per lead group. If `leads/leads.csv` exists, use its `group` values. Each line gives an angle or local detail, and never adds a claim.
- Under **Do not include**, list everything the user said to keep out, plus: private details, invented figures, rates.
- Do not add the sender's private contact details beyond the address in `outreach.config.json`.

Finish by showing a short summary and asking the user to confirm or correct it.
