export type LegalSection = { heading: string; paragraphs: readonly string[] };

export const privacy: readonly LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "When you use the contact form we collect your name, email address, subject, project type and message. We use this only to reply to you and to understand what you need.",
      "Our servers keep ordinary technical logs, such as IP address and request time, for security and to protect the contact form from abuse.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "This website does not use advertising cookies or third-party analytics. Fonts are served from our own domain, so your browser does not contact font providers.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      "We do not sell your information. Messages sent through the contact form are delivered by our email provider, and the website is hosted by our hosting provider. Both process data only on our behalf.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiries for as long as needed to respond and to follow up on a project, and delete them on request. Server logs are kept for a short period.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can ask what we hold about you, ask us to correct it or ask us to delete it by emailing hello@digitalchautari.com. We will respond within a reasonable time.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we handle information we will update this page and the date above.",
    ],
  },
];

export const terms: readonly LegalSection[] = [
  {
    heading: "Using this website",
    paragraphs: [
      "You may browse this website and use the contact form for lawful purposes. Please do not attempt to disrupt the site, probe it for weaknesses or submit misleading or abusive content.",
    ],
  },
  {
    heading: "Our content",
    paragraphs: [
      "The text, design, logos and other material on this website belong to Digital Chautari or its licensors. You may share links to it, but you may not copy or reuse it commercially without our written permission.",
    ],
  },
  {
    heading: "Our services",
    paragraphs: [
      "Information on this website, including prices, describes our services in general terms. Work for a client is governed by a separate written agreement that sets out scope, fees and timelines.",
    ],
  },
  {
    heading: "No warranty",
    paragraphs: [
      "We work to keep this website accurate and available, but it is provided as is. We are not liable for losses that result from relying on the information on it.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: ["These terms are governed by the laws of Nepal."],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may update these terms from time to time. The date on this page shows when they last changed.",
    ],
  },
];
