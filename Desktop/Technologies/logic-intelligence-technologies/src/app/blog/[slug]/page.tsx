import { blogData } from "@/data/blogData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import Link from "next/link";
import { Share2, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return blogData.map((b) => ({
    slug: b.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogData.find((b) => b.slug === params.slug);
  if (!post) return { title: "Not Found" };
  
  return {
    title: `${post.title} | Blog | Logic Intelligence Technologies Pvt. Ltd.`,
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogData.find((b) => b.slug === params.slug);
  
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-10 px-6 lg:px-8 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-black bg-primary uppercase">{post.category}</span>
          <span className="text-sm text-zinc-500">{post.readingTime}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex items-center justify-between py-6 border-y border-white/10 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">LIT</div>
            <div>
              <p className="text-sm font-bold text-white">{post.author}</p>
              <p className="text-xs text-zinc-500">{post.date}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
          <p className="text-xl leading-relaxed">{post.content}</p>
          {/* This would ideally map over full markdown content, but for the scope we just show the excerpt as content */}
        </div>

        <div className="mt-20 p-10 rounded-3xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need help with your project?</h3>
          <p className="text-zinc-400 mb-6">We provide premium software and web development services tailored to your needs.</p>
          <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-xl font-bold text-black bg-primary neon-btn">
            WhatsApp Us Now
          </a>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
