# Website Builder — Project Context

Read this file at the start of every session. It describes what this project is, what's built, and what's planned.

## What this is

**Website Builder** — a new project for building websites. The user paused work on [Company Metrics Compare](https://github.com/johnhall19871-svg/company-metrics-compare) to start this.

**GitHub:** https://github.com/johnhall19871-svg/website-builder *(update if repo URL differs)*

**Local path:** `C:\Users\user\Desktop\website-builder`

---

## Current status

| Phase | Status | Scope |
|-------|--------|-------|
| **Phase 0** | ✅ Complete | Repo, GitHub, CLAUDE.md, basic scaffold |
| **Phase 1** | 🔲 Not started | Define requirements and build first version |

---

## Requirements (to be defined)

The user has not yet specified the full vision for Website Builder. Capture and update this section when they describe:

- What kind of websites (landing pages, multi-page sites, templates, drag-and-drop, etc.)
- Target users (personal use, clients, no-code vs code)
- Tech stack preferences (vanilla HTML, React, Next.js, CMS, etc.)
- Hosting/deployment goals

---

## Tech stack

**TBD** — not chosen yet. Match whatever stack the user picks; don't introduce frameworks unless asked.

---

## Project layout

```
website-builder/
├── CLAUDE.md       ← this file (persistent AI context)
├── README.md       ← user-facing docs
├── .gitignore
└── package.json    ← placeholder until stack is chosen
```

Layout will grow as features are added.

---

## Development conventions

- **Keep scope minimal** — match existing patterns; don't over-engineer early.
- **Never commit `.env`** or secrets — use `.env.example` when config is needed.
- **Only commit when the user asks** — they use GitHub for snapshots and revert.
- **Read this file first** each session so the user doesn't re-explain the project.

---

## Git workflow

```powershell
cd "C:\Users\user\Desktop\website-builder"
git add .
git commit -m "Describe your change"
git push
```

Remote: `origin` → `https://github.com/johnhall19871-svg/website-builder.git` (branch: `master`).

---

## Related project

The user's previous project lives at `C:\Users\user\Desktop\claude code test` (repo: `company-metrics-compare`). Do not mix code or config between the two unless explicitly asked.
