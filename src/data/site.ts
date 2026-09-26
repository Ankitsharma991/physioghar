export const site = {
  name: "Digital Chautari",
  tagline: "Ideas meet execution",
  description:
    "A creative technology company in Kathmandu offering digital marketing, content creation and health-tech software.",
  email: "hello@digitalchautari.com",
  phone: "+977 1 5550 142",
  address: "Kathmandu, Nepal",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerGroups = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/products", label: "Products" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services#digital-marketing", label: "Digital Marketing" },
      { href: "/services#content-creation", label: "Content Creation" },
      { href: "/services#software-development", label: "Software Development" },
      { href: "/services#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;
