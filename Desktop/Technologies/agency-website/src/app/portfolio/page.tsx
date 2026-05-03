"use client";

import { useState } from "react";
import projectsData from "@/data/portfolio.json";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))];
  const filteredProjects = filter === "All" ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <ExternalLink className="mr-2 h-4 w-4" /> Case Studies
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
              Projects That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">Speak for Themselves</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our recent work across e-commerce, corporate websites, and complex web applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative rounded-3xl bg-card/50 border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-secondary to-background flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10"></div>
                    <span className="text-8xl font-extrabold text-foreground/5 select-none group-hover:scale-110 transition-transform duration-500">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-6">{project.description}</p>

                    {/* Results */}
                    <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <ArrowUpRight className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-semibold text-primary">{project.results}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-lg bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                      View Project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden border-t border-border/30">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">Want results like these?</h2>
          <p className="text-lg text-muted-foreground mb-8">Let&apos;s discuss how we can build something amazing for your business.</p>
          <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-[0_0_40px_-10px_rgba(46,134,171,0.5)]" asChild>
            <Link href="/contact">Start Your Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
