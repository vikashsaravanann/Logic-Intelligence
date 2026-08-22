"use client";
import { motion } from "framer-motion";
import { Monitor, Code, Smartphone, ArrowRight, Hotel, Plane, ShoppingCart, Gamepad2, Search, Palette, CloudUpload } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "Full Stack Web Development",
      description: "Robust, scalable, and custom-coded web applications built from scratch to meet your exact business requirements.",
      icon: Monitor,
      features: ["Custom front-end design", "Back-end & database setup", "API integrations", "Deployment & hosting setup", "Post-launch support"],
      link: "/contact?service=full-stack"
    },
    {
      title: "Hotel & Hospitality Websites",
      description: "Premium websites designed for hotels and resorts, featuring integrated booking systems and immersive property galleries.",
      icon: Hotel,
      features: ["Direct booking engine integration", "Room & property showcase", "Payment gateway setup", "Mobile-optimized layouts", "SEO for local discovery"],
      link: "/contact?service=hotel"
    },
    {
      title: "Travel Agency Websites",
      description: "Dynamic portals for travel agencies to manage tour packages, accept inquiries, and showcase destinations effectively.",
      icon: Plane,
      features: ["Tour package management", "Custom inquiry forms", "Destination galleries", "WhatsApp integration", "Fast loading performance"],
      link: "/contact?service=travel"
    },
    {
      title: "Custom Software Development",
      description: "Tailored backend systems, CRMs, and business automations designed to solve your unique operational challenges.",
      icon: Code,
      features: ["Requirement analysis", "Custom CRM / ERP builds", "Workflow automation", "Secure data architecture", "Ongoing maintenance"],
      link: "/contact?service=software"
    },
    {
      title: "E-Commerce Websites",
      description: "High-conversion online stores with secure checkout, inventory management, and seamless user shopping experiences.",
      icon: ShoppingCart,
      features: ["Custom storefront design", "Secure payment gateways", "Inventory management system", "Admin dashboard", "Mobile shopping optimized"],
      link: "/contact?service=ecommerce"
    },
    {
      title: "Mobile App Development",
      description: "Native-grade iOS and Android applications delivering fluid, intuitive experiences for your mobile users.",
      icon: Smartphone,
      features: ["Cross-platform frameworks", "Custom UI/UX design", "App store deployment", "Backend API integration", "Push notifications"],
      link: "/contact?service=mobile-app"
    },
    {
      title: "Game Development",
      description: "Engaging and interactive gaming experiences built with modern game engines for mobile and web platforms.",
      icon: Gamepad2,
      features: ["Concept & storyboard", "2D/3D asset integration", "Game mechanics programming", "Cross-platform export", "Performance optimization"],
      link: "/contact?service=game-dev"
    },
    {
      title: "UI/UX Design",
      description: "User-centric design solutions prioritizing aesthetics, usability, and conversion rates for your digital products.",
      icon: Palette,
      features: ["Wireframing & prototyping", "High-fidelity mockups", "User journey mapping", "Design system creation", "Developer handoff"],
      link: "/contact?service=ui-ux"
    },
    {
      title: "SEO Optimization",
      description: "Data-driven search engine optimization strategies to improve visibility, traffic, and organic rankings.",
      icon: Search,
      features: ["On-page optimization", "Keyword research", "Technical SEO audits", "Performance tuning", "Analytics setup"],
      link: "/contact?service=seo"
    },
    {
      title: "Website Hosting & Maintenance",
      description: "Reliable, high-performance hosting environments paired with continuous security monitoring and updates.",
      icon: CloudUpload,
      features: ["Cloud server configuration", "SSL certificate setup", "Regular security patches", "Automated daily backups", "Uptime monitoring"],
      link: "/contact?service=hosting"
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
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-primary">Our Expertise</span>
            <span className="h-px w-8 bg-white/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6"
          >
            Comprehensive Digital <br />
            <span className="text-white opacity-90 font-light">Solutions & Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            From custom software architecture to high-converting eCommerce platforms, we provide end-to-end technology solutions tailored for your enterprise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-grow">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(0,191,255,0.15)] group-hover:border-primary/30">
                  <service.icon className="w-8 h-8 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-medium border-b border-white/10 pb-6">
                  {service.description}
                </p>

                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">What's Included</h4>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                <Link href={service.link} className="inline-flex items-center justify-center w-full gap-2 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl py-3 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-lg">
                  Get This Service
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
