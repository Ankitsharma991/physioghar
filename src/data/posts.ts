export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tone: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

export const posts: readonly Post[] = [
  {
    slug: "seo-fixes-for-small-businesses",
    title: "Five SEO fixes Nepali small businesses can make this week",
    excerpt:
      "You do not need a big budget to show up in search. These small changes make the biggest difference.",
    category: "Digital Marketing",
    date: "2026-09-12",
    readTime: "5 min read",
    tone: "from-chip-mint to-chip-teal",
    intro:
      "Most small businesses in Nepal do not lose search traffic because of clever algorithm tricks. They lose it because of basic gaps that take an afternoon to close. Here are five you can fix this week.",
    sections: [
      {
        heading: "1. Complete your Google Business Profile",
        paragraphs: [
          "For local searches, your profile often appears above every website. Add your exact address, opening hours, phone number, a short description and at least ten real photos.",
          "Choose the most specific category you can. A physiotherapy clinic should not be listed as a general clinic if a closer category exists.",
        ],
      },
      {
        heading: "2. Give every page a clear title and description",
        paragraphs: [
          "The title is the blue link people see in results. Write it the way a customer would search: the service, the city and your name, in about 60 characters.",
          "The description will not change your ranking directly, but a clear one earns more clicks, and clicks are what you are after.",
        ],
      },
      {
        heading: "3. Compress your images",
        paragraphs: [
          "Photos straight from a phone can weigh five megabytes. On a mobile connection that means a slow page, and slow pages lose both visitors and rankings.",
          "Resize images to the width they are displayed at and save them as WebP or AVIF. Most sites can cut their page weight in half in an hour.",
        ],
      },
      {
        heading: "4. Ask for a review after every job",
        paragraphs: [
          "Reviews are one of the strongest local signals, and most happy customers will write one if you ask. Send the link by message the same day you finish the work.",
          "Reply to every review, including the critical ones, politely and specifically.",
        ],
      },
      {
        heading: "5. Publish one useful page each month",
        paragraphs: [
          "Answer one question your customers keep asking. A clear, honest page on the price range of a service or how long a process takes will bring in searchers for years.",
          "Keep a simple list of questions from calls and messages. That list is your content plan.",
        ],
      },
    ],
  },
  {
    slug: "plan-a-month-of-social-content",
    title: "How to plan a month of social content without burning out",
    excerpt:
      "A simple weekly rhythm that keeps your feed active and your team sane, with room for what happens on the day.",
    category: "Content Creation",
    date: "2026-08-28",
    readTime: "6 min read",
    tone: "from-chip-gold to-chip-pink",
    intro:
      "Consistency matters more than volume, and consistency is a planning problem. A simple weekly rhythm lets a small team stay active without living in the feed.",
    sections: [
      {
        heading: "Give each week a theme",
        paragraphs: [
          "Pick four themes for the month, for example a customer story, a how-to, a behind-the-scenes look and an offer. Every post in that week connects to the theme, which makes ideas easier to find.",
        ],
      },
      {
        heading: "Batch the work",
        paragraphs: [
          "Shoot and write in blocks. One half-day of filming can produce a month of short clips if the shot list is ready. Editing in one sitting also keeps the look consistent.",
          "Schedule posts with a native tool so nothing depends on someone remembering at 8 in the morning.",
        ],
      },
      {
        heading: "Leave room for the day",
        paragraphs: [
          "Plan about three quarters of the calendar and keep the rest open for festivals, news and things that happen at the office. Those unplanned posts often perform best.",
        ],
      },
      {
        heading: "Reuse what works",
        paragraphs: [
          "A long video becomes three clips, a quote card and a caption for a text post. Repurposing is not lazy, it is how one idea reaches people on different platforms.",
        ],
      },
      {
        heading: "Review once a month",
        paragraphs: [
          "Look at the five best and five weakest posts. Note the format, the opening line and the time of day. Adjust next month's plan by one or two things, not everything.",
        ],
      },
    ],
  },
  {
    slug: "home-physiotherapy-booking",
    title: "What home physiotherapy apps get right about booking",
    excerpt:
      "Patients want to know who is coming, when, and what it costs. Good booking flows answer all three at once.",
    category: "Health-Tech",
    date: "2026-08-09",
    readTime: "4 min read",
    tone: "from-chip-lilac to-chip-teal",
    intro:
      "Someone recovering from a knee operation does not want to learn a new app. They want to know who is coming, when they will arrive and what it costs. Good booking flows answer those questions before the patient has to ask.",
    sections: [
      {
        heading: "Show who is coming",
        paragraphs: [
          "A name, a photo, qualifications and a registration number turn a stranger at the door into a professional the patient has already met. Trust is the biggest barrier in home care.",
        ],
      },
      {
        heading: "Be exact about time and price",
        paragraphs: [
          "Offer arrival windows the patient can plan around, and show the full price before confirming. Surprises after the first session are the fastest way to lose a patient.",
        ],
      },
      {
        heading: "Make rescheduling easy",
        paragraphs: [
          "Recovery does not follow a calendar. Pain, weather and family plans move sessions, so rescheduling should take two taps, not a phone call.",
        ],
      },
      {
        heading: "Keep the record after the visit",
        paragraphs: [
          "Session notes, exercises and progress should live in one place that the patient, family and therapist can all see. Continuity is what turns separate visits into a treatment plan.",
        ],
      },
      {
        heading: "Protect the data",
        paragraphs: [
          "Health records are sensitive. Encrypt them, limit who can read them and be clear about what is stored. Patients notice when a product takes their privacy seriously.",
        ],
      },
    ],
  },
];

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
