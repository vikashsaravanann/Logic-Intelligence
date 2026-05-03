"use client";
import { motion } from "framer-motion";

export default function ClientsMarqueeSection() {
  const technologies = [
    "React", "Node.js", "MongoDB", "MySQL", "Python", "Unity", 
    "WordPress", "Figma", "AWS", "Vercel", "Tailwind CSS", "Flutter"
  ];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-6 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-zinc-500">Powered by the best technologies</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-12 py-4">
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-2xl font-black text-zinc-800 hover:text-primary transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
