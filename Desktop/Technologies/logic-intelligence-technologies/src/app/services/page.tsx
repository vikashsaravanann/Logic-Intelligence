"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { servicesData } from "@/data/servicesData";
import Link from "next/link";
import { ArrowRight, Monitor, Code, Smartphone, Building, Search, LayoutTemplate, Palette, CloudUpload, Cloud, Hotel, Plane, ShoppingCart, Brush, Terminal, Gamepad, Users, GraduationCap, Receipt } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  "Monitor": Monitor, "Code": Code, "Smartphone": Smartphone, "Building": Building, "Search": Search,
  "Layout": LayoutTemplate, "Palette": Palette, "UploadCloud": CloudUpload, "Cloud": Cloud,
  "Hotel": Hotel, "Plane": Plane, "ShoppingCart": ShoppingCart, "Brush": Brush, "Terminal": Terminal,
  "Gamepad": Gamepad, "Users": Users, "GraduationCap": GraduationCap, "Receipt": Receipt, "CodeSquare": Code
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[120px] pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">Our Services</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto relative z-10">We don't just build websites. We build complete digital ecosystems that drive growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, i) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full p-8 rounded-3xl glass-card bg-zinc-900/60 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                    <IconComponent className="w-7 h-7 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-zinc-400 text-sm mb-8 line-clamp-3">{service.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
