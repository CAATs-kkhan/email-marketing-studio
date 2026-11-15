# Email Marketing Studio

A practice outreach email studio, built with Claude Code. It writes cold emails that offer a remote data analyst's services (payroll, expenditure, tax, customs and revenue leakage analysis) to recruiters and staffing agencies, reviews them automatically, and practice-sends them safely.

**Nothing here sends real email.** All leads are fake `@example.com` addresses, and sending runs against a local practice server.

**Repository:** https://github.com/CAATs-kkhan/email-marketing-studio

```
git clone https://github.com/CAATs-kkhan/email-marketing-studio.git
```

## What is in the repo

| Path | What it is |
|---|---|
| `CLAUDE.md` | Guidance Claude Code reads automatically: rules, tooling, how things work |
| `brand/voice.md` | Sender, audience, tone, and the claims the emails may make |
| `plan.md` | 4-week campaign plan, targets, and the checklist to clear before any real send |
| `emails/` | 4 base emails, 12 group versions (pakistan, gulf, uk-us), 3 owner versions of email 01 |
| `leads/` | 24 fake contacts in 3 groups |
| `.claude/rules/emails.md` | Email rules (length limits, one ask, no links, fixed footer) |
| `.claude/hooks/send-guard.mjs` | Safety guard: only `@resend.dev` and the sender's own address may receive practice sends |
| `.mcp.json` | Resend MCP server in practice mode (fake key, local server) |
| `scripts/review-emails.mjs` | Automatic read-only email review that exits 1 on high-severity findings |
| `handoff/` | Notes from the subject-line comparison (Step 12) |
| `stretch/` | 120 fake replies used for an analysis exercise |
| `recruiter-outreach-kit/` | **A reusable plugin** built from this workflow (see below) |

## Try it

Needs Node.js 22+ and [Claude Code](https://claude.com/claude-code).

1. Reinstall the third-party writing skill (it is not stored in this repo):
   ```
   npx skills add https://github.com/coreyhaines31/marketingskills --skill cold-email
   ```
   Read it before installing.
2. Start the practice mail server in its own terminal:
   ```
   npx emulate --service resend --port 4000
   ```
3. Open Claude Code in this folder and approve the project's `resend` MCP server. Practice sends to `delivered@resend.dev` work. Sends to any other address are blocked by the guard.
4. Review the emails automatically:
   ```
   node scripts/review-emails.mjs --dir emails
   ```
   Exit code 0 means no high-severity findings, 1 means at least one, 2 means the review itself failed. It calls Claude, so it costs a little each run.

## The plugin: `recruiter-outreach-kit`

Use it for your own outreach project instead of copying this one. It contains five skills (`setup-outreach`, `client-voice`, `write-sequence`, `personalize`, `review-emails`) and a generalized send guard. It holds no personal data.

```
claude --plugin-dir recruiter-outreach-kit
```

Then run `/recruiter-outreach-kit:setup-outreach`, followed by `:client-voice`, `:write-sequence`, `:personalize` and `:review-emails`. See `recruiter-outreach-kit/README.md` for known limits. It has been validated and tested on a fictional bakery client.

## How the guard works

`send-guard.mjs` is a Claude Code `PreToolUse` hook. It blocks any send whose recipient is not `@resend.dev` or the sender's own address, always blocks broadcasts, automations and unknown send tools, and blocks direct Resend API calls from the shell. If it cannot understand a call, it blocks it.

## Before any real send

This is a practice project. Real outreach needs checks outside this repo, listed in `plan.md`: permission to do outside work if you are employed, a postal address in the footer where the law asks for one, a suppression list, a proper sending domain, and lawfully sourced contacts.

## Using it for yourself

The emails and voice file are written for one specific sender. To reuse the workflow for your own outreach, use the plugin above. Do not edit someone else's `brand/voice.md` and send as them.

## License

[MIT](LICENSE) for the contents of this repository. The third-party `cold-email` skill is not included and keeps its own license. Source documents that are left out of the repo (for example the ACL guideline PDFs) are not covered.

## Good to know

- The reviews are model judgement, not proof. They caught real overclaims, but each round also found something new, so read the emails yourself.
- There is no real send data, so the subject-line choices are reasoned, not measured.
- Private files (a CV, source PDFs) are deliberately left out by `.gitignore`.
