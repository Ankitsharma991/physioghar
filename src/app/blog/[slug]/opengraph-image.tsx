import { ImageResponse } from "next/og";
import { posts } from "@/data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0B1220",
        color: "#ffffff",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 700, color: "#E0A930", textTransform: "uppercase" }}>
        {post?.category ?? "Blog"}
      </div>
      <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.12 }}>
        {post?.title ?? "Digital Chautari"}
      </div>
      <div style={{ fontSize: 30, color: "#9aa6b5" }}>Digital Chautari</div>
    </div>,
    size,
  );
}
