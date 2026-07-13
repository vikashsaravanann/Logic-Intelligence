"use client";
import { motion } from "framer-motion";
import { Monitor, Hotel, Plane, Terminal, ShoppingCart, Smartphone, Palette, LayoutTemplate, Server, Building } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    { title: "Full Stack Web Development", icon: Monitor, desc: "End-to-end custom web applications built with modern, scalable frameworks." },
    { title: "Hotel & Hospitality Websites", icon: Hotel, desc: "Premium booking platforms and showcase websites for hotels and resorts." },
    { title: "Travel Agency Websites", icon: Plane, desc: "Dynamic travel portals with integrated booking, itineraries, and secure payments." },
    { title: "Custom Software Development", icon: Terminal, desc: "Bespoke internal tools, CRM systems, and management software tailored to you." },
    { title: "E-Commerce Development", icon: ShoppingCart, desc: "High-conversion online stores with secure payment gateways and inventory management." },
    { title: "Mobile App Development", icon: Smartphone, desc: "Native and cross-platform mobile applications for iOS and Android devices." },
    { title: "UI/UX Design", icon: Palette, desc: "User-centric interface design ensuring seamless, engaging digital experiences." },
    { title: "Website Designing", icon: LayoutTemplate, desc: "Beautiful, responsive websites designed to reflect your brand's premium identity." },
    { title: "Website Hosting & Maintenance", icon: Server, desc: "Reliable cloud hosting, security updates, and continuous technical support." },
    { title: "Custom Business Solutions", icon: Building, desc: "Tailored websites and software for any specific industry or unique business model." }
  ];

  return (
    <section id="services" className="py-24 bg-[#060B18] border-y border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Core Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Services We <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Provide.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            From stunning web interfaces to complex backend systems, we deliver enterprise-grade digital solutions tailored to your industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <Link href="/contact" className="inline-flex items-center text-sm font-bold text-primary group-hover:text-white transition-colors">
                  Discuss Project <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
