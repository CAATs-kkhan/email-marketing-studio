#!/usr/bin/env node
// PreToolUse safety guard for the Resend MCP server (and raw Resend API calls via Bash).
// Reads the hook JSON from stdin. Exit 0 = allow. Exit 2 = block (reason goes to stderr).
// Fails closed: anything it cannot parse or understand is blocked.

const ALLOWED_DOMAIN = "resend.dev"; // Resend's test addresses, e.g. delivered@resend.dev
const ALLOWED_ADDRESSES = new Set(["khansimpletolearn@gmail.com"]); // the user's own address

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

function isAllowed(addr) {
  if (ALLOWED_ADDRESSES.has(addr)) return true;
  return addr.split("@")[1] === ALLOWED_DOMAIN;
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

function checkRecipients(list, label) {
  if (list.length === 0) block(`${label} has no recipients to check`);
  for (const raw of list) {
    const addr = addressOf(raw);
    if (!addr) block(`${label} has an unreadable recipient: ${JSON.stringify(raw)}`);
    if (!isAllowed(addr)) {
      block(`${addr} is not allowed. Only @${ALLOWED_DOMAIN} addresses and ${[...ALLOWED_ADDRESSES].join(", ")} may receive practice sends.`);
    }
  }
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

  // Raw API calls through the shell would skip this guard, so block them.
  if (tool === "Bash") {
    const cmd = String(args.command ?? "");
    if (/api\.resend\.com|resend\.com\/emails|\/emails\/batch/i.test(cmd)) {
      block("direct Resend API calls from the shell are not allowed; use the guarded MCP tools");
    }
    process.exit(0);
  }

  const m = tool.match(/^mcp__resend__(.+)$/);
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
