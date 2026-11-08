# Blue Collar Video Guys: Strategy Call Funnel Pages (Cursor spec)

Build three new pages on the existing Next.js site (bluecollarvideoguys.com). Match the current site's brand: same fonts, colors, logo, and GSAP motion style, but keep these pages simpler and faster than the homepage. These are paid-ad landing pages, so speed and one clear action matter more than effects.

## Pages and routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/strategy-call` | Landing page | Sells the offer. Every button opens the popup form. |
| `/book` | Booking page | Shows the GoHighLevel calendar so they pick a time. |
| `/booked` | Thank-you page | Confirms the booking and reduces no-shows. |

Rules for all three pages:
- No main navigation menu and no footer links except Privacy Policy and Terms. The only way forward is the call to action.
- Add `<meta name="robots" content="noindex, nofollow">` to all three so they don't compete with the homepage in search.
- Keep `/strategy-call`, `/book`, and `/booked` out of `sitemap.xml`. Do not add them to `robots.txt` Disallow. Google has to crawl them to see the noindex tag.
- Do not link to these three routes from the main navigation or footer of the rest of the site. Area and industry pages are the exception: each `/areas/*` and `/industries/*` page has a "Book a Free Strategy Call" button to `https://www.bluecollarvideoguys.com/book`.
- Titles: `/strategy-call` is "Free Video Strategy Call for Contractors | Blue Collar Video Guys", `/book` is "Pick Your Call Time | Blue Collar Video Guys", `/booked` is "You're Booked | Blue Collar Video Guys".
- Use `https://www.bluecollarvideoguys.com` for every absolute URL so redirects never drop UTM parameters.
- Mobile first. Most ad traffic is phones. Buttons at least 48px tall, full width on mobile.
- Keep any UTM parameters in the URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, `gclid`) when moving from `/strategy-call` to `/book`.
- The GoHighLevel external tracking script that is already on the site must load on all three pages.
- Put every video URL, form ID, and calendar ID in one config file (for example `lib/funnel-config.ts`) so they're easy to swap later.

## Config values

```ts
export const funnelConfig = {
  popupFormId: "LeSafpjBGshdr1H94oyB",          // GHL "BCVG Popup Form"
  calendarId: "XsWGjZKCObXLVh3K5mU9",           // GHL "Free Video Strategy Call"
  calendarUrl: "https://api.leadconnectorhq.com/widget/booking/XsWGjZKCObXLVh3K5mU9",
  videos: {
    heroLoop: "FILLER_VIDEO_URL",        // short muted loop of job site footage
    brandMessage: "FILLER_VIDEO_URL",    // 60 to 90 sec, who we are
    testimonial: "FILLER_VIDEO_URL",     // 30 to 60 sec, client result + guarantee
    thankYou: "FILLER_VIDEO_URL",        // 30 to 60 sec, Kathy explaining the call
  },
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,     // add later
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID,     // add later
  googleAdsConversion: process.env.NEXT_PUBLIC_GADS_CONVERSION, // add later, format AW-XXXX/YYYY
};
```

## Popup form (used on `/strategy-call`)

- Every call-to-action button on the landing page opens a modal containing the GoHighLevel form `BCVG Popup Form` (ID above).
- Embed it the same way the existing contact form on the homepage is embedded (GHL iframe plus `https://link.msgsndr.com/js/form_embed.js`), just with the new form ID. Load the iframe only when the modal opens.
- Modal heading above the form: **Let's find you a time**
- Small line under the form: **We'll never spam you or sell your info.**
- The form itself (first name, phone, email, consent checkboxes, "Next: Pick My Time" button) is built in GoHighLevel. Don't rebuild the fields in code.
- After submit, GoHighLevel will redirect to `/book`. Kathy will set that redirect in GoHighLevel once the page is live.
- **Test after deploying:** submit the form and confirm the whole browser tab goes to `/book`, not just the inside of the modal. If it only redirects inside the modal, report back so we can switch approaches.

