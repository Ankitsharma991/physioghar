import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, posts } from "@/data/posts";
import { absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    absoluteTitle: true,
    type: "article",
    publishedTime: post.date,
    image: `/blog/${post.slug}/opengraph-image`,
  });
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: "Digital Chautari" },
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd data={breadcrumbs([{ name: post.title, path: `/blog/${post.slug}` }])} />
      <header className="bg-hero section-hero">
        <div className="wrap">
          <div className="flex max-w-[760px] flex-col items-start gap-5">
            <Link
              href="/#blog"
              className="text-primary-dark text-[14px] font-semibold hover:underline"
            >
              ← Back to the blog
            </Link>
            <Eyebrow>{post.category}</Eyebrow>
            <h1>{post.title}</h1>
            <p className="caption">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> &middot; {post.readTime}
            </p>
          </div>
        </div>
      </header>

      <article className="section wrap">
        <div className="mx-auto flex max-w-[720px] flex-col gap-8">
          <p className="lede text-ink text-[19px]">{post.intro}</p>
          {post.sections.map(({ heading, paragraphs }) => (
            <section key={heading}>
              <h2>{heading}</h2>
              <div className="text-muted mt-3 flex flex-col gap-4 leading-relaxed">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <CtaPanel title="Want help putting this into practice?" lede="Tell us about your project.">
        <ButtonLink href="/contact" variant="white">
          Start a Project →
        </ButtonLink>
      </CtaPanel>
    </>
  );
}
