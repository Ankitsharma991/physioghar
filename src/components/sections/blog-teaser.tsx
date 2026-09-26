import { Newspaper } from "lucide-react";
import Link from "next/link";
import { formatPostDate, posts } from "@/data/posts";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export function BlogTeaser() {
  return (
    <section id="blog" className="section wrap scroll-mt-20 py-0">
      <SectionHeading
        eyebrow="Blog"
        title="Latest from our blog"
        lede="Practical notes on marketing, content and product from the team."
      />
      <div className="card-grid mt-10 md:grid-cols-3">
        {posts.map((post, i) => (
          <Card key={post.slug} index={i} flush className="flex flex-col overflow-hidden">
            <div
              aria-hidden="true"
              className={cn(
                "text-primary-dark/50 flex h-40 items-center justify-center bg-linear-to-br",
                post.tone,
              )}
            >
              <Newspaper className="size-10" strokeWidth={1.5} />
            </div>
            <article className="flex flex-1 flex-col p-[22px]">
              <span className="eyebrow rounded-pill bg-chip-teal text-primary-dark self-start px-2.5 py-1">
                {post.category}
              </span>
              <p className="caption mt-4">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time> &middot;{" "}
                {post.readTime}
              </p>
              <h3 className="mt-2">{post.title}</h3>
              <p className="text-muted mt-2 flex-1 text-[15px]">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Read more: ${post.title}`}
                className="text-primary-dark mt-5 text-[15px] font-semibold hover:underline"
              >
                Read more →
              </Link>
            </article>
          </Card>
        ))}
      </div>
    </section>
  );
}