## Page 1: `/strategy-call` (landing page)

Sections in this order. Copy is final except for anything in [brackets]. The wording matches the main site (The Blue Collar Blueprint™ and the Trust Framework™) so it feels like one brand.

**Section 1. Hero**
- Eyebrow: For contractors in Redding, Red Bluff, Anderson, Corning, and the towns in between
- Headline: People decide who to hire before they ever call. Make sure it's you.
- Subhead: The Blue Collar Blueprint™ builds trust before the phone rings, with cinematic video, real customer testimonials, and marketing that brings in the right jobs. 10 years of experience. Built only for the trades.
- Button: Book My Free Strategy Call (opens popup)
- Under button, small: Book this month and get a bonus client testimonial video, free. Free 20 minute call.
- Background or side visual: `videos.heroLoop`, muted, autoplay, loop, playsinline, with a poster image so it never shows a blank box.

**Section 2. The problem**
- Heading: People don't hire the cheapest contractor. They hire the one they trust.
- Body: By the time a homeowner picks up the phone, they've already looked you up. They've checked your site, your reviews, and your photos, and quietly decided whether you're the shop they trust. If the answer isn't yes before the call, the phone never rings.

**Section 3. Proof**
- Heading: We don't sell videos. We build trust.
- Body: We've spent 10 years telling stories on camera, and we work only with the trades: electricians, plumbers, HVAC, roofers, concrete crews, and more across Northern California and Southern Oregon. We know job sites, and we know what makes a homeowner trust you.
- Embed `videos.brandMessage` here (click to play, with sound, poster image).
- Slot for 2 to 3 client clips or stills with names and towns. Hide this slot entirely when the list is empty. Do not show placeholder testimonials.

**Section 4. How it works: the Trust Framework™** (three numbered columns, stacked on mobile)
- Heading: Three stages. One promise.
- 01 Build Trust: Brand story films, customer testimonials, and meet-the-crew videos that answer every question a customer already has.
- 02 Stand Out: Cinematic project videos, professional photography, and a site that looks as solid as your work.
- 03 Win More Work: Better leads, bigger projects, and marketing that stops you from competing on price.
- Line under the columns: You run your jobs. We plan the shoot, build the shot list, and handle the rest. You just show up and do what you do best.

**Section 5. What's included**
- Heading: Start with the Foundation. Grow from there.
- Main card, Foundation, 3 months: "Build your credibility." A list where each line shows the item on the left and its value on the right, then a total. Store items and values in the config so they're easy to edit:
  - Trust strategy and 3 strategy sessions ([value])
  - Brand message video ([value])
  - Promotional video ([value])
  - 3 testimonial videos ([value])
  - 15 branding photos ([value])
  - 10 social reels ([value])
  - Pre production guide, checklist, and shot list planning ([value])
  - Bonus when you book this month: an extra client testimonial video ([value]), visually highlighted as a bonus
  - Total value: [total]
- Two smaller cards beside or below it:
  - Structure, 6 months, "Most popular" badge: Turn your content into a growth system. Adds a website, CRM, sales funnels, ad management, and social media management.
  - Turnkey, 12 months: Your complete outsourced video marketing department.
- Under the cards: Your investment depends on your business and goals. We'll go over it on the call. Ad spend is not included.
- Never show package prices anywhere on these pages. Prices are only shared on the call.
- The per-item values in the Foundation list are optional. Add a config switch `showStackValues` (default true). When it's off, show the list without values or a total.

**Section 6. Testimonial and guarantee**
- Embed `videos.testimonial` (click to play).
- Heading: The Content Guarantee
- Body: We capture everything we need to deliver every video in your package. If we're ever short on footage, we come back and shoot again at no extra cost. No wasted days, no half-finished videos.
- Style it like a badge or seal so it stands out from the sections around it.

