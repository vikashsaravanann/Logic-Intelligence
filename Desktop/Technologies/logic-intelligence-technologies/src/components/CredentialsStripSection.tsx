"use client";
import { Building2, Code2, Clock, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CredentialsStripSection() {
  const credentials = [
    { icon: Building2, text: "Registered Pvt Ltd Company" },
    { icon: Code2, text: "Modern Technology Stack" },
    { icon: Clock, text: "Response within 24 Hours" },
    { icon: PlayCircle, text: "Free Demo Before Payment" },
  ];

  return (
    <section className="bg-primary/5 border-y border-primary/20 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbuznxrrm/image/upload/v1704285811/grid-pattern_q5aocu.svg')] opacity-[0.05]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-all group"
            >
              <cred.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{cred.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
