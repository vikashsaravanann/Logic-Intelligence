"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Shield, Clock, Headphones, Code, Palette, Search, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <div className="bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-primary/10 blur-[120px]"></div>
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Zap className="mr-2 h-4 w-4" /> Services & Pricing
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              Transparent Pricing,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
                Exceptional Results
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. No scope creep. Choose a package that fits your business, and we'll handle the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="isolate grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-8 border border-border bg-card/50 backdrop-blur-sm flex flex-col justify-between hover:border-primary/30 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Starter</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                    Best for MVPs
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Perfect for local businesses wanting a professional online presence.</p>
                <p className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">$1,500</span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </p>
                <ul role="list" className="mt-8 space-y-4 text-sm text-muted-foreground">
                  {[
                    "5-Page Informational Site",
                    "Mobile-First Responsive Design",
                    "Basic On-Page SEO",
                    "Contact Form Integration",
                    "1 Round of Revisions",
                    "2 Week Delivery"
                  ].map((feature) => (
                    <li key={feature} className="flex gap-3 items-center">
                      <Check className="h-5 w-5 text-primary shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-8 w-full rounded-full" variant="outline">
                <Link href="/contact?type=starter">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>

            {/* Growth Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-8 border-2 border-primary bg-card relative flex flex-col justify-between shadow-2xl shadow-primary/10 scale-[1.03] z-10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                Most Popular
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Growth</h3>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    E-Commerce
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Sell products online with a fully customized storefront and secure checkout.</p>
                <p className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">$3,500</span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </p>
                <ul role="list" className="mt-8 space-y-4 text-sm text-foreground">
                  {[
                    "Custom Storefront (Up to 100 products)",
                    "Stripe/Razorpay Payment Gateway",
                    "Shopping Cart & Checkout Flow",
                    "Inventory Management Panel",
                    "Advanced SEO & Analytics",
                    "3 Rounds of Revisions",
                    "Priority Support (30 days)"
                  ].map((feature) => (
                    <li key={feature} className="flex gap-3 items-center">
                      <Check className="h-5 w-5 text-primary shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-8 w-full rounded-full shadow-[0_0_30px_-8px_rgba(46,134,171,0.4)]">
                <Link href="/contact?type=growth">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl p-8 border border-border bg-card/50 backdrop-blur-sm flex flex-col justify-between hover:border-primary/30 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Pro</h3>
                  <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                    Web App / SaaS
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Complex custom logic, user dashboards, and database architecture.</p>
                <p className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">$8,000</span>
                  <span className="text-sm text-muted-foreground">starting</span>
                </p>
                <ul role="list" className="mt-8 space-y-4 text-sm text-muted-foreground">
                  {[
                    "Full-Stack Architecture (Next.js)",
                    "Custom Database (Supabase/PostgreSQL)",
                    "Secure User Authentication",
                    "API Integrations & Webhooks",
                    "Admin Management Dashboard",
                    "Unlimited Revisions",
                    "60-Day Priority Support"
                  ].map((feature) => (
                    <li key={feature} className="flex gap-3 items-center">
                      <Check className="h-5 w-5 text-primary shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-8 w-full rounded-full" variant="outline">
                <Link href="/contact?type=pro">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-secondary/20 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Included in Every Project</h2>
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Premium Standards, Every Time</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Palette, title: "Premium Design", desc: "Handcrafted UI that reflects your brand identity and wows visitors." },
              { icon: Code, title: "Clean Code", desc: "Type-safe, well-documented code that's easy to maintain and extend." },
              { icon: Search, title: "SEO Optimized", desc: "Built-in meta tags, sitemap, schema markup, and Core Web Vitals tuning." },
              { icon: Shield, title: "Security First", desc: "HTTPS, input validation, CSRF protection, and secure auth flows." },
              { icon: Zap, title: "Blazing Fast", desc: "Sub-second load times with edge caching and optimized assets." },
              { icon: Headphones, title: "Post-Launch Support", desc: "Free bug fixes and guidance for 14-30 days after launch." },
              { icon: BarChart3, title: "Analytics Ready", desc: "Google Analytics and conversion tracking setup included." },
              { icon: Clock, title: "On-Time Delivery", desc: "We commit to deadlines and communicate proactively about progress." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="rounded-xl p-3 bg-primary/10 text-primary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-primary/20 to-blue-500/20 blur-[100px] -z-10"></div>
        <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">Not sure which plan fits?</h2>
          <p className="text-lg text-muted-foreground mb-8">Book a free 15-minute consultation and we'll recommend the best path forward for your project.</p>
          <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-[0_0_40px_-10px_rgba(46,134,171,0.5)]" asChild>
            <Link href="/contact">Schedule a Free Call</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
