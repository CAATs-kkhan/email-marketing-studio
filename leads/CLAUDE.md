# leads/ folder rules

- Every person and company in `leads.csv` is fake. Names, companies ("... Demo") and cities are made up; any match with a real person is a coincidence.
- All addresses end in @example.com, which can't receive mail. Never replace them with real addresses, and never send to them outside the practice server.
- 24 rows: 3 groups (`pakistan`, `gulf`, `uk-us`) of 8, each with 4 HR recruiters and 4 agency owners. Keep that balance when editing.
- Columns: id, first_name, last_name, email, role, company, group, city.
- Use `group` and `role` to personalize emails: HR recruiters get the "which role does this fit" angle, agency owners get the "win client data work" angle (see `brand/voice.md`).
- Ask before deleting rows or the file.
