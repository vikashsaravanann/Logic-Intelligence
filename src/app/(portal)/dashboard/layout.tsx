'use client';

import { motion } from 'framer-motion';
import {
  LogOut, Home, Users, Briefcase, FileText,
  Search, Bell, Activity
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { COMPANY } from '@/config/company';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans flex overflow-hidden">
      {/* Animated Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#0a0f1c]/80 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen relative transition-all duration-300 z-20 shadow-2xl"
      >
        <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-10 h-10 relative overflow-hidden rounded-lg shadow-lg">
                <Image src={COMPANY.logoIconPath} alt={COMPANY.displayName} fill className="object-cover" />
              </div>
              <span className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 leading-tight flex-1">
                {COMPANY.displayName}
              </span>
            </motion.div>
          ) : (
            <div className="w-10 h-10 relative overflow-hidden rounded-lg shadow-lg mx-auto">
              <Image src={COMPANY.logoIconPath} alt={COMPANY.displayName} fill className="object-cover" />
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {[
            { icon: Home, label: 'Overview', href: '/dashboard' },
            { icon: Users, label: 'Leads Pipeline', href: '/dashboard/leads' },
            { icon: Briefcase, label: 'Active Projects', href: '/dashboard/projects' },
            { icon: FileText, label: 'Finances', href: '/dashboard/finances' },
            { icon: Activity, label: 'Analytics', href: '/dashboard/analytics' },
          ].map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link key={idx} href={item.href} className="block">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  {isSidebarOpen && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <div className={`flex items-center gap-3 mb-4 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-white font-bold border border-white/10 shadow-inner">
              A
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-bold text-white truncate">Administrator</p>
                <p className="text-xs text-indigo-400 font-medium">System Manager</p>
              </div>
            )}
          </div>
          <form action="/auth/signout" method="POST">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20 gap-2`}
            >
              <LogOut className="w-4 h-4" />
              {isSidebarOpen && <span>Secure Logout</span>}
            </motion.button>
          </form>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#030712] to-[#030712]">
        {/* Sleek Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#030712]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Command <span className="text-indigo-500">Center</span>
            </h1>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider">System Operational</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything (Cmd+K)..." 
                className="bg-white/[0.02] border border-white/10 rounded-full pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 w-72 transition-all placeholder:text-zinc-600 text-zinc-300 shadow-inner" 
              />
            </div>
            <button className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <Bell className="w-5 h-5 text-zinc-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 border-2 border-[#030712]"></span>
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
