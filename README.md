# Digital Chautari

Marketing website for Digital Chautari, a creative technology company in Kathmandu offering digital marketing, content creation and health-tech software.

Five pages (Home, Services, Products, About, Contact), plus FAQ, Privacy, Terms and a small blog. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Pages are statically generated. The only server code is the contact form endpoint.

## Getting started

```bash
nvm use
cp .env.example .env.local
npm install
npm run dev
```

The site runs on http://localhost:3000.

## Scripts

| Command             | What it does                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm run dev`       | Development server                                                                                           |
| `npm run build`     | Production build                                                                                             |
| `npm run start`     | Serve the production build                                                                                   |
| `npm run preview`   | Build and serve production. Use this, not `dev`, to measure performance                                      |
| `npm run audit`     | Run Lighthouse in a clean Chrome profile without extensions (default `http://localhost:3000`, or pass a URL) |
| `npm run lint`      | ESLint                                                                                                       |
| `npm run typecheck` | TypeScript, no emit                                                                                          |
| `npm run format`    | Format with Prettier                                                                                         |
| `npm test`          | Build, start and run the Playwright suite                                                                    |

## Measuring performance

Audit the production build, never the dev server. Stop `npm run dev`, run `npm run preview`, then in another terminal run `npm run audit`. Browser extensions can cost a category several points on their own, so the script uses a clean profile. Scores on a busy machine vary by a few points from run to run.

## Environment variables

| Variable                   | Required           | Purpose                                                                                               |
| -------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | On a custom domain | Canonical URLs, sitemap and share images. On Vercel it falls back to the production URL automatically |
| `RESEND_API_KEY`           | For email delivery | API key for [Resend](https://resend.com)                                                              |
| `CONTACT_TO_EMAIL`         | For email delivery | Inbox that receives contact form messages                                                             |
| `CONTACT_FROM_EMAIL`       | For email delivery | Verified sender address                                                                               |
| `GOOGLE_SITE_VERIFICATION` | Optional           | Search Console verification token                                                                     |

If the three email variables are not set, the contact form still works, but messages are written to the server log with a warning instead of being emailed.

## Structure

```
src/
  app/          routes, layouts, metadata files, the contact API route
  components/
    layout/     header, footer, logo, scroll reveal observer
    ui/         buttons, cards, hero, headings and other primitives
    sections/   page sections
  data/         page content and copy
  lib/          helpers, contact schema, mail, rate limiter, SEO helpers
e2e/            Playwright tests
```

Design tokens (colors, radii, shadow, fonts, breakpoint) live in `src/app/globals.css` under `@theme`.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel. The framework preset is detected automatically.
3. Add the environment variables above.
4. Deploy. Fonts are downloaded at build time, so the build needs internet access.

After the first deploy, submit `/sitemap.xml` in Google Search Console.

## Security

Security headers and a Content-Security-Policy are set in `next.config.ts`. Scripts allow `'unsafe-inline'` because Next injects inline bootstrap scripts, and a nonce based policy would force every page to render dynamically. The contact endpoint checks origin, content type and body size, rate limits by IP, uses a honeypot field and validates with zod. The rate limiter keeps counts in memory, so it is per server instance.

## Known trade-offs

- White text on the brand teal (`#0F9488`) is 3.74:1, below the 4.5:1 AA target for small text. The brief specifies it. Switching primary buttons to `primary-dark` in `src/components/ui/button.tsx` fixes it, and the matching test in `e2e/links-a11y.spec.ts` will then tell you to remove its expected-failure marker.
- Client names, testimonials, email addresses and the phone number are placeholders.
