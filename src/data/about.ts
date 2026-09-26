import {
  Award,
  BadgeCheck,
  Briefcase,
  Compass,
  Crown,
  Database,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  Lock,
  Megaphone,
  Network,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const storyTiles = [
  { value: "2025", label: "Founded", tone: "teal" },
  { value: "3", label: "Products", tone: "navy" },
  { value: "Kathmandu", label: "Headquarters", tone: "white" },
  { value: "7+", label: "Team Members", tone: "gold" },
] as const;

export const missionVision = [
  {
    title: "Our Mission",
    text: "To help Nepali businesses grow through honest, well-made digital work, from a first campaign to a complete software product.",
  },
  {
    title: "Our Vision",
    text: "To be the studio people across South Asia think of first when they want creativity and engineering to work as one team.",
  },
] as const;

export const values = [
  {
    icon: Heart,
    title: "Passion",
    text: "We care about the work and the people it is for, and it shows in the details.",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    text: "We start with original ideas and test them against real audiences.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We ship work we would be proud to put our own name on.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Clients, designers and engineers work on the same goal, in the same room.",
  },
] as const;

export const trust = [
  {
    icon: BadgeCheck,
    title: "ISO 9001 Ready",
    text: "Our delivery process follows ISO 9001 quality practices and is prepared for audit.",
  },
  {
    icon: Lock,
    title: "Data Protection",
    text: "Client and patient data is encrypted, access controlled and never sold.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    text: "We work across time zones with clear handovers and overlapping hours.",
  },
  {
    icon: Network,
    title: "Pan-Nepal Network",
    text: "Partners and freelancers across Nepal support shoots, events and field work.",
  },
] as const;

export const team = [
  {
    icon: Crown,
    role: "Founder & CEO",
    text: "Sets the direction, leads client partnerships and owns the company vision.",
  },
  {
    icon: Compass,
    role: "Co-Founder & COO",
    text: "Runs operations, delivery and the day-to-day rhythm of every project.",
  },
  {
    icon: Sparkles,
    role: "Front-End Developer",
    text: "Turns designs into fast, accessible interfaces across web and mobile.",
  },
  {
    icon: Database,
    role: "Back-End Developer",
    text: "Builds the APIs, data models and infrastructure behind our products.",
  },
  {
    icon: Megaphone,
    role: "Marketing Lead",
    text: "Plans campaigns, content calendars and the reporting that goes with them.",
  },
  {
    icon: Briefcase,
    role: "Sales Executive",
    text: "Understands each client's needs and shapes the right proposal.",
  },
  {
    icon: TrendingUp,
    role: "Business Development Officer",
    text: "Finds partners and new markets, and keeps relationships warm.",
  },
] as const;

export const roadmap = [
  {
    year: "2025",
    title: "The Idea",
    text: "A small group of marketers and engineers decides to build a studio that does both well.",
  },
  {
    year: "2025",
    title: "First Products",
    text: "Eco Creative and One Content Studio launch and take on their first clients.",
  },
  {
    year: "2026",
    title: "Health-Tech Entry",
    text: "Physio@Home begins pilot sessions and takes the team into healthcare software.",
  },
  {
    year: "2026",
    title: "Company Registration",
    text: "Digital Chautari is formally registered, giving clients a clear legal home.",
  },
] as const;
