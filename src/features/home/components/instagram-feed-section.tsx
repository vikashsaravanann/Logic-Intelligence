"use client";
import { motion } from "framer-motion";

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
import { COMPANY } from "@/config/company";

export default function InstagramFeedSection() {
  return (
    <section className="py-24 bg-[#060B18]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 mb-4">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Follow Our Journey</h2>
          <p className="text-zinc-400">@logicintelligencetechnologies</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.a
              key={i}
              href={COMPANY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group overflow-hidden relative"
            >
              <Instagram className="w-8 h-8 text-white/20 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-sm">View on Instagram</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
