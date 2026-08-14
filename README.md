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
| `/v02` | Version 02 (active exploration / gold-navy) |
| `/services` | Job Sites / field reports |
| `/testimonials` | Toolbox + Sample cuts + Proof |
| `/master` | Frozen snapshot of Version 02 |
| `/v03` | Archive stack of former Versions 03–07 (element reference) |

Header nav switches between versions.

## Client assets still needed

Placeholder comments in `components/HomePage.tsx` mark spots for:

- Real job-site / crew hero video
- Real testimonials and case metrics
- Live phone number and contact details
- Optional project photography

## Deploy

Push to `main` — Vercel should pick up the GitHub repo automatically.
