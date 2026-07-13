"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Monitor, LayoutTemplate, Palette, CloudUpload, Code, Cloud, Building, Hotel, Plane, ShoppingCart, Smartphone, Brush, Terminal, Gamepad, Users, GraduationCap, Receipt, Search, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (window.innerWidth > 1024) setActiveDropdown(menu);
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) setActiveDropdown(null);
  };

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  const NavLink = ({ href, children, onHover }: { href: string; children: React.ReactNode; onHover?: () => void }) => (
    <Link 
      href={href} 
      className={`text-sm font-medium transition-colors relative py-4 flex items-center gap-1 ${isActive(href) ? "text-primary" : "text-zinc-300 hover:text-primary"}`}
      onMouseEnter={onHover}
    >
      {children}
      {isActive(href) && (
        <motion.div layoutId="activeNav" className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );

  const servicesCols = [
    [
      { name: "Full Stack Dev", href: "/#services", icon: Monitor },
      { name: "Web Designing", href: "/#services", icon: LayoutTemplate },
      { name: "UI/UX Design", href: "/#services", icon: Palette },
      { name: "Website Hosting", href: "/#services", icon: CloudUpload },
    ],
    [
      { name: "Hotel Website", href: "/#services", icon: Hotel },
      { name: "Travel Agency Website", href: "/#services", icon: Plane },
      { name: "E-Commerce Website", href: "/#services", icon: ShoppingCart },
      { name: "Custom Business Website", href: "/#services", icon: Building },
    ],
    [
      { name: "Custom Software", href: "/#services", icon: Terminal },
      { name: "Mobile App Dev", href: "/#services", icon: Smartphone },
    ]
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60] shadow-[0_0_10px_rgba(0,191,255,0.8)]"
        style={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0 }}
      />
      
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[rgba(10,15,30,0.85)] backdrop-blur-[20px] saturate-180 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4" : "bg-transparent py-6"}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Animation */}
            <Link href="/" className="flex items-center gap-3 group relative z-50 overflow-hidden">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(0,191,255,0.4)] animate-neon-pulse bg-gradient-to-tr from-primary to-accent"
              >
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-lg text-white">LIT</span>'; }} />
              </motion.div>
              <div className="flex flex-col">
                <motion.span 
                  className="text-lg font-bold gradient-text-anim tracking-tight leading-none flex"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  {Array.from("Logic Intelligence").map((letter, i) => (
                    <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.span>
                <span className="text-[10px] text-zinc-400 tracking-[0.2em] leading-none block uppercase mt-1">Technologies Pvt. Ltd.</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              <NavLink href="/">HOME</NavLink>
              
              {/* Services Mega Menu */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
                <NavLink href="/#services" onHover={() => handleMouseEnter('services')}>
                  SERVICES <ChevronDown className="w-4 h-4" />
                </NavLink>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div 
                      initial={{ opacity: 0, scaleY: 0 }} 
                      animate={{ opacity: 1, scaleY: 1 }} 
                      exit={{ opacity: 0, scaleY: 0 }} 
                      style={{ transformOrigin: "top center" }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[800px] bg-[rgba(10,15,30,0.98)] backdrop-blur-[30px] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.1)] p-6 grid grid-cols-3 gap-6"
                    >
                      {servicesCols.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col space-y-2">
                          {col.map((service, itemIdx) => (
                            <motion.div 
                              key={service.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (colIdx * 0.1) + (itemIdx * 0.05) }}
                            >
                              <Link href={service.href} className="flex items-center justify-between p-2 rounded-lg hover:bg-[rgba(0,191,255,0.08)] transition-all group/link relative">
                                <div className="flex items-center gap-3">
                                  <service.icon className="w-4 h-4 text-zinc-400 group-hover/link:text-primary group-hover/link:shadow-[0_0_10px_rgba(0,191,255,0.5)] rounded-full transition-all" />
                                  <span className="text-sm text-zinc-300 group-hover/link:text-white font-medium">{service.name}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Packages Dropdown */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('packages')} onMouseLeave={handleMouseLeave}>
                <NavLink href="/packages" onHover={() => handleMouseEnter('packages')}>
                  PACKAGES <ChevronDown className="w-4 h-4" />
                </NavLink>
                <AnimatePresence>
                  {activeDropdown === 'packages' && (
                    <motion.div 
                      initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }} style={{ transformOrigin: "top center" }}
                      className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[250px] bg-[rgba(10,15,30,0.98)] backdrop-blur-[30px] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.1)] p-4 flex flex-col space-y-2"
                    >
                      <Link href="/packages/digital-launch-pack" className="flex justify-between items-center text-sm font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Digital Launch Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                      <Link href="/packages/business-pro-pack" className="flex justify-between items-center text-sm font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Business Pro Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                      <Link href="/packages/enterprise-pack" className="flex justify-between items-center text-sm font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Enterprise Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/about">ABOUT</NavLink>
              <NavLink href="/contact">CONTACT</NavLink>
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden xl:flex items-center gap-3">
                <span className="text-[10px] font-bold gradient-text-anim bg-white/5 px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-2 tracking-widest">
                  🇮🇳 PVT. LTD.
                </span>
              </div>
              
              <Link href="/contact" className="hidden lg:flex px-6 py-2.5 rounded-full text-sm font-bold text-white neon-btn">
                Start Project
              </Link>
              
              <button className="lg:hidden text-white relative z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 w-[85vw] h-[100vh] bg-[rgba(10,15,30,0.98)] backdrop-blur-2xl border-l border-white/10 lg:hidden shadow-2xl z-40 overflow-y-auto">
              <div className="flex flex-col px-6 py-24 space-y-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">HOME</Link>
                <Link href="/#services" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">SERVICES</Link>
                <Link href="/packages" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">PACKAGES</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">ABOUT</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">CONTACT</Link>
                
                <div className="mt-auto pt-8 flex flex-col space-y-4">
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="px-6 py-4 text-center rounded-xl text-base font-bold text-white neon-btn w-full">
                    Start Project
                  </Link>
                  <a href="https://wa.me/919342877474" className="px-6 py-4 text-center rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] w-full flex items-center justify-center gap-2">
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
