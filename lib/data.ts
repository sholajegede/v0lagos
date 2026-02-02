// Event Data for v0 IRL Lagos

// Asset types
export type AssetType = "svg" | "png" | "jpg" | "jpeg" | "remote"

export interface Sponsor {
  name: string
  logo: string
  url: string
  assetType: AssetType
  height?: number
}

export const eventData = {
  // Basic Event Info
  name: "v0 IRL Lagos",
  tagline: "Prompt to Production",
  greeting: "HELLO LAGOS! YOU'RE INVITED",
  
  // Date & Location
  date: "FEBRUARY 7, 2026",
  locationLabel: "LOCATION",
  venue: "In-person and Online",
  venueAddress: "https://luma.com/0istsp1w",
  
  // Event URL
  eventUrl: "https://luma.com/0istsp1w", // Sign up URL
  
  // Description
  description: "Join us for Lagos's first official v0 IRL event, part of Vercel's global 'Prompt to Production' week. This is a hands-on workshop where we'll build a complete full stack application together — and you'll learn how to adapt it to YOUR idea.",
  
  // CTA
  ctaText: "It's time to ship.",
}

export const agendaItems = [
  { title: "Doors open, networking & setup", time: "11:00 AM WAT" },
  { title: "Welcome + special video from the v0 team", time: "11:15 AM" },
  { title: "v0 fundamentals & prompting strategies", time: "11:30 AM" },
  { title: "Start building", time: "11:45 AM" },
  { title: "Showcase projects + community voting", time: "12:30 PM" },
  { title: "Wrap up, photos, hang out", time: "1:00 PM" },
]

export const experienceItems = [
  {
    title: "Master v0 prompting",
    description: "Learn how to describe features and get production-ready code instantly",
  },
  {
    title: "Community voting",
    description: "Builders vote for favorites, winners get prizes.",
  },
  {
    title: "Free v0 credits",
    description: "Everyone gets $10 to use during and after the session",
  },
  {
    title: "Deploy in hours, not weeks",
    description: "Leave with a working app at a live URL you can share",
  },
  {
    title: "Global showcase",
    description: "Submit your project to v0's worldwide gallery for a chance to win prizes",
  },
  {
    title: "Curated prompt packs",
    description: "Starter prompts for Marketing, Product, GTM, Design, Dev, and Data projects",
  },
]

// Helper function to format index as padded number (01, 02, etc.)
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0")
}

export const sponsors: Sponsor[] = [
  {
    name: "Vercel",
    logo: "/sponsors/vercel.svg",
    url: "https://vercel.com",
    assetType: "svg",
    height: 37,
  },
  {
    name: "Kinde",
    logo: "/sponsors/kinde.svg",
    url: "https://kinde.com",
    assetType: "svg",
    height: 36,
  },
]

// Logo assets
export const logos = {
  v0: "/v0-logo.svg",
}

// Helper to determine asset type from file extension or URL
export function getAssetType(src: string): AssetType {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return "remote"
  }
  const ext = src.split(".").pop()?.toLowerCase()
  if (ext === "svg" || ext === "png" || ext === "jpg" || ext === "jpeg") {
    return ext as AssetType
  }
  return "remote"
}

// Presentation Tracks
export interface Track {
  id: number
  title: string
  description: string
  ideas: string[]
}

export const presentationTracks: Track[] = [
  {
    id: 1,
    title: "GTM",
    description: "Close deals faster. Automate research, personalize demos, and generate proposals on demand.",
    ideas: [
      "Custom product demo with prospect's logo and sample data",
      "Pricing configurator with real-time quotes",
      "Agent that researches prospects via web search and drafts outreach",
      "Agent that logs call notes and creates Linear follow-ups",
      "Deal room portal for sharing proposals and tracking views",
      "ROI calculator tailored to prospect's industry",
    ],
  },
  {
    id: 2,
    title: "Marketing",
    description: "Turn ideas into campaigns. Repurpose content, analyze performance, and ship without waiting.",
    ideas: [
      "Campaign landing page with countdown timer and waitlist",
      "Agent that repurposes blog posts into social threads",
      "SEO brief generator that researches keywords and drafts outlines",
      "Event registration page with Supabase-powered signups",
      "A/B test variant generator for landing page headlines",
      "Agent that pulls from your changelog, blog, and website to draft newsletter content",
    ],
  },
  {
    id: 3,
    title: "Design",
    description: "Refine layouts and maintain systems. Check consistency, document components, iterate faster.",
    ideas: [
      "Component library with buttons, cards, and forms",
      "Interactive style guide with live previews",
      "Agent that audits pages and creates Linear issues for fixes",
      "Agent that documents components and generates usage examples",
      "Color palette generator with accessibility contrast checks",
      "Icon browser with search and copy-to-clipboard",
    ],
  },
  {
    id: 4,
    title: "Product",
    description: "Turn feedback and PRDs into prototypes. Synthesize, prioritize, and ship specs faster.",
    ideas: [
      "Feature prototype generated from your PRD",
      "Agent that synthesizes feedback and creates Linear tickets",
      "Agent that reads specs and generates working UI",
      "Changelog page that pulls releases from Linear",
      "Feature voting board with Supabase-powered submissions",
      "Agent that turns rough ideas into scoped stories in Notion",
    ],
  },
  {
    id: 5,
    title: "Data & Ops",
    description: "Automate reporting and surface insights. Monitor metrics, alert on issues, keep teams informed.",
    ideas: [
      "Executive dashboard with KPIs and trend charts",
      "Natural language SQL agent connected to your database",
      "Agent that detects anomalies and creates Linear alerts",
      "Agent that generates weekly reports and exports to PDF",
      "Data validation UI that flags issues in CSV uploads",
      "Status page showing system health and uptime",
    ],
  },
  {
    id: 6,
    title: "Engineering",
    description: "Unblock stakeholders without breaking prod. Triage, document, and automate the tedious stuff.",
    ideas: [
      "Admin panel for managing users and permissions",
      "Agent that triages Sentry errors and creates Linear tickets",
      "Agent that generates API docs from your codebase",
      "Internal tool for customer support workflows",
      "Feature flag dashboard with rollout controls",
      "Agent that syncs Linear issues to Notion for stakeholders",
    ],
  },
]

// Presentation config
export const presentationConfig = {
  creditCode: "V0LAGOSIRL2026",
  creditAmount: "$10",
  videoUrl: "", // Will be set by user - YouTube unlisted link
  hosts: [
    {
      name: "AUX Studio",
      role: "Your hosts for this evening, guiding you through the build session",
    },
    {
      name: "AI Collective Team",
      role: "Supporting the community in building the future with AI",
    },
  ],
}
