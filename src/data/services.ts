import {
  Camera,
  ChartColumn,
  Clapperboard,
  Code2,
  Globe,
  HeartPulse,
  Megaphone,
  MousePointerClick,
  PenLine,
  PenTool,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  items: readonly { icon: LucideIcon; title: string; text: string }[];
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Campaigns built around a number you care about, whether that is enquiries, bookings or sales. We plan, run and report on all of it.",
    items: [
      {
        icon: Search,
        title: "SEO & SEM",
        text: "Rank for the searches your customers actually make.",
      },
      {
        icon: Share2,
        title: "Social Media Marketing",
        text: "Consistent, on-brand posting and community management.",
      },
      {
        icon: MousePointerClick,
        title: "Paid Advertising",
        text: "Search, social and display ads with clear budgets and targets.",
      },
      {
        icon: ChartColumn,
        title: "Analytics & Reporting",
        text: "Dashboards and monthly reviews that show what is working.",
      },
    ],
  },
  {
    id: "content-creation",
    icon: Video,
    title: "Content Creation",
    description:
      "Content with a point of view. Our studio handles the idea, the shoot and the edit, so your brand looks and sounds like itself everywhere.",
    items: [
      {
        icon: Clapperboard,
        title: "Video Production",
        text: "Brand films, product videos and short-form reels.",
      },
      {
        icon: Camera,
        title: "Photography",
        text: "Product, portrait and location shoots with fast turnaround.",
      },
      {
        icon: PenLine,
        title: "Copywriting",
        text: "Website, campaign and social copy in English and Nepali.",
      },
      {
        icon: Sparkles,
        title: "Motion Graphics",
        text: "Animated explainers, titles and social assets.",
      },
    ],
  },
  {
    id: "software-development",
    icon: Code2,
    title: "Software Development",
    description:
      "Web and mobile products built by the same engineers you meet on the first call. We focus on speed, security and code your team can maintain.",
    items: [
      {
        icon: Globe,
        title: "Web Development",
        text: "Fast marketing sites, portals and online stores.",
      },
      {
        icon: Smartphone,
        title: "Mobile Apps",
        text: "iOS and Android apps from a single shared codebase.",
      },
      {
        icon: HeartPulse,
        title: "Health-Tech Platforms",
        text: "Booking, records and telehealth tools with privacy built in.",
      },
      {
        icon: PenTool,
        title: "UI/UX Design",
        text: "Research, wireframes and interfaces tested with real users.",
      },
    ],
  },
];

export type PricingTier = {
  name: string;
  price: string;
  unit?: string;
  blurb: string;
  features: readonly string[];
  cta: string;
  featured?: boolean;
};

export const pricingTiers: readonly PricingTier[] = [
  {
    name: "Starter",
    price: "Rs 15,000",
    unit: "/mo",
    blurb: "For small businesses getting started online.",
    features: [
      "One marketing channel",
      "8 social posts per month",
      "Basic SEO setup",
      "Monthly performance report",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "Rs 45,000",
    unit: "/mo",
    blurb: "For growing teams that need a full marketing engine.",
    features: [
      "Three marketing channels",
      "20 social posts and 4 videos",
      "Ongoing SEO and paid ads",
      "Dedicated project manager",
      "Weekly check-ins and reporting",
    ],
    cta: "Choose Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For larger organisations with bespoke requirements.",
    features: [
      "Custom scope and team",
      "Software and marketing together",
      "Service level agreement",
      "Priority support",
      "Quarterly strategy reviews",
    ],
    cta: "Talk to Sales",
  },
];

export const reasons = [
  {
    title: "Dedicated project manager",
    text: "One person who knows your project and answers your messages.",
  },
  {
    title: "Agile development cycle",
    text: "Short sprints with a demo at the end of each one.",
  },
  {
    title: "Transparent pricing",
    text: "Fixed scopes and written estimates, with no surprise invoices.",
  },
  {
    title: "Post-launch support",
    text: "We stay on after launch to fix, tune and train your team.",
  },
  {
    title: "Scalable architecture",
    text: "Systems designed to handle ten times today's traffic.",
  },
  {
    title: "Cross-platform expertise",
    text: "Web, iOS and Android delivered from one coordinated team.",
  },
] as const;
