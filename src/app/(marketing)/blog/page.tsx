import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and insights on web development, software, and building for the web.",
};

export default function BlogListPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-6 lg:px-8">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
          Insights
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">Blog</h1>
        <p className="text-zinc-400 mb-12 max-w-2xl">
          Guides on web development, software, and building for the web — written for founders, not developers.
        </p>

        {posts.length === 0 ? (
          <p className="text-zinc-500">New posts coming soon.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3 uppercase tracking-wide">
                  <span className="text-primary font-bold">{post.category}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
