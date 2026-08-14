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
| `/` → `/v01` | Version 01 (archived under Archive) |
| `/` | Home (active exploration / gold-navy) |
| `/services` | Job Sites / field reports |
| `/testimonials` | Manifesto + Toolbox + Proof |
| `/master` | Frozen snapshot of Version 02 (via Archive) |
| `/v03` | Archive: Version 01, Master, and former Versions 03–07 |

Header nav switches between versions.

## Client assets still needed

Placeholder comments in `components/HomePage.tsx` mark spots for:

- Real job-site / crew hero video
- Real testimonials and case metrics
- Live phone number and contact details
- Optional project photography

## Video hosting (Vercel Blob)

Portfolio MP4s should live on Vercel Blob (not YouTube), so playback stays on-site with no “up next” suggestions.

Unlisted public drop page: `/upload` (not in the site menu, `noindex`). Send
`https://www.bluecollarvideoguys.com/upload` privately. MP4 / MOV go to the
`bluecollarvideoguys-videos` Blob store.

## Deploy

Push to `main` — Vercel should pick up the GitHub repo automatically.
