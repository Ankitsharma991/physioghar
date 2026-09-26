import {
  Building2,
  GraduationCap,
  Newspaper,
  ShoppingCart,
  Stethoscope,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  name: string;
  short: string;
  icon: LucideIcon;
  description: string;
};

export const industries: readonly Industry[] = [
  {
    name: "Healthcare",
    short: "Healthcare",
    icon: Stethoscope,
    description: "Patient booking, clinic websites and trusted health content.",
  },
  {
    name: "E-Commerce",
    short: "E-Commerce",
    icon: ShoppingCart,
    description: "Storefronts, product photography and performance campaigns.",
  },
  {
    name: "Real Estate",
    short: "Real Estate",
    icon: Building2,
    description: "Listings, walkthrough videos and lead generation for developers.",
  },
  {
    name: "Education",
    short: "Education",
    icon: GraduationCap,
    description: "Admissions campaigns, learning portals and student communities.",
  },
  {
    name: "Tourism & Hospitality",
    short: "Tourism",
    icon: Plane,
    description: "Booking journeys and storytelling for hotels, treks and tours.",
  },
  {
    name: "Media & Publishing",
    short: "Media",
    icon: Newspaper,
    description: "Audience growth, video series and publishing platforms.",
  },
];
