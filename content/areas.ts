/**
 * Service area city pages. Home base is Redding; every launch city is within
 * about an hour. To add a city, add an object here: the page, sitemap entry,
 * and hub card are generated from it.
 *
 * Content rule: only state facts we can stand behind. Add real local jobs to
 * `localProof` as they happen; they are the strongest ranking signal a city
 * page can have.
 */

export type AreaFaq = { q: string; a: string };

export type Area = {
  slug: string;
  city: string;
  state: "CA";
  county: string;
  driveTime: string;
  primaryKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Why this market matters for trades businesses (2 to 3 sentences). */
  market: string;
  nearbyTowns: string[];
  /** Real jobs or clients in this area. Each: short description + optional /work link. */
  localProof: { text: string; href?: string }[];
  faqs: AreaFaq[];
  updated: string;
};

const TRADES_FAQ = (city: string): AreaFaq => ({
  q: `What kinds of contractors do you work with in ${city}?`,
  a: `We work with established trades businesses in and around ${city}: general contractors, roofers, HVAC, plumbers, electricians, concrete and excavation crews, landscapers, and specialty trades. If you have a crew and a reputation worth showing, we can help more people see it.`,
});

const ONCAMERA_FAQ: AreaFaq = {
  q: "Do I have to be on camera?",
  a: "No. Some owners love being on camera and some would rather not. We can build the story around your crew, your customers, and your finished work, and we coach anyone who does step in front of the lens so it feels natural.",
};

