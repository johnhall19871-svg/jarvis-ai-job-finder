# Jarvis AI Job Finder

AI-assisted shift planner for **Uber** and **Uber Eats** drivers. Optimizes your 7-day schedule around net £/hr after fuel, commission, insurance, and travel from home.

**Home base:** DN22 0QG (Gamston, Nottinghamshire) · **Working radius:** 35 miles

## Quick start

```powershell
cd "C:\Users\user\Desktop\website-builder"
npm install
copy .env.example .env   # optional — tune cost assumptions
npm run dev
```

Open **http://localhost:3002**

## What Jarvis shows

- **7-day rolling calendar** with recommended shift (1–6 hours) per day
- **Best area** to drive (Doncaster, Nottingham, Lincoln, etc. within 35 mi)
- **Net £/hr bar chart** per hour (00–23), highlighting the recommended shift window
- **Cost breakdown:** fuel (13p/mi), Uber commission (25%), insurance (£3/hr default)

## Data note

Uber does **not** provide a public pricing/surge API. Phase 1 uses a **modelled demand engine** (meal rushes, weekend nightlife, city vs town). Live surge integration is planned for a future phase.

## Git workflow

```powershell
git add .
git commit -m "Describe your change"
git push
```
