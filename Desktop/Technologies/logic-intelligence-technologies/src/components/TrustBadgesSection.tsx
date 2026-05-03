"use client";
import { ShieldCheck, FileCheck, CreditCard, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBadgesSection() {
  const badges = [
    { icon: FileCheck, title: "Registered Private Limited Company" },
    { icon: FileCheck, title: "GST Registered Business" },
    { icon: CreditCard, title: "Secure Payments via Razorpay" },
    { icon: Award, title: "ISO Quality Standards Followed" }
  ];

  return (
    <section className="py-16 bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <badge.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-zinc-300">{badge.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
