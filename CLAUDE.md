# Jarvis AI Job Finder — Project Context

Read this file at the start of every session.

## What this is

**Jarvis AI Job Finder** helps the user **find and schedule the most profitable times to work** as an Uber driver (passengers + Uber Eats). Phase 1 focuses on shift planning from home base **DN22 0QG** within a **35-mile radius**.

**GitHub:** https://github.com/johnhall19871-svg/jarvis-ai-job-finder

**Local path:** `C:\Users\user\Desktop\website-builder` (folder rename to `jarvis-ai-job-finder` optional)

---

## Current status

| Phase | Status | Scope |
|-------|--------|-------|
| **Phase 1** | ✅ Complete | 7-day calendar, shift recs, net £/hr charts, cost model |
| **Phase 2** | 🔲 Not started | Live/historical Uber surge data, user earnings history |
| **Phase 3** | 🔲 Not started | Multi-gig support, calendar export, mobile polish |

---

## User requirements (Phase 1)

1. **Gigs:** Uber rides + Uber Eats (minimize downtime, maximize profit)
2. **Home:** DN22 0QG — travel time & fuel to work zones included
3. **Working area:** 35-mile radius from home
4. **Pricing data:** Modelled demand patterns (Uber has no public surge API)
5. **Running costs:**
   - Fuel: **13p/mile** (`FUEL_PENCE_PER_MILE=13`)
   - Uber commission: **25%** default (`UBER_COMMISSION_RATE=0.25`)
   - Insurance: **£3/hr** default (`INSURANCE_PER_HOUR=3`) — user should tune
6. **UI:** Web app, 7-day rolling calendar, per-day shift recommendation (1–6 hrs), area + times, net £/hr bar chart after all costs

---

## Tech stack

- **Runtime:** Node.js 18+ (ES modules)
- **Backend:** Express — `/api/schedule` builds weekly plan
- **Frontend:** Vanilla HTML/CSS/JS (`public/`)
- **Geography:** Haversine distances; zones = town/city centres within radius
- **Demand model:** `server/demand.js` — time/day/zone multipliers (replaceable)
- **Profit engine:** `server/profitability.js`
- **Port:** 3002 (default)

---

## Project layout

```
website-builder/   (repo: jarvis-ai-job-finder)
├── CLAUDE.md
├── README.md
├── .env.example
├── package.json
├── server/
│   ├── index.js
│   ├── config.js       ← home, costs, base rates
│   ├── geo.js
│   ├── zones.js        ← Doncaster, Nottingham, Lincoln, etc.
│   ├── demand.js       ← surge/demand model (MVP)
│   ├── profitability.js
│   ├── scheduler.js
│   └── routes/schedule.js
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```

---

## API

| Route | Purpose |
|-------|---------|
| `GET /api/schedule` | 7-day plan with recommendations + hourly profiles |
| `GET /api/health` | Health check |
| `GET /` | Calendar UI |

---

## Cost & profit formula

For each candidate shift:

- **Gross** = Σ hourly gross (rides + eats demand model)
- **Fuel** = working miles + round-trip deadhead miles × £0.13/mi
- **Commission** = gross × 25%
- **Insurance** = (shift hours + travel hours) × £3/hr
- **Net** = gross − fuel − commission − insurance
- **Net £/hr** = net ÷ (shift hours + round-trip travel hours)

---

## Important limitations

- **No live Uber API** — projections are modelled; label clearly in UI
- **Insurance £/hr** is a placeholder — user should set real policy cost
- **Base rates** (`BASE_RIDES_GBP_HR`, `BASE_EATS_GBP_HR`) should be calibrated from driver's actual earnings over time

---

## Development conventions

- Keep scope minimal; vanilla JS + Express unless user asks for frameworks
- Never commit `.env`
- Only commit when the user asks
- Read this file first each session

---

## Git workflow

```powershell
cd "C:\Users\user\Desktop\website-builder"
git add .
git commit -m "Describe your change"
git push
```

Remote: `origin` → `https://github.com/johnhall19871-svg/jarvis-ai-job-finder.git` (branch: `master`)

---

## Related project

Company Metrics Compare: `C:\Users\user\Desktop\claude code test` — separate repo, do not mix.
