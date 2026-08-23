"use client";
import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-[#060B18] border-y border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Real testimonials from businesses we&apos;ve worked with will appear here soon.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-10 md:p-14 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <MessageSquareQuote className="w-8 h-8 text-primary" />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 mb-4">
              Coming Soon
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Client testimonials are on the way
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-lg mx-auto">
              We&apos;re collecting feedback from our first projects. Check back soon — or
              become one of our featured clients with a free demo to start.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
