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
- Never name the sender's current employer or post.
- Keep the body under 120 words, excluding the footer.
- End every email with this footer, exactly:

```
Khurram Khan | Data Analyst
khansimpletolearn@gmail.com

Not relevant? Reply "no" and I won't email you again.
```
