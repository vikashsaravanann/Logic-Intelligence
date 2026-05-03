"use client";

import { Zap, Target, Sparkles, Shield, Users, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-background overflow-hidden">
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Users className="mr-2 h-4 w-4" /> About Us
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                One Developer.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">Infinite Capability.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Logic Intelligence Technologies is an AI-orchestrated development studio. We deliver what a team of 5 developers produces — at incredible speed and a fraction of the cost.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "<2wk", label: "Avg. Delivery Time" },
                { value: "90+", label: "Lighthouse Score" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary/30 border border-border/50 text-center">
                  <span className="text-4xl font-extrabold text-primary mb-2">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/10 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">What Drives Us</h2>
              <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">Why Choose Logic Intelligence?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "We use advanced AI scaffolding to bypass weeks of boilerplate. You get to market faster than any traditional agency." },
              { icon: Target, title: "Premium Quality", desc: "Speed doesn't mean compromised quality. We build on Next.js, ensuring 90+ Lighthouse scores on every project." },
              { icon: Sparkles, title: "Results Driven", desc: "Your website isn't just a digital brochure — it's a sales engine designed to convert visitors into paying clients." }
            ].map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-colors duration-500"></div>
                <div className="rounded-2xl p-4 bg-primary/10 text-primary inline-flex mb-6 ring-1 ring-primary/20">
                  <value.icon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">The Journey</h2>
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">From Vision to Reality in 5 Steps</h3>
          </div>
          <div className="space-y-0">
            {[
              { step: "01", name: "Discovery", description: "We learn about your business, target audience, and project goals through a focused kickoff call." },
              { step: "02", name: "Strategy & Planning", description: "We map out architecture, user flow, and features in a detailed project brief." },
              { step: "03", name: "Design", description: "We create stunning UI mockups and iterate until you're 100% satisfied." },
              { step: "04", name: "Development", description: "Our AI-augmented workflow builds your project with modern tech, tested at every stage." },
              { step: "05", name: "Testing & Launch", description: "Rigorous QA across devices ensures a bug-free, fast, and secure launch." }
            ].map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5 text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                    {step.step}
                  </div>
                  {index !== 4 && <div className="h-full w-0.5 bg-border mt-2 group-hover:bg-primary/50 transition-colors"></div>}
                </div>
                <div className="pb-12">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{step.name}</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">Ready to build together?</h2>
          <p className="text-lg text-muted-foreground mb-8">Let&apos;s turn your idea into a high-performance digital product.</p>
          <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-[0_0_40px_-10px_rgba(46,134,171,0.5)]" asChild>
            <Link href="/contact">Start Your Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
