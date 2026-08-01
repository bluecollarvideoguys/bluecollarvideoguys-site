# The Blue Collar Video Guys™

Brand site for The Blue Collar Video Guys — video, web, branding, and digital marketing for blue-collar trade businesses.

**Tagline:** Build Trust. Stand Out. Win More Work.

## Stack

- Next.js (App Router) + Tailwind CSS v4
- GSAP + ScrollTrigger (scroll-scrubbed hero video, horizontal Blueprint panels)
- Brand tokens in `app/globals.css` (`--denim`, `--concrete`, `--rust`, etc.)

## Versions

Design explorations live as separate routes:

| Route | Status |
|-------|--------|
| `/` → `/v01` | Version 01 (scroll-video / denim-rust) |
| `/v02` | Version 02 (construction-template / gold-navy) |
| `/v03` | Version 03 (ARCA dark / copper-red) |
| `/v04` | Version 04 (Matos dark / amber) |
| `/v05` | Version 05 (Fellwock + blueprint motifs) |
| `/v06` | Version 06 (Coronado editorial / emerald) |
| `/v07` | Version 07 (Northline dark / orange) |

Header nav switches between versions.

## Client assets still needed

Placeholder comments in `components/HomePage.tsx` mark spots for:

- Real job-site / crew hero video
- Real testimonials and case metrics
- Live phone number and contact details
- Optional project photography

## Deploy

Push to `main` — Vercel should pick up the GitHub repo automatically.
