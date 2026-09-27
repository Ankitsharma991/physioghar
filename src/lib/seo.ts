import type { Metadata } from "next";
import { site } from "@/data/site";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "https://physioghar-fawn.vercel.app/")
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  publishedTime,
  image = "/opengraph-image",
}: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: fullTitle }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_NP",
      images,
      ...(publishedTime && { publishedTime }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}

export function breadcrumbs(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
