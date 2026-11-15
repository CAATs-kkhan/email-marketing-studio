# recruiter-outreach-kit

A Claude Code plugin for writing cold outreach emails to recruiters and staffing agencies, reviewing them, and practice-sending them safely. Nothing it does sends real email.

## What is in it
| Skill | Does |
|---|---|
| `setup-outreach` | creates the folders, email rule, practice-mode Resend config and `outreach.config.json` in a project |
| `client-voice` | interviews the sender (up to six questions) and writes `brand/voice.md` |
| `write-sequence` | writes a four-email sequence into `emails/` |
| `personalize` | makes one version of each email per lead group in `leads/leads.csv` |
| `review-emails` | runs a read-only automatic review and reports findings by severity |

A `PreToolUse` hook (`hooks/send-guard.mjs`) guards the Resend MCP tools. It allows sends only to `@resend.dev` and the addresses in `allowedAddresses` in the project's `outreach.config.json`. It always blocks broadcasts, automations and unknown send tools, blocks raw Resend API calls from the shell, and fails closed.

## Use it
```
claude --plugin-dir /path/to/recruiter-outreach-kit
```
Then, in the client project: `/recruiter-outreach-kit:setup-outreach`, `:client-voice`, `:write-sequence`, `:personalize`, `:review-emails`.

## Needs
- Node.js 22+ (the guard and review script are plain Node, no packages).
- For practice sending: `npx emulate --service resend --port 4000` in a separate terminal.
- Recommended: the third-party `cold-email` skill (`npx skills add https://github.com/coreyhaines31/marketingskills --skill cold-email`). It is not bundled. `write-sequence` uses it when present. Read it before installing.

## Known limits (found while testing)
- `setup-outreach` writes `.claude/rules/emails.md` and `.mcp.json`. Claude Code treats both as sensitive paths, so expect an approval prompt for each. In headless mode (`claude -p`) they are refused even with allow rules, so write them by hand from the skill text.
- `review-emails` runs a script that lives in the plugin folder. If your settings include `permissions.blockReadsOutsideWorkingDirectories`, add the plugin folder with `/add-dir` (or `--add-dir` in headless mode), or the script can't be read.
- The send guard also blocks any Bash command whose text contains the Resend API address, even a harmless `echo`.
- Generated emails can still contain wording beyond the confirmed claims. Always run `review-emails` and fix high findings before a practice send.

## Before any real send
This kit is for practice. Real outreach needs your own checks: permission to do outside work if you are employed, a postal address in the footer where the law asks for one, a suppression list, and a proper sending domain.
