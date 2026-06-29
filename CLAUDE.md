# Jarvis AI Job Finder — Project Context

Read this file at the start of every session. It describes what this project is, what's built, and what's planned.

## What this is

**Jarvis AI Job Finder** — an AI-assisted tool to help find jobs. The user paused work on [Company Metrics Compare](https://github.com/johnhall19871-svg/company-metrics-compare) to start this project (originally scaffolded as "Website Builder", then renamed).

**GitHub:** https://github.com/johnhall19871-svg/jarvis-ai-job-finder

**Local path:** `C:\Users\user\Desktop\jarvis-ai-job-finder`

---

## Current status

| Phase | Status | Scope |
|-------|--------|-------|
| **Phase 0** | ✅ Complete | Repo, GitHub, CLAUDE.md, basic scaffold |
| **Phase 1** | 🔲 Not started | Define requirements and build first version |

---

## Requirements (to be defined)

Capture and update this section when the user describes their vision:

- Job sources (LinkedIn, Indeed, company sites, APIs, etc.)
- How AI assists (matching, cover letters, resume tailoring, alerts, etc.)
- User workflow (search filters, saved jobs, application tracking)
- Tech stack preferences
- Auth / accounts / data storage needs

---

## Tech stack

**TBD** — not chosen yet. Match whatever stack the user picks; don't introduce frameworks unless asked.

---

## Project layout

```
jarvis-ai-job-finder/
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
cd "C:\Users\user\Desktop\jarvis-ai-job-finder"
git add .
git commit -m "Describe your change"
git push
```

Remote: `origin` → `https://github.com/johnhall19871-svg/jarvis-ai-job-finder.git` (branch: `master`).

---

## Related project

The user's previous project lives at `C:\Users\user\Desktop\claude code test` (repo: `company-metrics-compare`). Do not mix code or config between projects unless explicitly asked.
