import { Megaphone, Stethoscope, Video, type LucideIcon } from "lucide-react";

export type ProductDetails =
  | { kind: "stats"; items: readonly { value: string; label: string }[] }
  | { kind: "tags"; items: readonly string[] };

export type Product = {
  id: string;
  name: string;
  tabLabel: string;
  category: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  details: ProductDetails;
  cta: string;
};

export const products: readonly Product[] = [
  {
    id: "eco-creative",
    name: "Eco Creative Marketing Agency",
    tabLabel: "Eco Creative Marketing Agency",
    category: "Marketing agency",
    icon: Megaphone,
    summary: "Full-service digital marketing for brands that want steady, measurable growth.",
    description:
      "Eco Creative is our full-service marketing arm. It plans and runs campaigns for retail, tourism and education brands, from the first strategy workshop to the monthly results review.",
    details: {
      kind: "stats",
      items: [
        { value: "120+", label: "Campaigns run" },
        { value: "35+", label: "Brands served" },
        { value: "3.4x", label: "Average return on ad spend" },
      ],
    },
    cta: "Work with Eco Creative",
  },
  {
    id: "one-content-studio",
    name: "One Content Creation Studio",
    tabLabel: "One Content Creation Studio",
    category: "Content studio",
    icon: Video,
    summary: "A production studio for video, photography and social content with a clear voice.",
    description:
      "One is our in-house production studio. A small crew handles scripting, shooting and editing, so a month of video, photos and posts arrives ready to publish and consistent with your brand.",
    details: {
      kind: "stats",
      items: [
        { value: "1M+", label: "Content views" },
        { value: "600+", label: "Assets delivered" },
        { value: "72h", label: "Typical edit turnaround" },
      ],
    },
    cta: "Book the studio",
  },
  {
    id: "physio-at-home",
    name: "Physio@Home",
    tabLabel: "Physio@Home",
    category: "Health-tech",
    icon: Stethoscope,
    summary: "Book qualified physiotherapists for sessions at home through one simple app.",
    description:
      "Physio@Home connects patients with verified physiotherapists who visit at home. Booking, session notes and progress tracking live in one app, so recovery does not stop when the clinic closes.",
    details: {
      kind: "tags",
      items: [
        "Home visits",
        "Verified therapists",
        "Progress tracking",
        "Secure records",
        "Flexible booking",
      ],
    },
    cta: "Join the Physio@Home waitlist",
  },
];