export const AREAS: Area[] = [
  {
    slug: "redding-ca",
    city: "Redding",
    state: "CA",
    county: "Shasta County",
    driveTime: "Home base",
    primaryKeyword: "video production Redding CA",
    title: "Video Production in Redding, CA | Blue Collar Video Guys",
    metaDescription:
      "Redding video production for contractors and trades businesses: brand films, testimonials, job site photos, websites, and SEO. Book a free Blueprint call.",
    h1: "Video Production in Redding, CA for Contractors",
    intro:
      "Redding is home base for The Blue Collar Video Guys. We make brand films, testimonial videos, job site photography, websites, and local SEO for the contractors and trades businesses that build and maintain Shasta County.",
    market:
      "Redding is the commercial hub of the North State, and its contractors serve homeowners, businesses, and public projects from Shasta Lake to Cottonwood. Years of wildfire rebuilding, new housing, and commercial growth mean homeowners have plenty of crews to choose from. The ones who get the call are the ones customers already trust before they dial.",
    nearbyTowns: ["Shasta Lake", "Anderson", "Palo Cedro", "Bella Vista", "Cottonwood", "Shasta", "Millville", "Whitmore"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Redding"),
      {
        q: "Are you actually based in Redding?",
        a: "Yes. Redding is our home base, so there is no travel day to schedule for Redding area shoots. We can usually be on your job site in the same week you are ready to film.",
      },
      {
        q: "How long does a typical shoot day take?",
        a: "Most brand and project shoots take half a day to a full day on site. We plan the shot list with you first so we film around your schedule and keep your crew working.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
  {
    slug: "anderson-ca",
    city: "Anderson",
    state: "CA",
    county: "Shasta County",
    driveTime: "About 15 minutes from Redding",
    primaryKeyword: "video production Anderson CA",
    title: "Video Production in Anderson, CA | Blue Collar Video Guys",
    metaDescription:
      "Video marketing for Anderson, CA contractors: brand films, crew videos, testimonials, photos, and websites. 15 minutes from our Redding base. Book a call.",
    h1: "Video Production in Anderson, CA for Contractors",
    intro:
      "Anderson sits just south of Redding along I-5, and it is one of the busiest places in Shasta County for trades shops, yards, and crews. We film the work Anderson contractors already do well and turn it into marketing that wins the next job.",
    market:
      "Many contractors who serve the whole south county, from Cottonwood to Palo Cedro, run their shops and yards out of Anderson. Their work speaks for itself on the job site, but online they often look like everyone else. Real footage of real crews is the fastest way to change that.",
    nearbyTowns: ["Cottonwood", "Happy Valley", "Olinda", "Centerville", "Redding", "Palo Cedro"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Anderson"),
      {
        q: "Do you charge to travel to Anderson?",
        a: "Anderson is about 15 minutes from our Redding base, so it is treated like a local shoot. We confirm any travel details on the discovery call before you commit to anything.",
      },
      {
        q: "Can you film at our shop and on an active job site the same day?",
        a: "Yes. A lot of our shoot days combine a shop or yard segment, crew interviews, and footage from one or two active jobs. We plan the route so nobody's day gets wasted.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
  {
    slug: "shasta-lake-ca",
    city: "Shasta Lake",
    state: "CA",
    county: "Shasta County",
    driveTime: "About 15 minutes from Redding",
    primaryKeyword: "video production Shasta Lake CA",
    title: "Video Production in Shasta Lake, CA | Blue Collar Video Guys",
    metaDescription:
      "Contractor video production in Shasta Lake, CA: brand films, project videos, testimonials, photography, and websites. Minutes from Redding. Book a free call.",
    h1: "Video Production in Shasta Lake, CA for Contractors",
    intro:
      "Shasta Lake is minutes north of Redding, and its contractors work everything from homes and shops in town to lake country properties and projects up the I-5 corridor. We help them show that work with cinematic video and photography that actually looks like the job.",
    market:
      "Lake and foothill properties bring steep lots, long driveways, and projects that are hard to explain in a quote. Video lets a customer see how your crew handles a difficult site before they ever ask for a bid, which is exactly the trust that wins bigger jobs.",
    nearbyTowns: ["Central Valley", "Summit City", "Project City", "Mountain Gate", "Lakehead", "Redding"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Shasta Lake"),
      {
        q: "Can you film projects on steep or remote lots?",
        a: "Yes. We plan access ahead of time and pack light enough to get to hillside and lakefront job sites. If there is a safety plan on site, our crew follows it like any other trade.",
      },
      {
        q: "Do you charge to travel to Shasta Lake?",
        a: "Shasta Lake is about 15 minutes from our Redding base, so it is treated like a local shoot. We confirm any travel details on the discovery call.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
  {
    slug: "red-bluff-ca",
    city: "Red Bluff",
    state: "CA",
    county: "Tehama County",
    driveTime: "About 35 minutes from Redding",
    primaryKeyword: "video production Red Bluff CA",
    title: "Video Production in Red Bluff, CA | Blue Collar Video Guys",
    metaDescription:
      "Red Bluff video production for contractors and trades: brand films, testimonials, crew and recruiting videos, photos, and websites. Book a free Blueprint call.",
    h1: "Video Production in Red Bluff, CA for Contractors",
    intro:
      "Red Bluff is the county seat of Tehama County and the center of trades work between Redding and Chico. We make video, photography, and websites for Red Bluff contractors who want the reputation they earned in person to show up online.",
    market:
      "Red Bluff contractors cover a huge area of homes, ranches, ag buildings, and commercial work up and down I-5. In a market where most customers still hire by word of mouth, the crew with real reviews, real footage, and a website that answers questions first is the one that gets called.",
    nearbyTowns: ["Gerber", "Los Molinos", "Proberta", "Cottonwood", "Manton", "Corning"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Red Bluff"),
      {
        q: "Do you charge to travel to Red Bluff?",
        a: "Red Bluff is about 35 minutes down I-5 from our Redding base. We plan travel into the shoot day and confirm any travel details on the discovery call.",
      },
      {
        q: "Can you film ranch, ag, and shop buildings, not just houses?",
        a: "Yes. Shops, barns, ag buildings, and commercial projects make great footage because the scale tells the story. We match the shot list to the kind of work you want more of.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
  {
    slug: "corning-ca",
    city: "Corning",
    state: "CA",
    county: "Tehama County",
    driveTime: "About 45 minutes from Redding",
    primaryKeyword: "video production Corning CA",
    title: "Video Production in Corning, CA | Blue Collar Video Guys",
    metaDescription:
      "Video marketing for Corning, CA contractors and ag service businesses: brand films, testimonials, photography, and websites. Book a free Blueprint call.",
    h1: "Video Production in Corning, CA for Contractors",
    intro:
      "Corning is the working heart of south Tehama County, where trades businesses serve farms, orchards, homes, and shops across the valley. We help Corning contractors turn the work they do every day into video and photos that bring in better jobs.",
    market:
      "Many Corning trades businesses straddle two worlds: residential customers in town and ag or commercial clients across the valley. Showing both kinds of work clearly, on video and on a site built to be found, helps each audience see you as the right crew for their job.",
    nearbyTowns: ["Gerber", "Richfield", "Kirkwood", "Orland", "Red Bluff", "Los Molinos"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Corning"),
      {
        q: "Do you charge to travel to Corning?",
        a: "Corning is about 45 minutes from our Redding base. We plan travel into the shoot day and confirm any travel details on the discovery call before you commit.",
      },
      {
        q: "Can one video speak to both homeowners and ag or commercial clients?",
        a: "Usually it works better as one shoot with a few different cuts. We film once and edit separate short videos for each audience, so every customer sees the work that matters to them.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
  {
    slug: "mount-shasta-ca",
    city: "Mount Shasta",
    state: "CA",
    county: "Siskiyou County",
    driveTime: "About an hour from Redding",
    primaryKeyword: "video production Mount Shasta CA",
    title: "Mount Shasta Video Production | Blue Collar Video Guys",
    metaDescription:
      "Mount Shasta video production for builders and trades: custom home films, testimonials, photography, and websites for South Siskiyou County. Book a call.",
    h1: "Video Production in Mount Shasta, CA for Builders and Contractors",
    intro:
      "Mount Shasta and South Siskiyou County are home to builders and trades who work in snow, steep terrain, and some of the most beautiful settings in California. We film that work and build the marketing that helps the right clients find it.",
    market:
      "Mountain building is its own craft. Custom homes, cabins, remodels, and second homes here often come from clients who live far away and hire based on what they see online. Cinematic video of your finished work and your process is how you earn that trust from a distance.",
    nearbyTowns: ["Weed", "Dunsmuir", "McCloud", "Lake Shastina", "Castella"],
    localProof: [],
    faqs: [
      TRADES_FAQ("Mount Shasta"),
      {
        q: "Do you travel to Mount Shasta and Siskiyou County?",
        a: "Yes. Mount Shasta is about an hour up I-5 from our Redding base. We plan the travel into the shoot day and confirm any travel details on the discovery call.",
      },
      {
        q: "Can you film in winter?",
        a: "Yes, and snow can make for some of the best footage. We plan around road conditions and short winter daylight, and we schedule exterior shots for the clearest windows.",
      },
      ONCAMERA_FAQ,
    ],
    updated: "2026-10-21",
  },
];

export function getArea(slug: string) {
  return AREAS.find((a) => a.slug === slug);
}

export const AREA_TRADES = [
  "General contractors",
  "Roofers",
  "HVAC",
  "Plumbers",
  "Electricians",
  "Concrete and excavation",
  "Landscapers",
  "Builders and remodelers",
];
