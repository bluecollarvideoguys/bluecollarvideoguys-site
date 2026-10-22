/**
 * Trade pages at /industries/[slug]. Each must be genuinely specific to the
 * trade, not a find-and-replace of the trade name.
 */
import type { Faq } from "@/content/services";

export type Industry = {
  slug: string;
  trade: string;
  /** Plural noun for copy, for example "roofers". */
  people: string;
  primaryKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hesitations: { title: string; body: string }[];
  videos: { title: string; body: string }[];
  recruiting: string;
  faqs: Faq[];
  relatedServices: string[];
  updated: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "roofing",
    trade: "Roofing",
    people: "roofers",
    primaryKeyword: "roofing company marketing",
    title: "Roofing Company Marketing and Video | Blue Collar Video Guys",
    metaDescription:
      "Marketing and video for roofing companies in Redding and the North State: project films, testimonials, and local SEO that help homeowners trust you first.",
    h1: "Roofing Company Marketing That Wins the Bigger Jobs",
    intro:
      "A new roof is one of the biggest checks a homeowner will ever write, and they are nervous about who they hand it to. We help roofing companies prove they are the crew worth trusting, with real project films, testimonials, and marketing that gets you found.",
    hesitations: [
      { title: "Fear of storm chasers", body: "After every big storm, out of town crews knock on doors. Homeowners want proof you are local, established, and will be here for the warranty." },
      { title: "Big ticket anxiety", body: "When the estimate is five figures, customers compare carefully. The roofer who explains the work clearly and shows past jobs earns the signature." },
      { title: "Insurance confusion", body: "Many roof jobs involve claims, and homeowners want a roofer who can walk them through it without pressure." },
      { title: "Invisible work", body: "Nobody sees a roof up close. Video shows the tear off, the underlayment, and the details that justify your price." },
    ],
    videos: [
      { title: "Project time lapse and drone reveal", body: "Start to finish on a real job, ending with the finished roof from above." },
      { title: "What happens on install day", body: "Walk homeowners through the day, from tarps and cleanup to the final magnet sweep." },
      { title: "Homeowner testimonials", body: "Customers on their own driveway explaining why they chose you and how it went." },
      { title: "Inspection walkthrough", body: "Show what you look for on an inspection so customers understand the estimate." },
      { title: "Safety and crew film", body: "Your crew, your safety gear, and your standards, the opposite of a storm chaser." },
    ],
    recruiting:
      "Good roofers are hard to find and harder to keep. A short culture film that shows your crew, your safety standards, and how you treat people does more for hiring than another job post.",
    faqs: [
      { q: "What is the best marketing for a roofing company?", a: "A strong Google Business Profile with steady reviews, a website with real project photos and video, and testimonials from local homeowners. Ads work best on top of that foundation." },
      { q: "Can you film on a roof safely?", a: "We film from the ground, from ladders where appropriate, and from the air with drone footage where permitted, and we follow your crew's safety plan on every site." },
      { q: "How do roofing companies stand out from storm chasers online?", a: "Show that you are local and established: your crew, your shop, local job sites, and reviews from neighbors. Video makes that obvious in seconds." },
      { q: "Should a roofing company run Google Ads?", a: "Often yes, especially during storm season and for high value replacement searches. Ads perform far better when they land on pages with real proof." },
    ],
    relatedServices: ["video-production", "seo", "ads"],
    updated: "2026-10-21",
  },
  {
    slug: "hvac",
    trade: "HVAC",
    people: "HVAC companies",
    primaryKeyword: "HVAC marketing",
    title: "HVAC Marketing and Video Production | Blue Collar Video Guys",
    metaDescription:
      "HVAC marketing and video for heating and cooling companies in Redding and the North State: tech intros, testimonials, maintenance videos, and local SEO.",
    h1: "HVAC Marketing That Earns Trust Before the Service Call",
    intro:
      "HVAC customers often call in a hurry, when the AC quits in July or the heat goes out in January, and they pick whoever seems most trustworthy fast. We help heating and cooling companies win those moments with video, photos, and local search that show who will be walking into the home.",
    hesitations: [
      { title: "Upsell worries", body: "Many homeowners fear being pushed into a new system they do not need. Clear educational videos make your recommendations feel honest." },
      { title: "Who is coming to my house", body: "Customers want to know the tech before they open the door. Meet the tech videos answer that." },
      { title: "Emergency decisions", body: "When the system fails, people choose fast. A complete Google profile and real reviews put you at the top of that short list." },
      { title: "Financing and big replacements", body: "Replacement jobs need trust and patience. Explainer videos help customers understand options before your comfort advisor arrives." },
    ],
    videos: [
      { title: "Meet the tech intros", body: "Short videos of your techs so customers recognize who is coming." },
      { title: "Repair or replace explainer", body: "An honest walkthrough of how you decide, which builds trust on every estimate." },
      { title: "Maintenance plan video", body: "Show what a tune up actually includes so plans sell themselves." },
      { title: "Customer testimonials", body: "Local homeowners describing the comfort, the service, and the follow through." },
      { title: "Install day film", body: "A clean, careful system install from start to finish, perfect for replacement pages." },
    ],
    recruiting:
      "Experienced HVAC techs have their pick of employers. Video of your shop, your trucks, your training, and your team culture shows candidates why your company is worth joining.",
    faqs: [
      { q: "What marketing works best for HVAC companies?", a: "A complete Google Business Profile, steady reviews that mention specific services, a fast website with clear service pages, and video that introduces your techs and explains your work." },
      { q: "Can video help sell maintenance plans?", a: "Yes. Showing exactly what happens during a tune up makes the value easy to understand, on your website, in follow up texts, and on social media." },
      { q: "How do HVAC companies prepare for seasonal demand?", a: "Build content and reviews in the shoulder seasons so your profile and pages are strong before the rush. Ads can then scale up when demand spikes." },
      { q: "Do you film inside customers' homes?", a: "Only with the homeowner's permission. Many installs and testimonials are filmed with happy customers who are glad to help." },
    ],
    relatedServices: ["video-production", "social-media", "ads"],
    updated: "2026-10-21",
  },
  {
    slug: "plumbing",
    trade: "Plumbing",
    people: "plumbers",
    primaryKeyword: "plumber marketing",
    title: "Plumber Marketing and Video | Blue Collar Video Guys",
    metaDescription:
      "Plumber marketing and video for plumbing companies in Redding and the North State: crew intros, testimonials, clear pricing explainers, and local SEO.",
    h1: "Plumber Marketing That Builds Trust Before You Enter the Home",
    intro:
      "Letting a stranger into your home to fix a leak takes trust, and most people decide who to call in a few minutes on their phone. We help plumbing companies make that decision easy with real video, photos, and local search presence.",
    hesitations: [
      { title: "A stranger in my home", body: "Customers want to see the people before they open the door. Crew videos and photos make you familiar." },
      { title: "Surprise pricing", body: "Fear of a shock bill keeps people from calling. Explaining how you price jobs builds confidence." },
      { title: "Mess and damage", body: "Homeowners worry about water, mud, and torn up floors. Showing your cleanup standards matters." },
      { title: "Emergency pressure", body: "A burst pipe means a fast choice. Reviews and a complete Google profile put you on the short list." },
    ],
    videos: [
      { title: "Meet your plumber", body: "Short intros so customers know who is coming to the door." },
      { title: "How we price a job", body: "A straight explanation of your pricing that removes the biggest reason people hesitate." },
      { title: "Water heater and repipe films", body: "Real installs that show the care and cleanup on bigger jobs." },
      { title: "Customer testimonials", body: "Homeowners describing a stressful problem that you solved." },
      { title: "Quick tips", body: "Short how to clips, like finding the shutoff valve, that earn trust and shares." },
    ],
    recruiting:
      "Licensed plumbers and apprentices want a shop with good leadership and a future. A culture film shows candidates the kind of team they would join.",
    faqs: [
      { q: "What is the best way for plumbers to get more calls?", a: "Show up in Google Maps with a complete profile and steady reviews, then back it up with a website that shows your real crew and work. Ads help fill gaps in slow weeks." },
      { q: "Can video really help a plumbing company?", a: "Yes. People hire plumbers they trust, and a 30 second video of your team does more to build that trust than any slogan." },
      { q: "Should plumbers post on social media?", a: "Yes, consistently. Quick tips and job photos keep you top of mind so neighbors think of you first when something breaks." },
      { q: "Do you help with Google reviews?", a: "Yes. We set up a simple review request process so every happy customer gets an easy link at the right moment." },
    ],
    relatedServices: ["website-design", "seo", "video-production"],
    updated: "2026-10-21",
  },
  {
    slug: "electrical",
    trade: "Electrical",
    people: "electricians",
    primaryKeyword: "electrician marketing",
    title: "Electrician Marketing and Video | Blue Collar Video Guys",
    metaDescription:
      "Marketing and video for electricians and electrical contractors in Redding and the North State: project films, crew videos, testimonials, and local SEO.",
    h1: "Electrician Marketing That Shows the Quality Behind the Wall",
    intro:
      "Most electrical work ends up hidden behind drywall, so customers rarely see the craftsmanship they are paying for. We help electricians and electrical contractors show it with video and photos of clean installs, careful crews, and satisfied customers.",
    hesitations: [
      { title: "Safety concerns", body: "Electrical work is dangerous when done wrong. Customers want proof you are licensed, careful, and experienced." },
      { title: "Hidden work", body: "Clean panels and tidy runs are invisible once the walls close. Video and photos capture them before they disappear." },
      { title: "Bigger upgrades", body: "Panel upgrades, EV chargers, generators, and solar ties are big decisions that customers research first." },
      { title: "Commercial trust", body: "General contractors and property managers want a reliable electrical sub with a track record they can see." },
    ],
    videos: [
      { title: "Panel upgrade film", body: "Before and after of a real panel upgrade, explained in plain language." },
      { title: "EV charger and generator explainers", body: "Answer the questions customers ask before they book these growing services." },
      { title: "Commercial project reel", body: "Proof for GCs and property managers that your crew delivers on bigger jobs." },
      { title: "Crew and safety film", body: "Your standards, your gear, and your people on camera." },
      { title: "Customer testimonials", body: "Homeowners and business owners describing the job and the professionalism." },
    ],
    recruiting:
      "Journeyman electricians and apprentices are in demand. Video of your culture, training, and the projects your team works on helps you hire the people you want.",
    faqs: [
      { q: "How do electricians get more residential leads?", a: "A complete Google Business Profile, reviews that mention specific jobs, service pages for things like panel upgrades and EV chargers, and video that shows your work." },
      { q: "Can marketing help win commercial electrical work?", a: "Yes. A project reel and case studies give general contractors and property managers proof before they invite you to bid." },
      { q: "Do you film in occupied buildings and businesses?", a: "Yes, with permission. We work around business hours and safety requirements so we never slow down the job." },
      { q: "What should an electrician's website include?", a: "Clear service pages, the towns you serve, license information, real project photos, reviews, and an easy way to call or book." },
    ],
    relatedServices: ["photography", "website-design", "seo"],
    updated: "2026-10-21",
  },
  {
    slug: "concrete-excavation",
    trade: "Concrete and Excavation",
    people: "concrete and excavation contractors",
    primaryKeyword: "concrete contractor marketing",
    title: "Concrete and Excavation Contractor Marketing | BCVG",
    metaDescription:
      "Marketing and video for concrete and excavation contractors in Redding and the North State: drone project films, photos, and SEO that show scale and skill.",
    h1: "Concrete and Excavation Contractor Marketing Built on Real Footage",
    intro:
      "Concrete and dirt work is some of the most visual work in the trades, from the first cut of an excavator to the final broom finish. We capture it with cinematic and aerial footage that shows customers and general contractors the scale and skill behind every pour.",
    hesitations: [
      { title: "It has to be right the first time", body: "Concrete is permanent. Customers want proof you prep, form, and finish correctly." },
      { title: "Scale and capability", body: "Developers and GCs want to see that your crew and equipment can handle their size of job." },
      { title: "Site and drainage worries", body: "Grading and drainage problems are expensive. Showing your process builds confidence." },
      { title: "Hard to compare bids", body: "When bids look similar on paper, proof of quality decides who gets the work." },
    ],
    videos: [
      { title: "Aerial project films", body: "Drone footage of site work and pours that shows the scale nothing else can." },
      { title: "Pour day time lapse", body: "From forms to finish in a minute, a favorite on social media." },
      { title: "Equipment and fleet reel", body: "Show the capacity to take on bigger projects." },
      { title: "GC and developer testimonials", body: "Proof from the people who hire subs for a living." },
      { title: "Decorative and finish close ups", body: "Stamped, colored, and polished work up close, where the craft shows." },
    ],
    recruiting:
      "Operators and finishers want steady work and a crew they respect. Video of your equipment, projects, and culture helps you hire experienced hands.",
    faqs: [
      { q: "How do concrete contractors get more commercial work?", a: "Build a project portfolio with photos, aerial video, and testimonials from GCs and developers, and make it easy to find on your website and LinkedIn." },
      { q: "Do you use drones for job site footage?", a: "Aerial footage is one of the best ways to show site work. We plan drone shots around site rules, airspace, and safety requirements." },
      { q: "Is video worth it for residential flatwork?", a: "Yes. Driveway, patio, and decorative concrete jobs look great on camera, and homeowners love seeing the transformation before they hire." },
      { q: "Can you document a long project in phases?", a: "Yes. We can visit at key milestones like excavation, forming, the pour, and the finish, then cut it into one project film." },
    ],
    relatedServices: ["video-production", "photography", "website-design"],
    updated: "2026-10-21",
  },
  {
    slug: "landscaping",
    trade: "Landscaping",
    people: "landscapers",
    primaryKeyword: "landscaping company marketing",
    title: "Landscaping Marketing and Video | Blue Collar Video Guys",
    metaDescription:
      "Marketing and video for landscaping and hardscape companies in Redding and the North State: transformation films, photos, social content, and local SEO.",
    h1: "Landscaping Company Marketing That Shows the Transformation",
    intro:
      "Few trades have a better before and after than landscaping. We help landscape and hardscape companies capture that transformation on video and in photos, then put it to work on their website, social media, and Google profile.",
    hesitations: [
      { title: "Imagining the result", body: "Customers struggle to picture a finished yard from a drawing. Real transformations show what is possible." },
      { title: "Reliability", body: "People worry about crews who start a job and disappear. Process and crew videos show you finish what you start." },
      { title: "Value of design", body: "Design and hardscape cost more than mowing. Video explains why the investment lasts." },
      { title: "Climate fit", body: "Local customers want plants and irrigation that survive North State summers. Showing local expertise matters." },
    ],
    videos: [
      { title: "Before and after transformations", body: "The single most effective landscaping video, perfect for every platform." },
      { title: "Hardscape build films", body: "Patios, walls, and outdoor kitchens from excavation to finish." },
      { title: "Design walkthroughs", body: "Explain how you plan a yard so customers see the thinking behind the price." },
      { title: "Seasonal tips", body: "Short local tips that keep you top of mind all year." },
      { title: "Customer testimonials", body: "Homeowners showing off the yard you built." },
    ],
    recruiting:
      "Landscaping crews grow every spring. Culture and crew content helps you hire reliable people before the busy season starts.",
    faqs: [
      { q: "What marketing works best for landscaping companies?", a: "Before and after photos and video, a Google Business Profile packed with project photos, and consistent social posts. Those show the result customers are buying." },
      { q: "When should landscapers film their projects?", a: "Plan the before shots before work starts, capture key build stages, and come back once plants have filled in for the best finished footage." },
      { q: "Is social media worth it for landscapers?", a: "Yes. Landscaping transformations are some of the most shared home content online, and they keep you top of mind for the next project." },
      { q: "Can you help with hardscape and design build marketing?", a: "Yes. Higher ticket design build work benefits most from video, because it explains the process and justifies the investment." },
    ],
    relatedServices: ["social-media", "photography", "seo"],
    updated: "2026-10-21",
  },
  {
    slug: "general-contractors",
    trade: "General Contractors",
    people: "general contractors and builders",
    primaryKeyword: "general contractor marketing",
    title: "General Contractor Marketing | Blue Collar Video Guys",
    metaDescription:
      "Marketing and video for general contractors, builders, and remodelers in Redding and the North State: project films, testimonials, websites, and local SEO.",
    h1: "General Contractor Marketing for Builders and Remodelers",
    intro:
      "Custom homes, remodels, and commercial builds are long, expensive projects, and clients choose a builder they trust for months of work. We help general contractors and builders show that trust with project films, client testimonials, and websites that win the right projects.",
    hesitations: [
      { title: "A long relationship", body: "Clients will work with you for months. They want to know the people, the communication, and the process up front." },
      { title: "Budget and schedule fears", body: "Overruns are every client's nightmare. Testimonials about on time, on budget work are gold." },
      { title: "Quality you cannot see in a bid", body: "Two bids can look alike on paper. Your finished work and your process decide the job." },
      { title: "Remote and out of area clients", body: "Second home and relocation clients often hire from a distance based entirely on what they see online." },
    ],
    videos: [
      { title: "Signature project films", body: "Cinematic walkthroughs of your best builds, inside and out." },
      { title: "Process explainer", body: "How a project runs with you, from estimate to walkthrough, which removes the fear of the unknown." },
      { title: "Client testimonials", body: "Homeowners and business owners describing what it was like to build with you." },
      { title: "Meet the team", body: "Project managers, superintendents, and the crew clients will see every day." },
      { title: "Progress updates", body: "Milestone clips that keep current clients excited and show future clients how you communicate." },
    ],
    recruiting:
      "Good superintendents, carpenters, and project managers want to work for a builder with a reputation. Video shows candidates the projects and culture they would join.",
    faqs: [
      { q: "How do general contractors get better clients?", a: "Show the projects you want more of, explain your process clearly, and collect testimonials from happy clients. That attracts people who value quality over the lowest bid." },
      { q: "Can you film a project over several months?", a: "Yes. We can capture key milestones through a build and deliver a full project film at the end, plus shorter updates along the way." },
      { q: "Should builders have individual project pages on their website?", a: "Yes. Project pages with photos, video, and a short story rank for local searches and give prospective clients the proof they want." },
      { q: "Do you work with commercial general contractors?", a: "Yes. Project reels and case studies help commercial GCs win invitations to bid and build relationships with owners and developers." },
    ],
    relatedServices: ["video-production", "website-design", "photography"],
    updated: "2026-10-21",
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
