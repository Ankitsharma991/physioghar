import {
  Code2,
  Cpu,
  Handshake,
  Layers,
  Palette,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  Users,
  Video,
  Megaphone,
  Brush,
} from "lucide-react";

export const heroStats = [
  { icon: Rocket, value: "3", label: "Products" },
  { icon: Users, value: "6+", label: "Team Members" },
  { icon: Layers, value: "100%", label: "Commitment" },
] as const;

export const features = [
  {
    icon: TrendingUp,
    title: "Growth-Driven",
    text: "Every campaign and build starts from a measurable goal, so results are easy to see and easy to trust.",
  },
  {
    icon: Palette,
    title: "Creative-First",
    text: "Strong ideas come before tools. We shape stories and visuals that people remember.",
  },
  {
    icon: Cpu,
    title: "Tech-Powered",
    text: "In-house engineers build fast, secure web and mobile products that scale with you.",
  },
  {
    icon: Handshake,
    title: "Client-Centric",
    text: "One point of contact, clear updates and honest timelines from kickoff to launch.",
  },
] as const;

export const strengths = [
  "Creative Strategy",
  "Brand Storytelling",
  "Full-Stack Engineering",
  "Health-Tech Expertise",
] as const;

export const serviceTeasers = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    text: "SEO, social and paid campaigns that bring the right people to you.",
  },
  {
    icon: Video,
    title: "Content Creation",
    text: "Video, photo and written content with a clear point of view.",
  },
  {
    icon: Code2,
    title: "Software Development",
    text: "Web and mobile products, designed and built end to end.",
  },
  {
    icon: Brush,
    title: "Branding & Design",
    text: "Identities and interfaces that feel consistent everywhere.",
  },
] as const;

export const impact = [
  { value: "250+", label: "Projects Delivered" },
  { value: "40+", label: "Happy Clients" },
  { value: "1M+", label: "Content Views" },
  { value: "98%", label: "Client Retention" },
] as const;

export const processSteps = [
  {
    icon: Search,
    title: "Discover",
    text: "We learn your goals, audience and constraints before proposing anything.",
  },
  {
    icon: PenTool,
    title: "Design",
    text: "We shape the strategy, the look and the flow, and agree on it with you.",
  },
  {
    icon: Code2,
    title: "Develop",
    text: "We build, test and refine in short cycles so you see progress every week.",
  },
  {
    icon: Rocket,
    title: "Deliver",
    text: "We launch, train your team and keep measuring what happens next.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Digital Chautari rebuilt our booking flow and our online enquiries doubled within a quarter. They explain every decision in plain language.",
    name: "Sujata Rana",
    role: "Operations Head, Himal Wellness Clinic",
  },
  {
    quote:
      "Their content team understands how Nepali audiences actually watch and share. Our reel views went from a few thousand to over a million.",
    name: "Prakash Thapa",
    role: "Founder, Trailhead Treks",
  },
  {
    quote:
      "Reliable, quick to respond and honest about timelines. Our online store launched on the date they promised.",
    name: "Anita Shrestha",
    role: "Co-founder, Kala Bazaar",
  },
] as const;
