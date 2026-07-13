"use client";
import { motion } from "framer-motion";
import { Monitor, Code, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "Enterprise Web Development",
      description: "We architect and build robust, high-performance web applications and corporate portals engineered for scalability, security, and seamless user experiences at a global scale.",
      icon: Monitor,
      features: ["SaaS Platforms", "Corporate Portals", "E-Commerce Systems"],
      link: "/packages"
    },
    {
      title: "Custom Software Engineering",
      description: "Tailored backend systems and business automations designed to solve complex operational challenges, integrate seamlessly with your existing infrastructure, and drive measurable ROI.",
      icon: Code,
      features: ["ERP & CRM Solutions", "API Development", "Workflow Automation"],
      link: "/contact"
    },
    {
      title: "Mobile App Development",
      description: "Premium, native-grade iOS and Android applications built with cutting-edge frameworks. We deliver fluid, intuitive mobile experiences that keep your users engaged on any device.",
      icon: Smartphone,
      features: ["iOS Development", "Android Apps", "Cross-Platform Frameworks"],
      link: "/contact"
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-[#0A0F1E] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="h-px w-8 bg-white/20" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-400">Core Capabilities</span>
            <span className="h-px w-8 bg-white/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6"
          >
            Engineering Solutions <br />
            <span className="text-white opacity-90 font-light">For The Modern Enterprise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            We focus strictly on high-impact technology implementations, ensuring your business stays ahead of the curve with state-of-the-art digital infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-grow">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed mb-8 font-light">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                <a href="mailto:startupwithvikashsaravanan@gmail.com" className="inline-flex items-center gap-2 text-sm font-bold text-white group/link">
                  Discuss Project
                  <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
