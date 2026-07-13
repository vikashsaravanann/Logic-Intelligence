"use client";
import { Mail, Phone, MapPin, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#060B18] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Top Gradient Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-3 group mb-4 inline-flex">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-gradient-to-tr from-primary to-accent shadow-[0_0_15px_rgba(0,191,255,0.3)] animate-neon-pulse">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-lg text-white">LIT</span>'; }} />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text-anim tracking-tight leading-none block">
                  Logic Intelligence
                </span>
                <span className="text-xs text-zinc-400 tracking-[0.2em] leading-none block uppercase mt-1 font-medium">Technologies Pvt. Ltd.</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              "Where Logic Meets Innovation — We Build What Others Imagine"
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
            <ul className="space-y-4">
              <li>
                <a href="mailto:startupwithvikashsaravanan@gmail.com" className="group flex items-start gap-3 w-max max-w-full">
                  <Mail className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors break-all">startupwithvikashsaravanan@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+919342877474" className="group flex items-start gap-3 w-max">
                  <Phone className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">+91 9342877474</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-zinc-500 shrink-0" />
                <span className="text-sm text-zinc-400">Coimbatore, Tamil Nadu, India</span>
              </li>
            </ul>
            
            <div className="flex flex-col justify-start">
              <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-zinc-500 max-w-2xl">
            © {new Date().getFullYear()} Logic Intelligence Technologies Private Limited. All Rights Reserved. | CIN: U72900TZ2026PTC123456
          </p>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="text-xs font-medium text-zinc-400 flex items-center gap-1"
          >
            {"Made with ".split("").map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char === " " ? "\u00A0" : char}</motion.span>
            ))}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-1" />
            </motion.div>
            {" in Coimbatore, India".split("").map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char === " " ? "\u00A0" : char}</motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
