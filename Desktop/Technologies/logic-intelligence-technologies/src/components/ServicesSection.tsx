"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { ArrowRight, Monitor, Code, Smartphone, Building, Search, LayoutTemplate, Palette, CloudUpload, Cloud, Hotel, Plane, ShoppingCart, Brush, Terminal, Gamepad, Users, GraduationCap, Receipt } from "lucide-react";
import React, { useRef } from "react";

const iconMap: Record<string, any> = {
  "Monitor": Monitor, "Code": Code, "Smartphone": Smartphone, "Building": Building, "Search": Search,
  "Layout": LayoutTemplate, "Palette": Palette, "UploadCloud": CloudUpload, "Cloud": Cloud,
  "Hotel": Hotel, "Plane": Plane, "ShoppingCart": ShoppingCart, "Brush": Brush, "Terminal": Terminal,
  "Gamepad": Gamepad, "Users": Users, "GraduationCap": GraduationCap, "Receipt": Receipt, "CodeSquare": Code
};

// Colors mapping matching the global UI system
const glowColors = [
  "#ffffff", // white
  "#e4e4e7", // zinc-200
  "#a1a1aa", // zinc-400
  "#d4d4d8", // zinc-300
  "#ffffff",
  "#e4e4e7",
  "#a1a1aa",
  "#d4d4d8",
  "#ffffff"
];

function TiltCard({ s, i }: { s: any, i: number }) {
  const IconComponent = iconMap[s.icon] || Code;
  const color = glowColors[i % glowColors.length];
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <Link href={`/services/${s.slug}`} className="block h-full outline-none">
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="p-8 rounded-2xl glass-card group flex flex-col h-full transition-shadow duration-300 relative overflow-hidden"
          whileHover={{ z: 20 }}
        >
          {/* Inner follow glow based on mouse position */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at calc(50% + ${x.get() * 100}px) calc(50% + ${y.get() * 100}px), ${color}20 0%, transparent 70%)`
            }}
          />

          <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: "translateZ(30px)" }}>
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 border border-white/10"
              style={{ 
                background: `linear-gradient(135deg, rgba(10,15,30,0.8), rgba(10,15,30,0.4))`,
                boxShadow: `0 0 0 rgba(0,0,0,0)`
              }}
            >
              <div className="group-hover:scale-110 transition-transform duration-300" style={{ color: "white", textShadow: `0 0 10px ${color}` }}>
                <IconComponent className="h-6 w-6" />
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300" 
              style={{ backgroundImage: `linear-gradient(90deg, #fff, ${color})` }}>
              {s.title}
            </h4>
            
            <p className="text-sm text-zinc-400 leading-relaxed flex-grow line-clamp-3 mb-6 transform-gpu" style={{ transform: "translateZ(10px)" }}>
              {s.subtitle}
            </p>
            
            <div className="mt-auto font-bold flex items-center gap-2 transform-gpu" style={{ color, transform: "translateZ(20px)" }}>
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const featuredServices = servicesData.slice(0, 9);

  return (
    <section id="services" className="py-24 bg-[#0A0F1E] relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Clip path reveal effect for heading */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">What We Build</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">End-to-end digital solutions tailored for your business</h3>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={{ 
            hidden: {}, 
            visible: { transition: { staggerChildren: 0.1 } } 
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredServices.map((s, i) => (
            <TiltCard key={i} s={s} i={i} />
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-primary/50 text-primary font-bold hover:bg-primary/10 transition-colors shadow-[0_0_15px_rgba(0,191,255,0.2)] hover:shadow-[0_0_25px_rgba(0,191,255,0.4)]">
            View All 18 Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
