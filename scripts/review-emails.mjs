#!/usr/bin/env node
// Automatic email review. Runs Claude Code headless (`claude -p`), asks for findings as JSON
// that matches a schema, prints a short report, and exits 1 if any finding is high severity.
//
// Usage:
//   node scripts/review-emails.mjs [--dir emails] [--previous reviews/last.json] [--out reviews/last.json]
//
// Exit codes: 0 = no high findings, 1 = at least one high finding, 2 = the review itself failed.
// The reviewer is read-only (Read, Glob, Grep). It never edits files and never sends mail.

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const dir = opt("--dir", "emails");
const previousPath = opt("--previous", null);
const outPath = opt("--out", "reviews/last.json");

const schema = {
  type: "object",
  properties: {
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          file: { type: "string" },
          severity: { type: "string", enum: ["high", "medium", "low"] },
          rule: { type: "string", description: "Which rule or claim limit is broken" },
          quote: { type: "string", description: "The exact text with the problem" },
          problem: { type: "string" },
          fix: { type: "string" },
        },
        required: ["file", "severity", "rule", "quote", "problem", "fix"],
      },
    },
    summary: { type: "string" },
  },
  required: ["findings", "summary"],
};

let prompt = `Review every email file under ${dir}/ (include subfolders).
Read first: brand/voice.md and .claude/rules/emails.md.
Check each email for:
1. Any rule in .claude/rules/emails.md (subject and preview limits, lowercase subject, no links, one ask, footer exact, no em dashes, body length).
2. Any claim not allowed by brand/voice.md, any overclaim (for example "wrote" instead of "developed"), any rate or price, any current employer or post, any private detail (ID number, date of birth, address, phone).
3. AI-sounding patterns such as "it's not X, it's Y".
Severity: high = a false or unsupported claim, a leaked private detail, a rate, a link, or a mention of the current employer. medium = a rule broken in a way that would not mislead anyone. low = style.
Do not edit anything. Reply only with the JSON the schema asks for. If nothing is wrong, return an empty findings array.`;

if (previousPath) {
  if (!existsSync(previousPath)) {
    console.error(`--previous file not found: ${previousPath}`);
    process.exit(2);
  }
  const prev = readFileSync(previousPath, "utf8");
  prompt += `\n\nThis is a re-review. These findings came from the previous review:\n${prev}\nFor each one, check whether it is now fixed. Report only problems that are still present, plus any new problems. Do not repeat fixed ones.`;
}

const r = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", JSON.stringify(schema),
    "--allowedTools", "Read", "Glob", "Grep",
    "--disallowedTools", "Write", "Edit", "Bash",
    "--no-session-persistence",
    "--max-budget-usd", "2",
  ],
  // No shell: arguments (long prompt, JSON schema) are passed as-is. On Windows `claude` is claude.exe.
  { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
);

function fail(msg) {
  console.error(`Review failed: ${msg}`);
  process.exit(2);
}

if (r.error) fail(r.error.message);
if (r.status !== 0 && !r.stdout) fail((r.stderr || "claude exited with an error").trim());

let envelope;
try {
  envelope = JSON.parse(r.stdout);
} catch {
  fail("could not parse claude output as JSON");
}
if (envelope.is_error) fail(String(envelope.result ?? "claude reported an error"));

let review = envelope.structured_output;
if (!review && typeof envelope.result === "string") {
  try {
    review = JSON.parse(envelope.result);
  } catch {
    /* fall through */
  }
}
if (!review || !Array.isArray(review.findings)) fail("no findings object in the response");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(review, null, 2) + "\n");

const order = { high: 0, medium: 1, low: 2 };
review.findings.sort((a, b) => order[a.severity] - order[b.severity]);
for (const f of review.findings) {
  console.log(`[${f.severity.toUpperCase()}] ${f.file}\n  rule:    ${f.rule}\n  quote:   ${f.quote}\n  problem: ${f.problem}\n  fix:     ${f.fix}\n`);
}
const high = review.findings.filter((f) => f.severity === "high").length;
console.log(`${review.findings.length} finding(s), ${high} high. Saved to ${outPath}.`);
console.log(review.summary);
process.exit(high > 0 ? 1 : 0);
