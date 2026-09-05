"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FreeDemoCTA() {
  return (
    <section className="py-16 md:py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] opacity-[0.1] blur-[100px] bg-gradient-to-r from-primary to-accent pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="p-6 md:p-10 md:p-16 rounded-3xl border border-primary/20 bg-primary/5 relative overflow-hidden"
        >
          <div className="absolute -top-6 md:p-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />

          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            🚀 Want to See YOUR Website Before Paying Anything?
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            We build you a FREE demo — no payment required. Just share your idea.
          </p>
          
          <Link href="/free-demo" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-black bg-primary neon-btn">
            Request Free Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
