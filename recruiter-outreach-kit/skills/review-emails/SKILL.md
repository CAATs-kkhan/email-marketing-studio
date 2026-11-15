---
name: review-emails
description: Run the automatic read-only email review (headless Claude with a JSON schema) over emails/ and report findings by severity. Use before any practice send, or to re-review after fixes.
argument-hint: "[--dir emails] [--previous reviews/last.json]"
allowed-tools: Bash(node *) Read Glob
---

# Review the emails

Run the review script that ships with this plugin from the project root:

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/review-emails.mjs" $ARGUMENTS
```

If `${CLAUDE_PLUGIN_ROOT}` does not resolve, use Glob to find `scripts/review-emails.mjs` inside the `recruiter-outreach-kit` plugin folder.

- Exit code 0: no high-severity findings. Exit 1: at least one high finding. Exit 2: the review itself failed.
- The script saves findings to `reviews/last.json` and prints them sorted by severity. Show the user the findings, do not hide any.
- Do not edit the emails yourself. Offer the fixes and wait for the user to say go.
- For a re-review, copy `reviews/last.json` to a dated file first, then pass `--previous` with that copy.