**Section 7. Scarcity and call to action**
- Heading: We only take on [3] new clients a month
- Body: Every shoot gets our full crew, so we cap how many new Blueprint clients we take each month. Book your strategy call this month and get a bonus client testimonial video added to any package, free. That's one more customer on camera telling homeowners why they hired you.
- Store the monthly client limit and the bonus text in the config so Kathy can change them. Add a config switch to turn the bonus off; when it's off, hide every bonus mention on the page (hero line, stack line, and this section's bonus sentence).
- Button: Book My Free Strategy Call (opens popup)
- Under button, small: Free 20 minute call by phone. No pressure, no obligation.

**Section 8. FAQ** (accordion)
- Is the call really free? Yes. 20 minutes, no obligation.
- Who is this for? Established trades businesses with quality work and a strong reputation that want more of the right jobs.
- What packages do you offer? Foundation (3 months), Structure (6 months), and Turnkey (12 months). We'll help you pick the right one on the call.
- Is ad spend included? No. Ad management is included in Structure and Turnkey, but ad spend is paid separately.
- Will filming slow down my crew? No. We plan everything ahead and shoot around your work.
- Do I have to be on camera? Not if you don't want to. Your crew and your work can carry it.
- What if a shoot doesn't get enough footage? We come back and shoot again at no extra cost. That's our Content Guarantee.
- What areas do you serve? Southern Oregon and Northern California, from Medford to Sacramento.

**Sticky mobile bar:** on screens under 768px, after the visitor scrolls past the hero, show a bar fixed to the bottom with the button "Book My Free Strategy Call" (opens popup).

**Footer:** Blue Collar Video Guys · build@bluecollarvideoguys.com · (530) 338-3391 · Privacy Policy · Terms

## Page 2: `/book` (booking page)

- Small progress indicator at top: Step 2 of 2
- Headline: Almost done. Pick a time for your call.
- Subhead: 20 minutes by phone. We'll call you at the number you entered.
- Embed the GoHighLevel calendar (`calendarUrl`) in an iframe, full width, min-height 800px on mobile, with `https://link.msgsndr.com/js/form_embed.js` loaded so it resizes.
- **Prefill:** if the page URL has `first_name`, `last_name`, `email`, or `phone` query parameters, pass them through to the calendar iframe `src` as query parameters so the visitor doesn't retype them. If they aren't there, load the calendar normally.
- Under the calendar, three short lines with check icons:
  - We'll look at how your business shows up online right now
  - We'll map which trust methods fit your business and goals
  - You'll leave with a rough Blueprint, whether or not we work together
- No other links.

## Page 3: `/booked` (thank-you page)

- Headline: You're booked. Talk soon.
- Subhead: Check your email. We just sent your call time and a link to reschedule if you need it.
- Embed `videos.thankYou` near the top (click to play, with sound).
- Three numbered steps:
  1. Add the call to your calendar (use the add-to-calendar link from the confirmation email; no button needed on this page)
  2. Save our number so you know it's us calling: (530) 338-3391
  3. Think about the one type of job you'd take every week if you could
- No links back to the main site.

## Tracking

Load these only when the env variable exists, so nothing breaks before the IDs are added.

| Event | Where it fires | Platforms |
| --- | --- | --- |
| PageView | All three pages | Meta Pixel, Google tag |
| Lead | `/book` page load | Meta Pixel (`Lead`), Google tag event `generate_lead` |
| Schedule | `/booked` page load | Meta Pixel (`Schedule`), Google Ads conversion (`googleAdsConversion`) |

- Use `next/script` with `afterInteractive` for the Pixel and Google tag.
- Fire each conversion event once per page load. Guard against React strict mode double firing.

## Done checklist

- [ ] All three routes deploy and load on mobile in under 3 seconds on 4G
- [ ] Every button on `/strategy-call` opens the popup form
- [ ] UTM parameters carry from `/strategy-call` to `/book`
- [ ] Calendar on `/book` loads and resizes correctly on mobile
- [ ] Pages are noindex and have no main menu
- [ ] Bracketed placeholders and filler video URLs are easy to find in the config file
- [ ] Send Kathy the live URLs for all three pages
