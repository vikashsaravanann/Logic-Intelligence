"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, LayoutDashboard, Settings, ShoppingCart, CheckCircle, Zap, Star, ChevronDown, Play, Users, Globe, Shield, Activity } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 flex flex-col items-center justify-center text-center min-h-[90vh]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
          <motion.div 
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px]"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        <motion.div 
          className="mx-auto max-w-4xl relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" /> Logic Intelligence Technologies
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl mb-6">
            Smart Digital Solutions{" "}<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
              Powered by Intelligence
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Data-driven web engineering that transforms your digital presence. We build intelligent, high-converting platforms using AI-augmented workflows.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(46,134,171,0.5)] hover:shadow-[0_0_60px_-15px_rgba(46,134,171,0.7)] transition-all duration-300 group" asChild>
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-background/50 backdrop-blur-md border-border/50 hover:bg-secondary/50 group" asChild>
              <Link href="/portfolio">
                <Play className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform" /> View Our Work
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" /> AI-Powered Development
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Lightning Fast
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> 5-Star Rated
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/50" />
        </motion.div>
      </section>

      {/* Premium Services Grid */}
      <section className="py-32 bg-secondary/20 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Engineered for Growth</h3>
            <p className="mt-4 text-xl text-muted-foreground">We don&apos;t just build websites. We engineer intelligent, data-driven digital assets.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: LayoutDashboard, title: "Immersive Landing Pages", desc: "High-converting, visually stunning pages that captivate visitors and drive action.", color: "from-blue-500/20 to-cyan-500/20" },
              { icon: ShoppingCart, title: "Modern E-Commerce", desc: "Frictionless shopping experiences optimized for maximum cart conversions and speed.", color: "from-emerald-500/20 to-teal-500/20" },
              { icon: Code, title: "Custom SaaS Apps", desc: "Complex logic simplified into intuitive, beautiful dashboards and user interfaces.", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Activity, title: "Performance Optimization", desc: "Sub-second load times and perfect Core Web Vitals scores for better SEO.", color: "from-orange-500/20 to-red-500/20" },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security practices built-in from day one to protect your user data.", color: "from-indigo-500/20 to-blue-500/20" },
              { icon: Settings, title: "Proactive Maintenance", desc: "Continuous monitoring, updates, and improvements to keep your app flawless.", color: "from-gray-500/20 to-slate-500/20" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className={`inline-flex rounded-2xl p-4 bg-gradient-to-br ${service.color} text-foreground mb-6 ring-1 ring-white/10`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section (New) */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">The Process</h2>
              <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">From Concept to Launch in Record Time</h3>
              <p className="text-xl text-muted-foreground mb-8">We've eliminated the bloat of traditional agencies. Our AI-augmented workflow delivers superior results, faster.</p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Discovery & Strategy", desc: "We align on your goals, target audience, and ideal aesthetic before writing a single line of code." },
                  { step: "02", title: "Design & Prototyping", desc: "Rapid iterations to lock in a premium UI/UX that sets you apart from competitors." },
                  { step: "03", title: "Development & QA", desc: "Rigorous engineering using Next.js and Tailwind, tested across all devices." },
                  { step: "04", title: "Launch & Scale", desc: "Seamless deployment, SEO optimization, and ongoing support to ensure lasting success." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 relative group">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5 text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                        {item.step}
                      </div>
                      {i !== 3 && <div className="h-full w-0.5 bg-border mt-4 group-hover:bg-primary/50 transition-colors"></div>}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square lg:aspect-auto lg:h-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-background p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                {/* Mock Code Block */}
                <div className="flex-1 rounded-xl bg-black/80 border border-white/10 p-6 font-mono text-sm shadow-inner overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 text-xs text-muted-foreground/50">page.tsx</div>
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: -200 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-emerald-400/80 space-y-2"
                  >
                    <p><span className="text-blue-400">import</span> {'{'} motion {'}'} <span className="text-blue-400">from</span> <span className="text-orange-300">"framer-motion"</span>;</p>
                    <p><span className="text-blue-400">import</span> {'{'} Button {'}'} <span className="text-blue-400">from</span> <span className="text-orange-300">"@/components/ui/button"</span>;</p>
                    <br/>
                    <p><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">Hero</span>() {'{'}</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                    <p className="pl-8">{'<'}<span className="text-blue-300">motion.div</span></p>
                    <p className="pl-12"><span className="text-cyan-300">initial</span>={'{'} hidden {'}'}</p>
                    <p className="pl-12"><span className="text-cyan-300">animate</span>={'{'} visible {'}'}</p>
                    <p className="pl-12"><span className="text-cyan-300">className</span>=<span className="text-orange-300">"premium-gradient flex items-center justify-center min-h-screen relative overflow-hidden"</span></p>
                    <p className="pl-8">{'>'}</p>
                    <p className="pl-12">{'<'}<span className="text-blue-300">div</span> <span className="text-cyan-300">className</span>=<span className="text-orange-300">"absolute inset-0 bg-grid-white/[0.02]"</span> {'/>'}</p>
                    <p className="pl-12">{'<'}<span className="text-blue-300">h1</span> <span className="text-cyan-300">className</span>=<span className="text-orange-300">"text-6xl font-bold tracking-tighter"</span>{'>'}</p>
                    <p className="pl-16">Building the Future.</p>
                    <p className="pl-12">{'</'}<span className="text-blue-300">h1</span>{'>'}</p>
                    <p className="pl-12">{'<'}<span className="text-blue-300">Button</span> <span className="text-cyan-300">size</span>=<span className="text-orange-300">"lg"</span> <span className="text-cyan-300">className</span>=<span className="text-orange-300">"mt-8"</span>{'>'}</p>
                    <p className="pl-16">Deploy Now</p>
                    <p className="pl-12">{'</'}<span className="text-blue-300">Button</span>{'>'}</p>
                    <p className="pl-8">{'</'}<span className="text-blue-300">motion.div</span>{'>'}</p>
                    <p className="pl-4">);</p>
                    <p>{'}'}</p>
                  </motion.div>
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-24 border-y border-border/30 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-12">Built with elite modern technology</p>
          
          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
               {/* Duplicated for smooth infinite scroll */}
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex gap-16 items-center">
                  {["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Supabase", "Stripe", "TypeScript", "Vercel"].map((tech, i) => (
                    <span key={i} className="text-2xl md:text-4xl font-extrabold text-foreground/20 hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-secondary/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Transparent Pricing</h2>
            <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Invest in Your Digital Presence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-card border border-border p-8 flex flex-col"
            >
              <h4 className="text-xl font-bold text-foreground">Starter</h4>
              <p className="mt-2 text-sm text-muted-foreground">Professional online presence for new businesses and freelancers.</p>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold text-foreground">₹8K–₹20K</span>
              </div>
              <ul className="mt-8 space-y-4 flex-1 text-sm text-muted-foreground">
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> 5-Page Website</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Mobile Responsive</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Basic SEO Setup</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Contact Form</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> 1 Revision Round</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-full" asChild>
                <Link href="/contact?type=starter">Get Started</Link>
              </Button>
            </motion.div>

            {/* Growth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl bg-card border-2 border-primary relative p-8 flex flex-col shadow-2xl shadow-primary/10 scale-105 z-10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">Most Popular</div>
              <h4 className="text-xl font-bold text-foreground">Growth</h4>
              <p className="mt-2 text-sm text-muted-foreground">Scaling engine for established businesses with CMS and analytics.</p>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold text-foreground">₹20K–₹50K</span>
              </div>
              <ul className="mt-8 space-y-4 flex-1 text-sm text-foreground">
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Up to 10 Pages</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> CMS + Blog Integration</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Advanced SEO &amp; Analytics</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> 3 Revision Rounds</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> 1 Month Support</li>
              </ul>
              <Button className="mt-8 w-full rounded-full" asChild>
                <Link href="/contact?type=growth">Get Started</Link>
              </Button>
            </motion.div>

            {/* Pro */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-card border border-border p-8 flex flex-col"
            >
              <h4 className="text-xl font-bold text-foreground">Pro</h4>
              <p className="mt-2 text-sm text-muted-foreground">Custom web apps, e-commerce, and complex portals.</p>
              <div className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold text-foreground">₹50K–₹1.5L</span>
              </div>
              <ul className="mt-8 space-y-4 flex-1 text-sm text-muted-foreground">
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Full Custom Web App</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Auth &amp; Database Setup</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Payment Integration</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Admin Dashboard</li>
                <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> 3 Months Support</li>
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-full" asChild>
                <Link href="/contact?type=pro">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Client Success</h2>
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trusted by Ambitious Brands</h3>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              { name: "Sarah Jenkins", role: "CEO, TechFlow", initial: "S", text: "Logic Intelligence delivered our SaaS dashboard 3 weeks ahead of schedule. The code quality and design are world-class." },
              { name: "Mark Thompson", role: "Founder, FreshBite", initial: "M", text: "Our online orders doubled after launching the new e-commerce platform. Incredible attention to detail and speed." },
              { name: "Priya Patel", role: "Director, Luxe Design", initial: "P", text: "They completely understood our brand vision. The website is not just fast, it's a lead generation machine." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col justify-between rounded-3xl bg-secondary/30 p-8 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground text-lg mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-32 bg-secondary/10 border-t border-border/30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Common Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about working with us.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How long does it take to build a website?", a: "Most business websites take 1-2 weeks. E-commerce and custom web apps take 3-6 weeks depending on complexity. We move fast without sacrificing quality." },
              { q: "Do you provide hosting and maintenance?", a: "Yes, we deploy primarily to Vercel for ultimate performance, and offer monthly retainers for ongoing updates, security, and support." },
              { q: "What technologies do you use?", a: "We specialize in modern web technologies: Next.js 15, React, Tailwind CSS, Framer Motion, Supabase, and Stripe." },
              { q: "Do I own the code after completion?", a: "Absolutely. Once the final payment is made, you own 100% of the intellectual property and code repository." }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                className="border border-border/50 rounded-2xl bg-card overflow-hidden"
                initial={false}
              >
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between font-semibold text-left hover:bg-secondary/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-lg">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-0 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-primary/30 to-blue-500/30 blur-[100px] -z-10"></div>
        
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">Ready to upgrade your digital presence?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">Join the companies that trust us to build their most critical digital assets.</p>
          <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-[0_0_40px_-10px_rgba(46,134,171,0.5)]" asChild>
            <Link href="/contact">Get Your Free Proposal</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Dummy icon to avoid an extra import, standard lucide icon mapping above
function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

