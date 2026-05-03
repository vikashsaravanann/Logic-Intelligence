"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogData } from "@/data/blogData";

export default function BlogSection() {
  const featuredBlogs = blogData.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Latest from Our Blog</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Tips, guides, and insights for growing your business online</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl glass-card overflow-hidden bg-zinc-900/60 flex flex-col group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
              
              <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                <div className="h-48 bg-black relative flex items-center justify-center border-b border-white/10 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-zinc-600 font-bold tracking-widest uppercase text-sm relative z-10">Article Image</span>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-accent bg-accent/10 mb-4 self-start">
                    {blog.category}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">{blog.title}</h4>
                  <p className="text-sm text-zinc-400 mb-8 leading-relaxed flex-grow line-clamp-3">{blog.content}</p>
                  
                  <span className="flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                    Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
