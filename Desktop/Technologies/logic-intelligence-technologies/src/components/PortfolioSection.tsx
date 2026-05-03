"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";

const categories = ["All", "Web Design", "Hotel", "Travel", "Software", "E-Commerce"];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = portfolioData.filter((p) => activeFilter === "All" || p.category === activeFilter).slice(0, 6);

  return (
    <section id="portfolio" className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Real projects. Real results. Built by Logic Intelligence Technologies Pvt. Ltd.</h3>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === cat ? "bg-primary text-black shadow-[0_0_15px_rgba(0,191,255,0.4)]" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-primary/50 transition-all shadow-[0_0_15px_rgba(0,191,255,0)] hover:shadow-[0_0_25px_rgba(0,191,255,0.2)]"
              >
                <Link href={`/portfolio/${project.slug}`} className="block w-full h-full">
                  {/* Placeholder graphic */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center p-6 text-center">
                    <span className="text-2xl font-black text-zinc-700 uppercase tracking-widest opacity-30">{project.category}</span>
                  </div>
                  
                  {/* Default state */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity group-hover:opacity-0">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{project.category}</span>
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                  </div>

                  {/* Hover state */}
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                    <p className="text-sm text-zinc-300 mb-6 px-4 line-clamp-3">{project.shortDescription}</p>
                    <span className="px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-black neon-btn">
                      View Case Study
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Demo CTA */}
        <div className="mt-24 p-10 md:p-14 rounded-3xl bg-gradient-to-r from-zinc-900 to-black border border-white/10 text-center relative overflow-hidden glass-card">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(123,47,190,0.15)_0%,transparent_70%)] pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Want to see YOUR website before paying?</h3>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 relative z-10">
            Share your business details and we will build you a free demo version of your website — no payment needed to see it.
          </p>
          <Link href="/free-demo" className="inline-block px-8 py-4 rounded-full text-base font-bold bg-accent text-white shadow-[0_0_15px_rgba(123,47,190,0.4)] hover:shadow-[0_0_25px_rgba(123,47,190,0.7)] transition-all relative z-10 hover:scale-[1.02] active:scale-95">
            Request Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
