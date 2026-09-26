import { Clock, Mail, MapPin, Phone, Megaphone, Video, Code2, Handshake } from "lucide-react";
import { site } from "./site";

export const contactCards = [
  { icon: MapPin, title: "Address", lines: [site.address, "Bagmati Province"] },
  {
    icon: Mail,
    title: "Email",
    lines: [site.email],
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    title: "Phone",
    lines: [site.phone],
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Sunday to Friday", "10:00 AM to 6:00 PM (NPT)"],
  },
] as const;

export const departments = [
  {
    icon: Megaphone,
    name: "Marketing",
    text: "Campaigns, SEO and paid media.",
    email: "marketing@digitalchautari.com",
  },
  {
    icon: Video,
    name: "Content Studio",
    text: "Video, photo and social content.",
    email: "studio@digitalchautari.com",
  },
  {
    icon: Code2,
    name: "Software Dev",
    text: "Web, mobile and health-tech builds.",
    email: "dev@digitalchautari.com",
  },
  {
    icon: Handshake,
    name: "Business Dev",
    text: "Partnerships and enterprise plans.",
    email: "partners@digitalchautari.com",
  },
] as const;

export const responseTimes = [
  { label: "Email", value: "Within 24 hours" },
  { label: "Proposals", value: "2 to 3 days" },
  { label: "Urgent", value: "Same day" },
] as const;
