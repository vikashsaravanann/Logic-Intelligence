"use client";
import { motion } from "framer-motion";

export default function LiveStatsSection() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "30+", label: "Happy Clients" },
    { value: "18", label: "Specialized Services" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  return (
    <section className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 rounded-3xl glass-card bg-zinc-900/60 border border-white/10 hover:border-primary/50 transition-colors"
            >
              <h4 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-2">
                {stat.value}
              </h4>
              <p className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
