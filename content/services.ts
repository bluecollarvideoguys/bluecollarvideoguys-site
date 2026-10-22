/**
 * Individual service pages at /services/[slug]. The /services page stays the
 * hub with the Blueprint packages. Only state what we actually deliver.
 */

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  primaryKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  stage: "Build Trust" | "Stand Out" | "Win More Work";
  intro: string;
  why: string[];
  deliverables: { title: string; body: string }[];
  process: { title: string; body: string }[];
  whoFor: string;
  faqs: Faq[];
  relatedServices: string[];
  relatedIndustries: string[];
  updated: string;
};

const COMMON_PROCESS = [
  {
    title: "Discovery call",
    body: "A free 30 minute call to walk through your business, your current marketing, and the work you want more of.",
  },
  {
    title: "Blueprint and plan",
    body: "We map which trust tools fit your shop and goals, then plan the shot list, pages, or content calendar around your schedule.",
  },
  {
    title: "Production",
    body: "We show up, do the work, and stay out of your crew's way. You review drafts before anything goes live.",
  },
  {
    title: "Launch and put it to work",
    body: "Finished work goes onto your website, Google Business Profile, social channels, and ads so it keeps earning trust after delivery.",
  },
];

export const SERVICES: Service[] = [
  {
    slug: "video-production",
    name: "Contractor Video Production",
    primaryKeyword: "contractor video production",
    title: "Contractor Video Production | Blue Collar Video Guys",
    metaDescription:
      "Brand story films, project videos, testimonials, and crew videos for contractors in Redding and the North State. Real footage of your real work. Book a call.",
    h1: "Contractor Video Production That Builds Trust Before the Call",
    stage: "Build Trust",
    intro:
      "We make brand films, project videos, customer testimonials, and crew videos for contractors and trades businesses. Every video is shot on your job sites with your people, so customers see exactly who they are hiring.",
    why: [
      "By the time a customer calls, they have usually checked your website, your reviews, and your photos, and decided whether they trust you. Video answers the questions they are quietly asking: who are these people, do they know what they are doing, and do they care about quality.",
      "Stock footage and generic ads make every contractor look the same. Real footage of your crew, your process, and your finished work is something no competitor can copy, and it keeps working on your website, your Google Business Profile, social media, and ads for years.",
    ],
    deliverables: [
      { title: "Brand story film", body: "Who you are, how you started, and why you do the work the way you do. The anchor video for your homepage." },
      { title: "Project films", body: "Cinematic walkthroughs of real jobs from start to finish, so customers can see the quality before they hire." },
      { title: "Customer testimonials", body: "Real customers on camera describing the job in their own words. The strongest proof you can put online." },
      { title: "Meet the crew videos", body: "Short intros that put faces to the names customers will meet on the job site." },
      { title: "Educational videos", body: "Answers to the questions customers ask on every estimate, filmed once and used forever." },
      { title: "Social cutdowns", body: "Vertical reels and short clips cut from every shoot for Facebook, Instagram, YouTube, and ads." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Established trades businesses with a crew, a track record, and work worth showing. If your reputation is better than your marketing, video closes that gap.",
    faqs: [
      { q: "How much does a contractor marketing video cost?", a: "It depends on how many videos, how many shoot days, and whether you want ongoing content. Our Blueprint packages run 3, 6, or 12 months and bundle video with photos and strategy. We give you a clear quote after the discovery call." },
      { q: "How long does a shoot take?", a: "Most shoots take half a day to a full day on site. We plan the shot list ahead of time so we film around your schedule and keep your crew working." },
      { q: "Do I have to be on camera?", a: "No. We can build the story around your crew, your customers, and your finished work. Anyone who does step in front of the camera gets coached so it feels natural." },
      { q: "Who owns the footage?", a: "You get the finished videos to use on your website, social media, and ads. We confirm the details of usage and raw footage in your agreement before we start." },
      { q: "How soon will I see the finished videos?", a: "Turnaround depends on the size of the project. We set the delivery dates with you during planning so you know exactly when to expect drafts." },
    ],
    relatedServices: ["photography", "website-design", "social-media"],
    relatedIndustries: ["roofing", "hvac", "general-contractors"],
    updated: "2026-10-21",
  },
  {
    slug: "photography",
    name: "Construction Photography",
    primaryKeyword: "construction photography",
    title: "Construction Photography | Blue Collar Video Guys",
    metaDescription:
      "Job site, crew, and finished project photography for contractors in Redding and the North State. Replace stock photos with your real work. Book a free call.",
    h1: "Construction Photography for Contractors and Trades",
    stage: "Stand Out",
    intro:
      "We photograph your crews, your job sites, and your finished projects so your website, Google Business Profile, and social media show real work instead of stock photos.",
    why: [
      "Customers can spot stock photos instantly, and they quietly wonder why a contractor would not show their own work. Professional photos of your actual projects and people fix that and make every page and post more believable.",
      "Good photos also do a lot of quiet work for search. Fresh, original photos on your Google Business Profile and website help customers choose you, and descriptive file names and captions help search engines understand what you do and where.",
    ],
    deliverables: [
      { title: "Finished project photos", body: "Clean, well lit photos of completed work that show the quality up close and the scale from a distance." },
      { title: "Crew and team photos", body: "Group and individual photos that make your people recognizable and approachable." },
      { title: "Job site action photos", body: "Your crew at work: the gear, the process, and the care that goes into every job." },
      { title: "Before and after sets", body: "Matched angles that show the transformation, ideal for social posts and project pages." },
      { title: "Headshots", body: "Consistent headshots for owners, estimators, and office staff for your website and LinkedIn." },
      { title: "Fleet and shop photos", body: "Trucks, equipment, and your shop, so customers see a real, established operation." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Contractors whose website or Google Business Profile still relies on stock photos, phone snapshots, or nothing at all.",
    faqs: [
      { q: "Can photos and video be shot on the same day?", a: "Yes. Most of our shoot days include both, which saves your crew time and gives you a matching set of photos and video." },
      { q: "How many photos will I get?", a: "It depends on the package. Our Foundation Blueprint, for example, includes 15 branding photos alongside the video work. We confirm the count before the shoot." },
      { q: "Will the photos be ready for my Google Business Profile?", a: "Yes. We deliver web ready files and can help you upload them with useful descriptions so they work for local search." },
      { q: "Do you photograph projects that are already finished?", a: "Yes. Finished projects are some of the best subjects. We just need permission from the property owner to access and photograph the site." },
    ],
    relatedServices: ["video-production", "website-design", "seo"],
    relatedIndustries: ["general-contractors", "concrete-excavation", "landscaping"],
    updated: "2026-10-21",
  },
  {
    slug: "website-design",
    name: "Contractor Website Design",
    primaryKeyword: "contractor website design",
    title: "Contractor Website Design | Blue Collar Video Guys",
    metaDescription:
      "Contractor website design built around real proof: your videos, photos, and reviews, with clear calls and fast load times. Serving Redding and the North State.",
    h1: "Contractor Website Design That Turns Visitors Into Calls",
    stage: "Stand Out",
    intro:
      "We design and build websites for contractors that look as solid as their work, load fast on a phone, and make it easy for a customer to call or book. Your real videos, photos, and reviews do the selling.",
    why: [
      "Your website is often the first job site a customer walks onto. If it is slow, outdated, or full of stock photos, many people leave before they ever see how good your work is.",
      "A good contractor website answers the big questions fast: what you do, where you work, why you are trustworthy, and how to reach you. It is also the foundation for SEO and ads, because every search result and every ad has to land somewhere that earns the call.",
    ],
    deliverables: [
      { title: "Custom design", body: "A site built around your brand and your work, not a template that looks like every other contractor." },
      { title: "Service and area pages", body: "Pages for each service and the towns you work in, written so customers and search engines know exactly what you do and where." },
      { title: "Proof built in", body: "Your videos, project photos, and reviews placed where they matter most on every page." },
      { title: "Easy calls and bookings", body: "Click to call buttons, short forms, and booking links that work on any phone." },
      { title: "Fast and mobile first", body: "Built to load quickly on a phone, which customers and Google both expect." },
      { title: "SEO foundation", body: "Clean structure, page titles, local business schema, and a sitemap set up from day one." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Contractors with an outdated site, a site that does not bring in calls, or no website at all while competitors are getting found online.",
    faqs: [
      { q: "How long does a contractor website take to build?", a: "Most sites take several weeks from kickoff to launch, depending on the number of pages and how quickly content and photos come together. We set the timeline with you up front." },
      { q: "Can you use my existing domain?", a: "Yes. We build on your current domain and set up redirects from old pages so you keep any search visibility you already have." },
      { q: "Will I be able to update the site?", a: "Yes. We walk you through making simple updates, and we can handle changes for you as part of an ongoing package." },
      { q: "Do you write the website copy?", a: "Yes. We write it with you, in plain language that sounds like your business, based on what your customers actually ask." },
    ],
    relatedServices: ["seo", "video-production", "ads"],
    relatedIndustries: ["plumbing", "electrical", "hvac"],
    updated: "2026-10-21",
  },
  {
    slug: "seo",
    name: "SEO for Contractors",
    primaryKeyword: "SEO for contractors",
    title: "Local SEO for Contractors | Blue Collar Video Guys",
    metaDescription:
      "Local SEO for contractors in Redding and the North State: Google Business Profile, reviews, service and city pages, and content that gets you found. Book a call.",
    h1: "Local SEO for Contractors Who Want to Get Found",
    stage: "Win More Work",
    intro:
      "We help contractors show up when local customers search for their trade, on Google Maps, in regular search results, and in AI answers. That means a strong Google Business Profile, steady reviews, the right pages on your site, and proof that search engines can see.",
    why: [
      "When someone searches for a roofer, plumber, or HVAC company near them, the map results and the first few listings get most of the calls. If you are not there, the customer never learns how good you are.",
      "Search in 2026 rewards real local businesses with real proof. Original photos and video, detailed reviews that mention your services and towns, and pages that answer customer questions clearly are exactly what video and photography produce, which is why we pair SEO with the rest of the Blueprint.",
    ],
    deliverables: [
      { title: "Google Business Profile setup", body: "Categories, services, photos, videos, and weekly posts so your profile works as hard as your crew." },
      { title: "Review system", body: "A simple way to ask every happy customer for a review, plus reply templates that sound like you." },
      { title: "Service and city pages", body: "A page for each service and each town you serve, written for the way customers search." },
      { title: "Technical SEO", body: "Page titles, structured data, sitemap, speed, and mobile fixes so search engines can read your site." },
      { title: "Listings and citations", body: "Consistent name, phone, and website across Bing, Apple Maps, Yelp, and local directories." },
      { title: "Monthly reporting", body: "Plain English reports on calls, form leads, rankings, and what we are doing next." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Contractors who want more calls from Google without paying for every click, and who are willing to show their work.",
    faqs: [
      { q: "How long does SEO take for a contractor?", a: "Map results and long tail searches can improve within a few weeks of fixing your Google Business Profile and pages. Competitive terms usually take several months of steady work. We track progress monthly so you can see it." },
      { q: "Can you guarantee a number one ranking?", a: "No one honest can guarantee rankings, because Google controls them. What we can promise is the work that earns them: a complete profile, steady reviews, strong pages, and real proof." },
      { q: "Do you help with Google reviews?", a: "Yes. We set up a simple review request system and show you how to ask at the right moment. We never write or buy reviews." },
      { q: "Does SEO work with Google Ads?", a: "Yes, they work best together. Ads bring calls right away while SEO builds, and ad data shows which searches turn into jobs." },
    ],
    relatedServices: ["website-design", "photography", "ads"],
    relatedIndustries: ["roofing", "plumbing", "landscaping"],
    updated: "2026-10-21",
  },
  {
    slug: "social-media",
    name: "Social Media for Contractors",
    primaryKeyword: "social media for contractors",
    title: "Social Media for Contractors | Blue Collar Video Guys",
    metaDescription:
      "Social media management for contractors: reels, job site photos, and crew stories posted on a steady schedule. Stay top of mind without living on your phone.",
    h1: "Social Media for Contractors That Shows Up Like Clockwork",
    stage: "Stand Out",
    intro:
      "We plan, produce, and post social content for contractors on a steady schedule: reels, job site photos, crew stories, and finished projects. Your customers stay reminded of who you are, and you stay on the job.",
    why: [
      "Social media only works when it is consistent, and that is the hard part for a busy contractor. A few posts in a slow month followed by nothing for half a year does not build trust.",
      "Because we film your crew and projects anyway, we can turn each shoot into weeks of content. Real people doing real work outperforms generic tips and stock graphics, and it doubles as recruiting content when you are hiring.",
    ],
    deliverables: [
      { title: "Monthly content plan", body: "A calendar built around your season, your projects, and the work you want more of." },
      { title: "Short form video", body: "Reels and shorts cut from every shoot, captioned and formatted for each platform." },
      { title: "Photo posts", body: "Finished projects, before and afters, and crew moments that keep your feed real." },
      { title: "Posting and scheduling", body: "We post on Facebook and Instagram, and share to your Google Business Profile." },
      { title: "Recruiting content", body: "Culture and crew posts that help you attract good techs when you need them." },
      { title: "Monthly check in", body: "A quick look at what landed and what to film next." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Contractors who know they should post but never have time, and who want their feed to look like the quality of their work.",
    faqs: [
      { q: "Which platforms should a contractor be on?", a: "For most trades businesses, Facebook, Instagram, and your Google Business Profile matter most, with YouTube for longer videos. We focus where your customers actually are." },
      { q: "How often will you post?", a: "We set a schedule you can sustain, usually several posts a week, built from the footage and photos we capture during shoots." },
      { q: "Do you reply to comments and messages?", a: "We can monitor and flag messages so leads never sit unanswered. Replies to customer questions usually come best from you, and we help set that up." },
      { q: "Does social media actually bring in jobs?", a: "Social rarely works alone. It keeps you top of mind and backs up your reputation when someone checks you out after a referral, a search, or an ad." },
    ],
    relatedServices: ["video-production", "photography", "ads"],
    relatedIndustries: ["hvac", "electrical", "landscaping"],
    updated: "2026-10-21",
  },
  {
    slug: "ads",
    name: "Google and Facebook Ads for Contractors",
    primaryKeyword: "Google and Facebook ads for contractors",
    title: "Google and Facebook Ads for Contractors | BCVG",
    metaDescription:
      "Google Ads and Facebook ads for contractors, built on real video and testimonials and tracked to calls and booked jobs. Serving Redding and the North State.",
    h1: "Google and Facebook Ads for Contractors",
    stage: "Win More Work",
    intro:
      "We run Google Ads and Facebook and Instagram ads for contractors, using your real videos, photos, and testimonials as the creative. Every campaign is tracked to calls, form leads, and booked appointments, not just clicks.",
    why: [
      "Ads can put you in front of the right customers today, but they only pay off when the person who clicks already sees a reason to trust you. Generic ads that land on a weak website burn budget fast.",
      "Our ads lead with proof: a short cut of a real project or a customer testimonial, then a landing page built to turn that interest into a call. Because we track every lead back to its source, you can see what each campaign actually brings in.",
    ],
    deliverables: [
      { title: "Google search campaigns", body: "Ads for the searches people make when they are ready to hire, in the towns you serve." },
      { title: "Facebook and Instagram ads", body: "Video ads built from your real work, aimed at homeowners and businesses in your area." },
      { title: "Landing pages", body: "Fast, focused pages that match each ad and make it easy to call or book." },
      { title: "Conversion tracking", body: "Calls, forms, and bookings tracked back to each campaign and keyword." },
      { title: "Retargeting", body: "Testimonial ads that follow up with people who visited your site but did not call yet." },
      { title: "Monthly optimization", body: "Budget, keywords, and creative adjusted every month based on real lead data." },
    ],
    process: COMMON_PROCESS,
    whoFor:
      "Contractors who want more leads now, have the capacity to take on work, and want to know exactly what their ad spend returns.",
    faqs: [
      { q: "Is ad spend included in your packages?", a: "No. Ad spend is paid directly to Google or Meta and is separate from our management fee, so you always see exactly what goes to the platforms." },
      { q: "How much should a contractor spend on ads?", a: "It depends on your trade, your towns, and how competitive the searches are. We look at real cost per click data for your market before recommending a starting budget." },
      { q: "Google Ads or Facebook ads?", a: "Google catches people actively searching for your service. Facebook and Instagram reach people before they search and are great for video. Most contractors do best with both, weighted to their goals." },
      { q: "How soon will ads bring in leads?", a: "Search ads can bring calls within days of launch. Expect a few weeks of learning while we refine keywords, audiences, and creative." },
    ],
    relatedServices: ["website-design", "video-production", "seo"],
    relatedIndustries: ["roofing", "hvac", "plumbing"],
    updated: "2026-10-21",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
