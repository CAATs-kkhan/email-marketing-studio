#!/usr/bin/env node
// PreToolUse safety guard for the Resend MCP server (and raw Resend API calls via Bash).
// Reads the hook JSON from stdin. Exit 0 = allow. Exit 2 = block (reason goes to stderr).
// Fails closed: anything it cannot parse or understand is blocked.
//
// Who may receive mail: any @resend.dev address (Resend's test inboxes) plus the addresses in
// `allowedAddresses` in <project>/outreach.config.json. If that file is missing or unreadable,
// only @resend.dev is allowed.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const ALLOWED_DOMAIN = "resend.dev";

// Always blocked, whatever the recipients are: they reach lists or run on their own.
const ALWAYS_BLOCKED = new Set([
  "send-broadcast",
  "send-event",
  "create-automation",
  "update-automation",
  "duplicate-automation",
  "send-inbox-draft", // recipients are not visible in the call
]);

// Sending tools that carry their own recipients, which we check.
const RECIPIENT_CHECKED = new Set(["send-email", "send-batch-emails", "send-new-inbox-email"]);

function block(reason) {
  process.stderr.write(`send-guard blocked this call: ${reason}\n`);
  process.exit(2);
}

function addressOf(value) {
  // Accepts "a@b.com" or "Name <a@b.com>". Returns lowercase address or null.
  if (typeof value !== "string") return null;
  const m = value.match(/<([^<>]+)>\s*$/);
  const addr = (m ? m[1] : value).trim().toLowerCase();
  return /^[^\s@<>,;]+@[^\s@<>,;]+$/.test(addr) ? addr : null;
}

function loadAllowedAddresses(projectDir) {
  try {
    const cfg = JSON.parse(readFileSync(join(projectDir, "outreach.config.json"), "utf8"));
    const list = Array.isArray(cfg.allowedAddresses) ? cfg.allowedAddresses : [];
    return new Set(list.map(addressOf).filter(Boolean));
  } catch {
    return new Set(); // missing or unreadable config: only @resend.dev is allowed
  }
}

function recipientsOf(obj) {
  const out = [];
  for (const key of ["to", "cc", "bcc"]) {
    const v = obj?.[key];
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) out.push(...v);
    else out.push(v);
  }
  return out;
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let evt;
  try {
    evt = JSON.parse(input);
  } catch {
    block("could not read the hook input");
  }
  const tool = String(evt?.tool_name ?? "");
  const args = evt?.tool_input ?? {};
  const projectDir = process.env.CLAUDE_PROJECT_DIR || evt?.cwd || process.cwd();
  const allowedAddresses = loadAllowedAddresses(projectDir);

  const isAllowed = (addr) => allowedAddresses.has(addr) || addr.split("@")[1] === ALLOWED_DOMAIN;

  const checkRecipients = (list, label) => {
    if (list.length === 0) block(`${label} has no recipients to check`);
    for (const raw of list) {
      const addr = addressOf(raw);
      if (!addr) block(`${label} has an unreadable recipient: ${JSON.stringify(raw)}`);
      if (!isAllowed(addr)) {
        const own = [...allowedAddresses].join(", ");
        block(`${addr} is not allowed. Only @${ALLOWED_DOMAIN} addresses${own ? ` and ${own}` : ""} may receive practice sends.`);
      }
    }
  };

  // Raw API calls through the shell would skip this guard, so block them.
  if (tool === "Bash") {
    const cmd = String(args.command ?? "");
    if (/api\.resend\.com|resend\.com\/emails|\/emails\/batch/i.test(cmd)) {
      block("direct Resend API calls from the shell are not allowed; use the guarded MCP tools");
    }
    process.exit(0);
  }

  const m = tool.match(/^mcp__(?:plugin_[^_]+_)?resend__(.+)$/) || tool.match(/^mcp__resend__(.+)$/);
  if (!m) process.exit(0); // not a Resend tool: not our business
  const name = m[1];

  if (ALWAYS_BLOCKED.has(name)) {
    block(`${name} is always blocked (broadcast, automation or draft sends cannot be checked)`);
  }

  if (RECIPIENT_CHECKED.has(name)) {
    if (name === "send-batch-emails") {
      const items = args.emails ?? args.batch ?? (Array.isArray(args) ? args : null);
      if (!Array.isArray(items) || items.length === 0) block("send-batch-emails has no readable email list");
      items.forEach((e, i) => checkRecipients(recipientsOf(e), `email ${i + 1} in the batch`));
    } else {
      checkRecipients(recipientsOf(args), name);
    }
    process.exit(0);
  }

  // Any other tool whose name starts with "send" is unknown to us: block it.
  if (name.startsWith("send")) block(`${name} is an unknown sending tool`);

  process.exit(0);
});
