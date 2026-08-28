import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4 uppercase tracking-wide">
          <span className="text-primary font-bold">{post.category}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">{post.title}</h1>

        <div className="prose-content space-y-6">
          {post.body.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-zinc-300">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-zinc-300 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-14 p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-lg font-bold text-white mb-2">Have a project in mind?</p>
          <p className="text-zinc-400 text-sm mb-6">Get a free demo and see what we'd build for you.</p>
          <Link
            href="/free-demo"
            className="inline-flex px-8 py-3 rounded-xl text-sm font-bold text-black bg-primary neon-btn"
          >
            Start a Free Demo
          </Link>
        </div>
      </article>
    </main>
  );
}
