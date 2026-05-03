"use client";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, IndianRupee, Infinity as InfinityIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const blocks = [
  { icon: Shield, title: "Expert Team", desc: "Built by certified full stack developers with hands-on project experience across web, software, and game development." },
  { icon: Clock, title: "On-Time Delivery", desc: "We respect your timeline. Every project comes with a clear delivery date and we stick to it — always." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Premium agency quality at startup-friendly prices. We believe great websites should not be expensive." },
  { icon: InfinityIcon, title: "End-to-End Service", desc: "From your first idea to your website going live — we handle design, development, testing, and deployment all in one place." },
];

const Counter = ({ end, suffix, title }: { end: number, suffix: string, title: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2s
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 border border-white/5 rounded-2xl bg-zinc-900/30">
      <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
        {count}{suffix}
      </span>
      <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-center">{title}</span>
    </div>
  );
};

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-[#0A0F1E] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Why Businesses Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {blocks.map((block, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl glass-card flex flex-col h-full bg-zinc-900/60">
              <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 text-primary shadow-[0_0_15px_rgba(0,191,255,0.2)]">
                <block.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{block.title}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed flex-grow">{block.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Counter end={50} suffix="+" title="Projects Completed" />
          <Counter end={30} suffix="+" title="Happy Clients" />
          <Counter end={3} suffix="+" title="Years Experience" />
          <Counter end={4} suffix="" title="Service Domains" />
        </div>
      </div>
    </section>
  );
}
